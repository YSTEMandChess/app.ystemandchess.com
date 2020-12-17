/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { isForwardRef, resolveForwardRef } from '../di/forward_ref';
import { injectRootLimpMode, setInjectImplementation } from '../di/injector_compatibility';
import { getInjectorDef } from '../di/interface/defs';
import { InjectFlags } from '../di/interface/injector';
import { assertDefined, assertEqual } from '../util/assert';
import { noSideEffects } from '../util/closure';
import { assertDirectiveDef } from './assert';
import { getFactoryDef } from './definition';
import { NG_ELEMENT_ID, NG_FACTORY_DEF } from './fields';
import { registerPreOrderHooks } from './hooks';
import { isFactory, NO_PARENT_INJECTOR, PARENT_INJECTOR, TNODE } from './interfaces/injector';
import { isComponentDef, isComponentHost } from './interfaces/type_checks';
import { DECLARATION_COMPONENT_VIEW, DECLARATION_VIEW, INJECTOR, T_HOST, TVIEW } from './interfaces/view';
import { assertNodeOfPossibleTypes } from './node_assert';
import { enterDI, leaveDI } from './state';
import { isNameOnlyAttributeMarker } from './util/attrs_utils';
import { getParentInjectorIndex, getParentInjectorView, hasParentInjector } from './util/injector_utils';
import { stringifyForError } from './util/misc_utils';
/**
 * Defines if the call to `inject` should include `viewProviders` in its resolution.
 *
 * This is set to true when we try to instantiate a component. This value is reset in
 * `getNodeInjectable` to a value which matches the declaration location of the token about to be
 * instantiated. This is done so that if we are injecting a token which was declared outside of
 * `viewProviders` we don't accidentally pull `viewProviders` in.
 *
 * Example:
 *
 * ```
 * @Injectable()
 * class MyService {
 *   constructor(public value: String) {}
 * }
 *
 * @Component({
 *   providers: [
 *     MyService,
 *     {provide: String, value: 'providers' }
 *   ]
 *   viewProviders: [
 *     {provide: String, value: 'viewProviders'}
 *   ]
 * })
 * class MyComponent {
 *   constructor(myService: MyService, value: String) {
 *     // We expect that Component can see into `viewProviders`.
 *     expect(value).toEqual('viewProviders');
 *     // `MyService` was not declared in `viewProviders` hence it can't see it.
 *     expect(myService.value).toEqual('providers');
 *   }
 * }
 *
 * ```
 */
var includeViewProviders = true;
export function setIncludeViewProviders(v) {
    var oldValue = includeViewProviders;
    includeViewProviders = v;
    return oldValue;
}
/**
 * The number of slots in each bloom filter (used by DI). The larger this number, the fewer
 * directives that will share slots, and thus, the fewer false positives when checking for
 * the existence of a directive.
 */
var BLOOM_SIZE = 256;
var BLOOM_MASK = BLOOM_SIZE - 1;
/** Counter used to generate unique IDs for directives. */
var nextNgElementId = 0;
/**
 * Registers this directive as present in its node's injector by flipping the directive's
 * corresponding bit in the injector's bloom filter.
 *
 * @param injectorIndex The index of the node injector where this token should be registered
 * @param tView The TView for the injector's bloom filters
 * @param type The directive token to register
 */
export function bloomAdd(injectorIndex, tView, type) {
    ngDevMode && assertEqual(tView.firstCreatePass, true, 'expected firstCreatePass to be true');
    var id = typeof type !== 'string' ? type[NG_ELEMENT_ID] : type.charCodeAt(0) || 0;
    // Set a unique ID on the directive type, so if something tries to inject the directive,
    // we can easily retrieve the ID and hash it into the bloom bit that should be checked.
    if (id == null) {
        id = type[NG_ELEMENT_ID] = nextNgElementId++;
    }
    // We only have BLOOM_SIZE (256) slots in our bloom filter (8 buckets * 32 bits each),
    // so all unique IDs must be modulo-ed into a number from 0 - 255 to fit into the filter.
    var bloomBit = id & BLOOM_MASK;
    // Create a mask that targets the specific bit associated with the directive.
    // JS bit operations are 32 bits, so this will be a number between 2^0 and 2^31, corresponding
    // to bit positions 0 - 31 in a 32 bit integer.
    var mask = 1 << bloomBit;
    // Use the raw bloomBit number to determine which bloom filter bucket we should check
    // e.g: bf0 = [0 - 31], bf1 = [32 - 63], bf2 = [64 - 95], bf3 = [96 - 127], etc
    var b7 = bloomBit & 0x80;
    var b6 = bloomBit & 0x40;
    var b5 = bloomBit & 0x20;
    var tData = tView.data;
    if (b7) {
        b6 ? (b5 ? (tData[injectorIndex + 7] |= mask) : (tData[injectorIndex + 6] |= mask)) :
            (b5 ? (tData[injectorIndex + 5] |= mask) : (tData[injectorIndex + 4] |= mask));
    }
    else {
        b6 ? (b5 ? (tData[injectorIndex + 3] |= mask) : (tData[injectorIndex + 2] |= mask)) :
            (b5 ? (tData[injectorIndex + 1] |= mask) : (tData[injectorIndex] |= mask));
    }
}
/**
 * Creates (or gets an existing) injector for a given element or container.
 *
 * @param tNode for which an injector should be retrieved / created.
 * @param hostView View where the node is stored
 * @returns Node injector
 */
export function getOrCreateNodeInjectorForNode(tNode, hostView) {
    var existingInjectorIndex = getInjectorIndex(tNode, hostView);
    if (existingInjectorIndex !== -1) {
        return existingInjectorIndex;
    }
    var tView = hostView[TVIEW];
    if (tView.firstCreatePass) {
        tNode.injectorIndex = hostView.length;
        insertBloom(tView.data, tNode); // foundation for node bloom
        insertBloom(hostView, null); // foundation for cumulative bloom
        insertBloom(tView.blueprint, null);
    }
    var parentLoc = getParentInjectorLocation(tNode, hostView);
    var injectorIndex = tNode.injectorIndex;
    // If a parent injector can't be found, its location is set to -1.
    // In that case, we don't need to set up a cumulative bloom
    if (hasParentInjector(parentLoc)) {
        var parentIndex = getParentInjectorIndex(parentLoc);
        var parentLView = getParentInjectorView(parentLoc, hostView);
        var parentData = parentLView[TVIEW].data;
        // Creates a cumulative bloom filter that merges the parent's bloom filter
        // and its own cumulative bloom (which contains tokens for all ancestors)
        for (var i = 0; i < 8; i++) {
            hostView[injectorIndex + i] = parentLView[parentIndex + i] | parentData[parentIndex + i];
        }
    }
    hostView[injectorIndex + PARENT_INJECTOR] = parentLoc;
    return injectorIndex;
}
function insertBloom(arr, footer) {
    arr.push(0, 0, 0, 0, 0, 0, 0, 0, footer);
}
export function getInjectorIndex(tNode, hostView) {
    if (tNode.injectorIndex === -1 ||
        // If the injector index is the same as its parent's injector index, then the index has been
        // copied down from the parent node. No injector has been created yet on this node.
        (tNode.parent && tNode.parent.injectorIndex === tNode.injectorIndex) ||
        // After the first template pass, the injector index might exist but the parent values
        // might not have been calculated yet for this instance
        hostView[tNode.injectorIndex + PARENT_INJECTOR] == null) {
        return -1;
    }
    else {
        return tNode.injectorIndex;
    }
}
/**
 * Finds the index of the parent injector, with a view offset if applicable. Used to set the
 * parent injector initially.
 *
 * Returns a combination of number of `ViewData` we have to go up and index in that `Viewdata`
 */
export function getParentInjectorLocation(tNode, view) {
    if (tNode.parent && tNode.parent.injectorIndex !== -1) {
        return tNode.parent.injectorIndex; // ViewOffset is 0
    }
    // For most cases, the parent injector index can be found on the host node (e.g. for component
    // or container), so this loop will be skipped, but we must keep the loop here to support
    // the rarer case of deeply nested <ng-template> tags or inline views.
    var hostTNode = view[T_HOST];
    var viewOffset = 1;
    while (hostTNode && hostTNode.injectorIndex === -1) {
        view = view[DECLARATION_VIEW];
        hostTNode = view ? view[T_HOST] : null;
        viewOffset++;
    }
    return hostTNode ?
        hostTNode.injectorIndex | (viewOffset << 16 /* ViewOffsetShift */) :
        -1;
}
/**
 * Makes a type or an injection token public to the DI system by adding it to an
 * injector's bloom filter.
 *
 * @param di The node injector in which a directive will be added
 * @param token The type or the injection token to be made public
 */
export function diPublicInInjector(injectorIndex, tView, token) {
    bloomAdd(injectorIndex, tView, token);
}
/**
 * Inject static attribute value into directive constructor.
 *
 * This method is used with `factory` functions which are generated as part of
 * `defineDirective` or `defineComponent`. The method retrieves the static value
 * of an attribute. (Dynamic attributes are not supported since they are not resolved
 *  at the time of injection and can change over time.)
 *
 * # Example
 * Given:
 * ```
 * @Component(...)
 * class MyComponent {
 *   constructor(@Attribute('title') title: string) { ... }
 * }
 * ```
 * When instantiated with
 * ```
 * <my-component title="Hello"></my-component>
 * ```
 *
 * Then factory method generated is:
 * ```
 * MyComponent.ɵcmp = defineComponent({
 *   factory: () => new MyComponent(injectAttribute('title'))
 *   ...
 * })
 * ```
 *
 * @publicApi
 */
export function injectAttributeImpl(tNode, attrNameToInject) {
    ngDevMode &&
        assertNodeOfPossibleTypes(tNode, 0 /* Container */, 3 /* Element */, 4 /* ElementContainer */);
    ngDevMode && assertDefined(tNode, 'expecting tNode');
    if (attrNameToInject === 'class') {
        return tNode.classes;
    }
    if (attrNameToInject === 'style') {
        return tNode.styles;
    }
    var attrs = tNode.attrs;
    if (attrs) {
        var attrsLength = attrs.length;
        var i = 0;
        while (i < attrsLength) {
            var value = attrs[i];
            // If we hit a `Bindings` or `Template` marker then we are done.
            if (isNameOnlyAttributeMarker(value))
                break;
            // Skip namespaced attributes
            if (value === 0 /* NamespaceURI */) {
                // we skip the next two values
                // as namespaced attributes looks like
                // [..., AttributeMarker.NamespaceURI, 'http://someuri.com/test', 'test:exist',
                // 'existValue', ...]
                i = i + 2;
            }
            else if (typeof value === 'number') {
                // Skip to the first value of the marked attribute.
                i++;
                while (i < attrsLength && typeof attrs[i] === 'string') {
                    i++;
                }
            }
            else if (value === attrNameToInject) {
                return attrs[i + 1];
            }
            else {
                i = i + 2;
            }
        }
    }
    return null;
}
/**
 * Returns the value associated to the given token from the NodeInjectors => ModuleInjector.
 *
 * Look for the injector providing the token by walking up the node injector tree and then
 * the module injector tree.
 *
 * This function patches `token` with `__NG_ELEMENT_ID__` which contains the id for the bloom
 * filter. Negative values are reserved for special objects.
 *   - `-1` is reserved for injecting `Injector` (implemented by `NodeInjector`)
 *
 * @param tNode The Node where the search for the injector should start
 * @param lView The `LView` that contains the `tNode`
 * @param token The token to look for
 * @param flags Injection flags
 * @param notFoundValue The value to return when the injection flags is `InjectFlags.Optional`
 * @returns the value from the injector, `null` when not found, or `notFoundValue` if provided
 */
export function getOrCreateInjectable(tNode, lView, token, flags, notFoundValue) {
    if (flags === void 0) { flags = InjectFlags.Default; }
    if (tNode !== null) {
        var bloomHash = bloomHashBitOrFactory(token);
        // If the ID stored here is a function, this is a special object like ElementRef or TemplateRef
        // so just call the factory function to create it.
        if (typeof bloomHash === 'function') {
            enterDI(lView, tNode);
            try {
                var value = bloomHash();
                if (value == null && !(flags & InjectFlags.Optional)) {
                    throw new Error("No provider for " + stringifyForError(token) + "!");
                }
                else {
                    return value;
                }
            }
            finally {
                leaveDI();
            }
        }
        else if (typeof bloomHash == 'number') {
            if (bloomHash === -1) {
                // `-1` is a special value used to identify `Injector` types.
                return new NodeInjector(tNode, lView);
            }
            // If the token has a bloom hash, then it is a token which could be in NodeInjector.
            // A reference to the previous injector TView that was found while climbing the element
            // injector tree. This is used to know if viewProviders can be accessed on the current
            // injector.
            var previousTView = null;
            var injectorIndex = getInjectorIndex(tNode, lView);
            var parentLocation = NO_PARENT_INJECTOR;
            var hostTElementNode = flags & InjectFlags.Host ? lView[DECLARATION_COMPONENT_VIEW][T_HOST] : null;
            // If we should skip this injector, or if there is no injector on this node, start by
            // searching
            // the parent injector.
            if (injectorIndex === -1 || flags & InjectFlags.SkipSelf) {
                parentLocation = injectorIndex === -1 ? getParentInjectorLocation(tNode, lView) :
                    lView[injectorIndex + PARENT_INJECTOR];
                if (!shouldSearchParent(flags, false)) {
                    injectorIndex = -1;
                }
                else {
                    previousTView = lView[TVIEW];
                    injectorIndex = getParentInjectorIndex(parentLocation);
                    lView = getParentInjectorView(parentLocation, lView);
                }
            }
            // Traverse up the injector tree until we find a potential match or until we know there
            // *isn't* a match.
            while (injectorIndex !== -1) {
                parentLocation = lView[injectorIndex + PARENT_INJECTOR];
                // Check the current injector. If it matches, see if it contains token.
                var tView = lView[TVIEW];
                if (bloomHasToken(bloomHash, injectorIndex, tView.data)) {
                    // At this point, we have an injector which *may* contain the token, so we step through
                    // the providers and directives associated with the injector's corresponding node to get
                    // the instance.
                    var instance = searchTokensOnInjector(injectorIndex, lView, token, previousTView, flags, hostTElementNode);
                    if (instance !== NOT_FOUND) {
                        return instance;
                    }
                }
                if (shouldSearchParent(flags, lView[TVIEW].data[injectorIndex + TNODE] === hostTElementNode) &&
                    bloomHasToken(bloomHash, injectorIndex, lView)) {
                    // The def wasn't found anywhere on this node, so it was a false positive.
                    // Traverse up the tree and continue searching.
                    previousTView = tView;
                    injectorIndex = getParentInjectorIndex(parentLocation);
                    lView = getParentInjectorView(parentLocation, lView);
                }
                else {
                    // If we should not search parent OR If the ancestor bloom filter value does not have the
                    // bit corresponding to the directive we can give up on traversing up to find the specific
                    // injector.
                    injectorIndex = -1;
                }
            }
        }
    }
    if (flags & InjectFlags.Optional && notFoundValue === undefined) {
        // This must be set or the NullInjector will throw for optional deps
        notFoundValue = null;
    }
    if ((flags & (InjectFlags.Self | InjectFlags.Host)) === 0) {
        var moduleInjector = lView[INJECTOR];
        // switch to `injectInjectorOnly` implementation for module injector, since module injector
        // should not have access to Component/Directive DI scope (that may happen through
        // `directiveInject` implementation)
        var previousInjectImplementation = setInjectImplementation(undefined);
        try {
            if (moduleInjector) {
                return moduleInjector.get(token, notFoundValue, flags & InjectFlags.Optional);
            }
            else {
                return injectRootLimpMode(token, notFoundValue, flags & InjectFlags.Optional);
            }
        }
        finally {
            setInjectImplementation(previousInjectImplementation);
        }
    }
    if (flags & InjectFlags.Optional) {
        return notFoundValue;
    }
    else {
        throw new Error("NodeInjector: NOT_FOUND [" + stringifyForError(token) + "]");
    }
}
var NOT_FOUND = {};
function searchTokensOnInjector(injectorIndex, lView, token, previousTView, flags, hostTElementNode) {
    var currentTView = lView[TVIEW];
    var tNode = currentTView.data[injectorIndex + TNODE];
    // First, we need to determine if view providers can be accessed by the starting element.
    // There are two possibities
    var canAccessViewProviders = previousTView == null ?
        // 1) This is the first invocation `previousTView == null` which means that we are at the
        // `TNode` of where injector is starting to look. In such a case the only time we are allowed
        // to look into the ViewProviders is if:
        // - we are on a component
        // - AND the injector set `includeViewProviders` to true (implying that the token can see
        // ViewProviders because it is the Component or a Service which itself was declared in
        // ViewProviders)
        (isComponentHost(tNode) && includeViewProviders) :
        // 2) `previousTView != null` which means that we are now walking across the parent nodes.
        // In such a case we are only allowed to look into the ViewProviders if:
        // - We just crossed from child View to Parent View `previousTView != currentTView`
        // - AND the parent TNode is an Element.
        // This means that we just came from the Component's View and therefore are allowed to see
        // into the ViewProviders.
        (previousTView != currentTView && (tNode.type === 3 /* Element */));
    // This special case happens when there is a @host on the inject and when we are searching
    // on the host element node.
    var isHostSpecialCase = (flags & InjectFlags.Host) && hostTElementNode === tNode;
    var injectableIdx = locateDirectiveOrProvider(tNode, currentTView, token, canAccessViewProviders, isHostSpecialCase);
    if (injectableIdx !== null) {
        return getNodeInjectable(lView, currentTView, injectableIdx, tNode);
    }
    else {
        return NOT_FOUND;
    }
}
/**
 * Searches for the given token among the node's directives and providers.
 *
 * @param tNode TNode on which directives are present.
 * @param tView The tView we are currently processing
 * @param token Provider token or type of a directive to look for.
 * @param canAccessViewProviders Whether view providers should be considered.
 * @param isHostSpecialCase Whether the host special case applies.
 * @returns Index of a found directive or provider, or null when none found.
 */
export function locateDirectiveOrProvider(tNode, tView, token, canAccessViewProviders, isHostSpecialCase) {
    var nodeProviderIndexes = tNode.providerIndexes;
    var tInjectables = tView.data;
    var injectablesStart = nodeProviderIndexes & 65535 /* ProvidersStartIndexMask */;
    var directivesStart = tNode.directiveStart;
    var directiveEnd = tNode.directiveEnd;
    var cptViewProvidersCount = nodeProviderIndexes >> 16 /* CptViewProvidersCountShift */;
    var startingIndex = canAccessViewProviders ? injectablesStart : injectablesStart + cptViewProvidersCount;
    // When the host special case applies, only the viewProviders and the component are visible
    var endIndex = isHostSpecialCase ? injectablesStart + cptViewProvidersCount : directiveEnd;
    for (var i = startingIndex; i < endIndex; i++) {
        var providerTokenOrDef = tInjectables[i];
        if (i < directivesStart && token === providerTokenOrDef ||
            i >= directivesStart && providerTokenOrDef.type === token) {
            return i;
        }
    }
    if (isHostSpecialCase) {
        var dirDef = tInjectables[directivesStart];
        if (dirDef && isComponentDef(dirDef) && dirDef.type === token) {
            return directivesStart;
        }
    }
    return null;
}
/**
 * Retrieve or instantiate the injectable from the `LView` at particular `index`.
 *
 * This function checks to see if the value has already been instantiated and if so returns the
 * cached `injectable`. Otherwise if it detects that the value is still a factory it
 * instantiates the `injectable` and caches the value.
 */
export function getNodeInjectable(lView, tView, index, tNode) {
    var value = lView[index];
    var tData = tView.data;
    if (isFactory(value)) {
        var factory = value;
        if (factory.resolving) {
            throw new Error("Circular dep for " + stringifyForError(tData[index]));
        }
        var previousIncludeViewProviders = setIncludeViewProviders(factory.canSeeViewProviders);
        factory.resolving = true;
        var previousInjectImplementation = void 0;
        if (factory.injectImpl) {
            previousInjectImplementation = setInjectImplementation(factory.injectImpl);
        }
        enterDI(lView, tNode);
        try {
            value = lView[index] = factory.factory(undefined, tData, lView, tNode);
            // This code path is hit for both directives and providers.
            // For perf reasons, we want to avoid searching for hooks on providers.
            // It does no harm to try (the hooks just won't exist), but the extra
            // checks are unnecessary and this is a hot path. So we check to see
            // if the index of the dependency is in the directive range for this
            // tNode. If it's not, we know it's a provider and skip hook registration.
            if (tView.firstCreatePass && index >= tNode.directiveStart) {
                ngDevMode && assertDirectiveDef(tData[index]);
                registerPreOrderHooks(index, tData[index], tView);
            }
        }
        finally {
            if (factory.injectImpl)
                setInjectImplementation(previousInjectImplementation);
            setIncludeViewProviders(previousIncludeViewProviders);
            factory.resolving = false;
            leaveDI();
        }
    }
    return value;
}
/**
 * Returns the bit in an injector's bloom filter that should be used to determine whether or not
 * the directive might be provided by the injector.
 *
 * When a directive is public, it is added to the bloom filter and given a unique ID that can be
 * retrieved on the Type. When the directive isn't public or the token is not a directive `null`
 * is returned as the node injector can not possibly provide that token.
 *
 * @param token the injection token
 * @returns the matching bit to check in the bloom filter or `null` if the token is not known.
 *   When the returned value is negative then it represents special values such as `Injector`.
 */
export function bloomHashBitOrFactory(token) {
    ngDevMode && assertDefined(token, 'token must be defined');
    if (typeof token === 'string') {
        return token.charCodeAt(0) || 0;
    }
    var tokenId = token[NG_ELEMENT_ID];
    // Negative token IDs are used for special objects such as `Injector`
    return (typeof tokenId === 'number' && tokenId > 0) ? tokenId & BLOOM_MASK : tokenId;
}
export function bloomHasToken(bloomHash, injectorIndex, injectorView) {
    // Create a mask that targets the specific bit associated with the directive we're looking for.
    // JS bit operations are 32 bits, so this will be a number between 2^0 and 2^31, corresponding
    // to bit positions 0 - 31 in a 32 bit integer.
    var mask = 1 << bloomHash;
    var b7 = bloomHash & 0x80;
    var b6 = bloomHash & 0x40;
    var b5 = bloomHash & 0x20;
    // Our bloom filter size is 256 bits, which is eight 32-bit bloom filter buckets:
    // bf0 = [0 - 31], bf1 = [32 - 63], bf2 = [64 - 95], bf3 = [96 - 127], etc.
    // Get the bloom filter value from the appropriate bucket based on the directive's bloomBit.
    var value;
    if (b7) {
        value = b6 ? (b5 ? injectorView[injectorIndex + 7] : injectorView[injectorIndex + 6]) :
            (b5 ? injectorView[injectorIndex + 5] : injectorView[injectorIndex + 4]);
    }
    else {
        value = b6 ? (b5 ? injectorView[injectorIndex + 3] : injectorView[injectorIndex + 2]) :
            (b5 ? injectorView[injectorIndex + 1] : injectorView[injectorIndex]);
    }
    // If the bloom filter value has the bit corresponding to the directive's bloomBit flipped on,
    // this injector is a potential match.
    return !!(value & mask);
}
/** Returns true if flags prevent parent injector from being searched for tokens */
function shouldSearchParent(flags, isFirstHostTNode) {
    return !(flags & InjectFlags.Self) && !(flags & InjectFlags.Host && isFirstHostTNode);
}
var NodeInjector = /** @class */ (function () {
    function NodeInjector(_tNode, _lView) {
        this._tNode = _tNode;
        this._lView = _lView;
    }
    NodeInjector.prototype.get = function (token, notFoundValue) {
        return getOrCreateInjectable(this._tNode, this._lView, token, undefined, notFoundValue);
    };
    return NodeInjector;
}());
export { NodeInjector };
/**
 * @codeGenApi
 */
export function ɵɵgetFactoryOf(type) {
    var typeAny = type;
    if (isForwardRef(type)) {
        return (function () {
            var factory = ɵɵgetFactoryOf(resolveForwardRef(typeAny));
            return factory ? factory() : null;
        });
    }
    var factory = getFactoryDef(typeAny);
    if (factory === null) {
        var injectorDef = getInjectorDef(typeAny);
        factory = injectorDef && injectorDef.factory;
    }
    return factory || null;
}
/**
 * @codeGenApi
 */
export function ɵɵgetInheritedFactory(type) {
    return noSideEffects(function () {
        var proto = Object.getPrototypeOf(type.prototype).constructor;
        var factory = proto[NG_FACTORY_DEF] || ɵɵgetFactoryOf(proto);
        if (factory !== null) {
            return factory;
        }
        else {
            // There is no factory defined. Either this was improper usage of inheritance
            // (no Angular decorator on the superclass) or there is no constructor at all
            // in the inheritance chain. Since the two cases cannot be distinguished, the
            // latter has to be assumed.
            return function (t) { return new t(); };
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9yZW5kZXIzL2RpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxZQUFZLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUdsRSxPQUFPLEVBQUMsa0JBQWtCLEVBQUUsdUJBQXVCLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUN6RixPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDcEQsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBRXJELE9BQU8sRUFBQyxhQUFhLEVBQUUsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDMUQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBRTlDLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUM1QyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQzNDLE9BQU8sRUFBQyxhQUFhLEVBQUUsY0FBYyxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQ3ZELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLFNBQVMsQ0FBQztBQUU5QyxPQUFPLEVBQUMsU0FBUyxFQUFFLGtCQUFrQixFQUF1QixlQUFlLEVBQTJELEtBQUssRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBRTFLLE9BQU8sRUFBQyxjQUFjLEVBQUUsZUFBZSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDekUsT0FBTyxFQUFDLDBCQUEwQixFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBUyxNQUFNLEVBQVMsS0FBSyxFQUFRLE1BQU0sbUJBQW1CLENBQUM7QUFDN0gsT0FBTyxFQUFDLHlCQUF5QixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3hELE9BQU8s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T0FBQSxJQUFJLENBQUMsRUFBRSxFQUFQLENBQU8sQ0FBQztTQUN2QjtJQUNILENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtpc0ZvcndhcmRSZWYsIHJlc29sdmVGb3J3YXJkUmVmfSBmcm9tICcuLi9kaS9mb3J3YXJkX3JlZic7XG5pbXBvcnQge0luamVjdGlvblRva2VufSBmcm9tICcuLi9kaS9pbmplY3Rpb25fdG9rZW4nO1xuaW1wb3J0IHtJbmplY3Rvcn0gZnJvbSAnLi4vZGkvaW5qZWN0b3InO1xuaW1wb3J0IHtpbmplY3RSb290TGltcE1vZGUsIHNldEluamVjdEltcGxlbWVudGF0aW9ufSBmcm9tICcuLi9kaS9pbmplY3Rvcl9jb21wYXRpYmlsaXR5JztcbmltcG9ydCB7Z2V0SW5qZWN0b3JEZWZ9IGZyb20gJy4uL2RpL2ludGVyZmFjZS9kZWZzJztcbmltcG9ydCB7SW5qZWN0RmxhZ3N9IGZyb20gJy4uL2RpL2ludGVyZmFjZS9pbmplY3Rvcic7XG5pbXBvcnQge1R5cGV9IGZyb20gJy4uL2ludGVyZmFjZS90eXBlJztcbmltcG9ydCB7YXNzZXJ0RGVmaW5lZCwgYXNzZXJ0RXF1YWx9IGZyb20gJy4uL3V0aWwvYXNzZXJ0JztcbmltcG9ydCB7bm9TaWRlRWZmZWN0c30gZnJvbSAnLi4vdXRpbC9jbG9zdXJlJztcblxuaW1wb3J0IHthc3NlcnREaXJlY3RpdmVEZWZ9IGZyb20gJy4vYXNzZXJ0JztcbmltcG9ydCB7Z2V0RmFjdG9yeURlZn0gZnJvbSAnLi9kZWZpbml0aW9uJztcbmltcG9ydCB7TkdfRUxFTUVOVF9JRCwgTkdfRkFDVE9SWV9ERUZ9IGZyb20gJy4vZmllbGRzJztcbmltcG9ydCB7cmVnaXN0ZXJQcmVPcmRlckhvb2tzfSBmcm9tICcuL2hvb2tzJztcbmltcG9ydCB7RGlyZWN0aXZlRGVmLCBGYWN0b3J5Rm59IGZyb20gJy4vaW50ZXJmYWNlcy9kZWZpbml0aW9uJztcbmltcG9ydCB7aXNGYWN0b3J5LCBOT19QQVJFTlRfSU5KRUNUT1IsIE5vZGVJbmplY3RvckZhY3RvcnksIFBBUkVOVF9JTkpFQ1RPUiwgUmVsYXRpdmVJbmplY3RvckxvY2F0aW9uLCBSZWxhdGl2ZUluamVjdG9yTG9jYXRpb25GbGFncywgVE5PREV9IGZyb20gJy4vaW50ZXJmYWNlcy9pbmplY3Rvcic7XG5pbXBvcnQge0F0dHJpYnV0ZU1hcmtlciwgVENvbnRhaW5lck5vZGUsIFREaXJlY3RpdmVIb3N0Tm9kZSwgVEVsZW1lbnRDb250YWluZXJOb2RlLCBURWxlbWVudE5vZGUsIFROb2RlLCBUTm9kZVByb3ZpZGVySW5kZXhlcywgVE5vZGVUeXBlfSBmcm9tICcuL2ludGVyZmFjZXMvbm9kZSc7XG5pbXBvcnQge2lzQ29tcG9uZW50RGVmLCBpc0NvbXBvbmVudEhvc3R9IGZyb20gJy4vaW50ZXJmYWNlcy90eXBlX2NoZWNrcyc7XG5pbXBvcnQge0RFQ0xBUkFUSU9OX0NPTVBPTkVOVF9WSUVXLCBERUNMQVJBVElPTl9WSUVXLCBJTkpFQ1RPUiwgTFZpZXcsIFRfSE9TVCwgVERhdGEsIFRWSUVXLCBUVmlld30gZnJvbSAnLi9pbnRlcmZhY2VzL3ZpZXcnO1xuaW1wb3J0IHthc3NlcnROb2RlT2ZQb3NzaWJsZVR5cGVzfSBmcm9tICcuL25vZGVfYXNzZXJ0JztcbmltcG9ydCB7ZW50ZXJESSwgbGVhdmVESX0gZnJvbSAnLi9zdGF0ZSc7XG5pbXBvcnQge2lzTmFtZU9ubHlBdHRyaWJ1dGVNYXJrZXJ9IGZyb20gJy4vdXRpbC9hdHRyc191dGlscyc7XG5pbXBvcnQge2dldFBhcmVudEluamVjdG9ySW5kZXgsIGdldFBhcmVudEluamVjdG9yVmlldywgaGFzUGFyZW50SW5qZWN0b3J9IGZyb20gJy4vdXRpbC9pbmplY3Rvcl91dGlscyc7XG5pbXBvcnQge3N0cmluZ2lmeUZvckVycm9yfSBmcm9tICcuL3V0aWwvbWlzY191dGlscyc7XG5cblxuXG4vKipcbiAqIERlZmluZXMgaWYgdGhlIGNhbGwgdG8gYGluamVjdGAgc2hvdWxkIGluY2x1ZGUgYHZpZXdQcm92aWRlcnNgIGluIGl0cyByZXNvbHV0aW9uLlxuICpcbiAqIFRoaXMgaXMgc2V0IHRvIHRydWUgd2hlbiB3ZSB0cnkgdG8gaW5zdGFudGlhdGUgYSBjb21wb25lbnQuIFRoaXMgdmFsdWUgaXMgcmVzZXQgaW5cbiAqIGBnZXROb2RlSW5qZWN0YWJsZWAgdG8gYSB2YWx1ZSB3aGljaCBtYXRjaGVzIHRoZSBkZWNsYXJhdGlvbiBsb2NhdGlvbiBvZiB0aGUgdG9rZW4gYWJvdXQgdG8gYmVcbiAqIGluc3RhbnRpYXRlZC4gVGhpcyBpcyBkb25lIHNvIHRoYXQgaWYgd2UgYXJlIGluamVjdGluZyBhIHRva2VuIHdoaWNoIHdhcyBkZWNsYXJlZCBvdXRzaWRlIG9mXG4gKiBgdmlld1Byb3ZpZGVyc2Agd2UgZG9uJ3QgYWNjaWRlbnRhbGx5IHB1bGwgYHZpZXdQcm92aWRlcnNgIGluLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBgXG4gKiBASW5qZWN0YWJsZSgpXG4gKiBjbGFzcyBNeVNlcnZpY2Uge1xuICogICBjb25zdHJ1Y3RvcihwdWJsaWMgdmFsdWU6IFN0cmluZykge31cbiAqIH1cbiAqXG4gKiBAQ29tcG9uZW50KHtcbiAqICAgcHJvdmlkZXJzOiBbXG4gKiAgICAgTXlTZXJ2aWNlLFxuICogICAgIHtwcm92aWRlOiBTdHJpbmcsIHZhbHVlOiAncHJvdmlkZXJzJyB9XG4gKiAgIF1cbiAqICAgdmlld1Byb3ZpZGVyczogW1xuICogICAgIHtwcm92aWRlOiBTdHJpbmcsIHZhbHVlOiAndmlld1Byb3ZpZGVycyd9XG4gKiAgIF1cbiAqIH0pXG4gKiBjbGFzcyBNeUNvbXBvbmVudCB7XG4gKiAgIGNvbnN0cnVjdG9yKG15U2VydmljZTogTXlTZXJ2aWNlLCB2YWx1ZTogU3RyaW5nKSB7XG4gKiAgICAgLy8gV2UgZXhwZWN0IHRoYXQgQ29tcG9uZW50IGNhbiBzZWUgaW50byBgdmlld1Byb3ZpZGVyc2AuXG4gKiAgICAgZXhwZWN0KHZhbHVlKS50b0VxdWFsKCd2aWV3UHJvdmlkZXJzJyk7XG4gKiAgICAgLy8gYE15U2VydmljZWAgd2FzIG5vdCBkZWNsYXJlZCBpbiBgdmlld1Byb3ZpZGVyc2AgaGVuY2UgaXQgY2FuJ3Qgc2VlIGl0LlxuICogICAgIGV4cGVjdChteVNlcnZpY2UudmFsdWUpLnRvRXF1YWwoJ3Byb3ZpZGVycycpO1xuICogICB9XG4gKiB9XG4gKlxuICogYGBgXG4gKi9cbmxldCBpbmNsdWRlVmlld1Byb3ZpZGVycyA9IHRydWU7XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRJbmNsdWRlVmlld1Byb3ZpZGVycyh2OiBib29sZWFuKTogYm9vbGVhbiB7XG4gIGNvbnN0IG9sZFZhbHVlID0gaW5jbHVkZVZpZXdQcm92aWRlcnM7XG4gIGluY2x1ZGVWaWV3UHJvdmlkZXJzID0gdjtcbiAgcmV0dXJuIG9sZFZhbHVlO1xufVxuXG4vKipcbiAqIFRoZSBudW1iZXIgb2Ygc2xvdHMgaW4gZWFjaCBibG9vbSBmaWx0ZXIgKHVzZWQgYnkgREkpLiBUaGUgbGFyZ2VyIHRoaXMgbnVtYmVyLCB0aGUgZmV3ZXJcbiAqIGRpcmVjdGl2ZXMgdGhhdCB3aWxsIHNoYXJlIHNsb3RzLCBhbmQgdGh1cywgdGhlIGZld2VyIGZhbHNlIHBvc2l0aXZlcyB3aGVuIGNoZWNraW5nIGZvclxuICogdGhlIGV4aXN0ZW5jZSBvZiBhIGRpcmVjdGl2ZS5cbiAqL1xuY29uc3QgQkxPT01fU0laRSA9IDI1NjtcbmNvbnN0IEJMT09NX01BU0sgPSBCTE9PTV9TSVpFIC0gMTtcblxuLyoqIENvdW50ZXIgdXNlZCB0byBnZW5lcmF0ZSB1bmlxdWUgSURzIGZvciBkaXJlY3RpdmVzLiAqL1xubGV0IG5leHROZ0VsZW1lbnRJZCA9IDA7XG5cbi8qKlxuICogUmVnaXN0ZXJzIHRoaXMgZGlyZWN0aXZlIGFzIHByZXNlbnQgaW4gaXRzIG5vZGUncyBpbmplY3RvciBieSBmbGlwcGluZyB0aGUgZGlyZWN0aXZlJ3NcbiAqIGNvcnJlc3BvbmRpbmcgYml0IGluIHRoZSBpbmplY3RvcidzIGJsb29tIGZpbHRlci5cbiAqXG4gKiBAcGFyYW0gaW5qZWN0b3JJbmRleCBUaGUgaW5kZXggb2YgdGhlIG5vZGUgaW5qZWN0b3Igd2hlcmUgdGhpcyB0b2tlbiBzaG91bGQgYmUgcmVnaXN0ZXJlZFxuICogQHBhcmFtIHRWaWV3IFRoZSBUVmlldyBmb3IgdGhlIGluamVjdG9yJ3MgYmxvb20gZmlsdGVyc1xuICogQHBhcmFtIHR5cGUgVGhlIGRpcmVjdGl2ZSB0b2tlbiB0byByZWdpc3RlclxuICovXG5leHBvcnQgZnVuY3Rpb24gYmxvb21BZGQoXG4gICAgaW5qZWN0b3JJbmRleDogbnVtYmVyLCB0VmlldzogVFZpZXcsIHR5cGU6IFR5cGU8YW55PnxJbmplY3Rpb25Ub2tlbjxhbnk+fHN0cmluZyk6IHZvaWQge1xuICBuZ0Rldk1vZGUgJiYgYXNzZXJ0RXF1YWwodFZpZXcuZmlyc3RDcmVhdGVQYXNzLCB0cnVlLCAnZXhwZWN0ZWQgZmlyc3RDcmVhdGVQYXNzIHRvIGJlIHRydWUnKTtcbiAgbGV0IGlkOiBudW1iZXJ8dW5kZWZpbmVkID1cbiAgICAgIHR5cGVvZiB0eXBlICE9PSAnc3RyaW5nJyA/ICh0eXBlIGFzIGFueSlbTkdfRUxFTUVOVF9JRF0gOiB0eXBlLmNoYXJDb2RlQXQoMCkgfHwgMDtcblxuICAvLyBTZXQgYSB1bmlxdWUgSUQgb24gdGhlIGRpcmVjdGl2ZSB0eXBlLCBzbyBpZiBzb21ldGhpbmcgdHJpZXMgdG8gaW5qZWN0IHRoZSBkaXJlY3RpdmUsXG4gIC8vIHdlIGNhbiBlYXNpbHkgcmV0cmlldmUgdGhlIElEIGFuZCBoYXNoIGl0IGludG8gdGhlIGJsb29tIGJpdCB0aGF0IHNob3VsZCBiZSBjaGVja2VkLlxuICBpZiAoaWQgPT0gbnVsbCkge1xuICAgIGlkID0gKHR5cGUgYXMgYW55KVtOR19FTEVNRU5UX0lEXSA9IG5leHROZ0VsZW1lbnRJZCsrO1xuICB9XG5cbiAgLy8gV2Ugb25seSBoYXZlIEJMT09NX1NJWkUgKDI1Nikgc2xvdHMgaW4gb3VyIGJsb29tIGZpbHRlciAoOCBidWNrZXRzICogMzIgYml0cyBlYWNoKSxcbiAgLy8gc28gYWxsIHVuaXF1ZSBJRHMgbXVzdCBiZSBtb2R1bG8tZWQgaW50byBhIG51bWJlciBmcm9tIDAgLSAyNTUgdG8gZml0IGludG8gdGhlIGZpbHRlci5cbiAgY29uc3QgYmxvb21CaXQgPSBpZCAmIEJMT09NX01BU0s7XG5cbiAgLy8gQ3JlYXRlIGEgbWFzayB0aGF0IHRhcmdldHMgdGhlIHNwZWNpZmljIGJpdCBhc3NvY2lhdGVkIHdpdGggdGhlIGRpcmVjdGl2ZS5cbiAgLy8gSlMgYml0IG9wZXJhdGlvbnMgYXJlIDMyIGJpdHMsIHNvIHRoaXMgd2lsbCBiZSBhIG51bWJlciBiZXR3ZWVuIDJeMCBhbmQgMl4zMSwgY29ycmVzcG9uZGluZ1xuICAvLyB0byBiaXQgcG9zaXRpb25zIDAgLSAzMSBpbiBhIDMyIGJpdCBpbnRlZ2VyLlxuICBjb25zdCBtYXNrID0gMSA8PCBibG9vbUJpdDtcblxuICAvLyBVc2UgdGhlIHJhdyBibG9vbUJpdCBudW1iZXIgdG8gZGV0ZXJtaW5lIHdoaWNoIGJsb29tIGZpbHRlciBidWNrZXQgd2Ugc2hvdWxkIGNoZWNrXG4gIC8vIGUuZzogYmYwID0gWzAgLSAzMV0sIGJmMSA9IFszMiAtIDYzXSwgYmYyID0gWzY0IC0gOTVdLCBiZjMgPSBbOTYgLSAxMjddLCBldGNcbiAgY29uc3QgYjcgPSBibG9vbUJpdCAmIDB4ODA7XG4gIGNvbnN0IGI2ID0gYmxvb21CaXQgJiAweDQwO1xuICBjb25zdCBiNSA9IGJsb29tQml0ICYgMHgyMDtcbiAgY29uc3QgdERhdGEgPSB0Vmlldy5kYXRhIGFzIG51bWJlcltdO1xuXG4gIGlmIChiNykge1xuICAgIGI2ID8gKGI1ID8gKHREYXRhW2luamVjdG9ySW5kZXggKyA3XSB8PSBtYXNrKSA6ICh0RGF0YVtpbmplY3RvckluZGV4ICsgNl0gfD0gbWFzaykpIDpcbiAgICAgICAgIChiNSA/ICh0RGF0YVtpbmplY3RvckluZGV4ICsgNV0gfD0gbWFzaykgOiAodERhdGFbaW5qZWN0b3JJbmRleCArIDRdIHw9IG1hc2spKTtcbiAgfSBlbHNlIHtcbiAgICBiNiA/IChiNSA/ICh0RGF0YVtpbmplY3RvckluZGV4ICsgM10gfD0gbWFzaykgOiAodERhdGFbaW5qZWN0b3JJbmRleCArIDJdIHw9IG1hc2spKSA6XG4gICAgICAgICAoYjUgPyAodERhdGFbaW5qZWN0b3JJbmRleCArIDFdIHw9IG1hc2spIDogKHREYXRhW2luamVjdG9ySW5kZXhdIHw9IG1hc2spKTtcbiAgfVxufVxuXG4vKipcbiAqIENyZWF0ZXMgKG9yIGdldHMgYW4gZXhpc3RpbmcpIGluamVjdG9yIGZvciBhIGdpdmVuIGVsZW1lbnQgb3IgY29udGFpbmVyLlxuICpcbiAqIEBwYXJhbSB0Tm9kZSBmb3Igd2hpY2ggYW4gaW5qZWN0b3Igc2hvdWxkIGJlIHJldHJpZXZlZCAvIGNyZWF0ZWQuXG4gKiBAcGFyYW0gaG9zdFZpZXcgVmlldyB3aGVyZSB0aGUgbm9kZSBpcyBzdG9yZWRcbiAqIEByZXR1cm5zIE5vZGUgaW5qZWN0b3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldE9yQ3JlYXRlTm9kZUluamVjdG9yRm9yTm9kZShcbiAgICB0Tm9kZTogVEVsZW1lbnROb2RlfFRDb250YWluZXJOb2RlfFRFbGVtZW50Q29udGFpbmVyTm9kZSwgaG9zdFZpZXc6IExWaWV3KTogbnVtYmVyIHtcbiAgY29uc3QgZXhpc3RpbmdJbmplY3RvckluZGV4ID0gZ2V0SW5qZWN0b3JJbmRleCh0Tm9kZSwgaG9zdFZpZXcpO1xuICBpZiAoZXhpc3RpbmdJbmplY3RvckluZGV4ICE9PSAtMSkge1xuICAgIHJldHVybiBleGlzdGluZ0luamVjdG9ySW5kZXg7XG4gIH1cblxuICBjb25zdCB0VmlldyA9IGhvc3RWaWV3W1RWSUVXXTtcbiAgaWYgKHRWaWV3LmZpcnN0Q3JlYXRlUGFzcykge1xuICAgIHROb2RlLmluamVjdG9ySW5kZXggPSBob3N0Vmlldy5sZW5ndGg7XG4gICAgaW5zZXJ0Qmxvb20odFZpZXcuZGF0YSwgdE5vZGUpOyAgLy8gZm91bmRhdGlvbiBmb3Igbm9kZSBibG9vbVxuICAgIGluc2VydEJsb29tKGhvc3RWaWV3LCBudWxsKTsgICAgIC8vIGZvdW5kYXRpb24gZm9yIGN1bXVsYXRpdmUgYmxvb21cbiAgICBpbnNlcnRCbG9vbSh0Vmlldy5ibHVlcHJpbnQsIG51bGwpO1xuICB9XG5cbiAgY29uc3QgcGFyZW50TG9jID0gZ2V0UGFyZW50SW5qZWN0b3JMb2NhdGlvbih0Tm9kZSwgaG9zdFZpZXcpO1xuICBjb25zdCBpbmplY3RvckluZGV4ID0gdE5vZGUuaW5qZWN0b3JJbmRleDtcblxuICAvLyBJZiBhIHBhcmVudCBpbmplY3RvciBjYW4ndCBiZSBmb3VuZCwgaXRzIGxvY2F0aW9uIGlzIHNldCB0byAtMS5cbiAgLy8gSW4gdGhhdCBjYXNlLCB3ZSBkb24ndCBuZWVkIHRvIHNldCB1cCBhIGN1bXVsYXRpdmUgYmxvb21cbiAgaWYgKGhhc1BhcmVudEluamVjdG9yKHBhcmVudExvYykpIHtcbiAgICBjb25zdCBwYXJlbnRJbmRleCA9IGdldFBhcmVudEluamVjdG9ySW5kZXgocGFyZW50TG9jKTtcbiAgICBjb25zdCBwYXJlbnRMVmlldyA9IGdldFBhcmVudEluamVjdG9yVmlldyhwYXJlbnRMb2MsIGhvc3RWaWV3KTtcbiAgICBjb25zdCBwYXJlbnREYXRhID0gcGFyZW50TFZpZXdbVFZJRVddLmRhdGEgYXMgYW55O1xuICAgIC8vIENyZWF0ZXMgYSBjdW11bGF0aXZlIGJsb29tIGZpbHRlciB0aGF0IG1lcmdlcyB0aGUgcGFyZW50J3MgYmxvb20gZmlsdGVyXG4gICAgLy8gYW5kIGl0cyBvd24gY3VtdWxhdGl2ZSBibG9vbSAod2hpY2ggY29udGFpbnMgdG9rZW5zIGZvciBhbGwgYW5jZXN0b3JzKVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgODsgaSsrKSB7XG4gICAgICBob3N0Vmlld1tpbmplY3RvckluZGV4ICsgaV0gPSBwYXJlbnRMVmlld1twYXJlbnRJbmRleCArIGldIHwgcGFyZW50RGF0YVtwYXJlbnRJbmRleCArIGldO1xuICAgIH1cbiAgfVxuXG4gIGhvc3RWaWV3W2luamVjdG9ySW5kZXggKyBQQVJFTlRfSU5KRUNUT1JdID0gcGFyZW50TG9jO1xuICByZXR1cm4gaW5qZWN0b3JJbmRleDtcbn1cblxuZnVuY3Rpb24gaW5zZXJ0Qmxvb20oYXJyOiBhbnlbXSwgZm9vdGVyOiBUTm9kZXxudWxsKTogdm9pZCB7XG4gIGFyci5wdXNoKDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIGZvb3Rlcik7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEluamVjdG9ySW5kZXgodE5vZGU6IFROb2RlLCBob3N0VmlldzogTFZpZXcpOiBudW1iZXIge1xuICBpZiAodE5vZGUuaW5qZWN0b3JJbmRleCA9PT0gLTEgfHxcbiAgICAgIC8vIElmIHRoZSBpbmplY3RvciBpbmRleCBpcyB0aGUgc2FtZSBhcyBpdHMgcGFyZW50J3MgaW5qZWN0b3IgaW5kZXgsIHRoZW4gdGhlIGluZGV4IGhhcyBiZWVuXG4gICAgICAvLyBjb3BpZWQgZG93biBmcm9tIHRoZSBwYXJlbnQgbm9kZS4gTm8gaW5qZWN0b3IgaGFzIGJlZW4gY3JlYXRlZCB5ZXQgb24gdGhpcyBub2RlLlxuICAgICAgKHROb2RlLnBhcmVudCAmJiB0Tm9kZS5wYXJlbnQuaW5qZWN0b3JJbmRleCA9PT0gdE5vZGUuaW5qZWN0b3JJbmRleCkgfHxcbiAgICAgIC8vIEFmdGVyIHRoZSBmaXJzdCB0ZW1wbGF0ZSBwYXNzLCB0aGUgaW5qZWN0b3IgaW5kZXggbWlnaHQgZXhpc3QgYnV0IHRoZSBwYXJlbnQgdmFsdWVzXG4gICAgICAvLyBtaWdodCBub3QgaGF2ZSBiZWVuIGNhbGN1bGF0ZWQgeWV0IGZvciB0aGlzIGluc3RhbmNlXG4gICAgICBob3N0Vmlld1t0Tm9kZS5pbmplY3RvckluZGV4ICsgUEFSRU5UX0lOSkVDVE9SXSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIC0xO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB0Tm9kZS5pbmplY3RvckluZGV4O1xuICB9XG59XG5cbi8qKlxuICogRmluZHMgdGhlIGluZGV4IG9mIHRoZSBwYXJlbnQgaW5qZWN0b3IsIHdpdGggYSB2aWV3IG9mZnNldCBpZiBhcHBsaWNhYmxlLiBVc2VkIHRvIHNldCB0aGVcbiAqIHBhcmVudCBpbmplY3RvciBpbml0aWFsbHkuXG4gKlxuICogUmV0dXJucyBhIGNvbWJpbmF0aW9uIG9mIG51bWJlciBvZiBgVmlld0RhdGFgIHdlIGhhdmUgdG8gZ28gdXAgYW5kIGluZGV4IGluIHRoYXQgYFZpZXdkYXRhYFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0UGFyZW50SW5qZWN0b3JMb2NhdGlvbih0Tm9kZTogVE5vZGUsIHZpZXc6IExWaWV3KTogUmVsYXRpdmVJbmplY3RvckxvY2F0aW9uIHtcbiAgaWYgKHROb2RlLnBhcmVudCAmJiB0Tm9kZS5wYXJlbnQuaW5qZWN0b3JJbmRleCAhPT0gLTEpIHtcbiAgICByZXR1cm4gdE5vZGUucGFyZW50LmluamVjdG9ySW5kZXggYXMgYW55OyAgLy8gVmlld09mZnNldCBpcyAwXG4gIH1cblxuICAvLyBGb3IgbW9zdCBjYXNlcywgdGhlIHBhcmVudCBpbmplY3RvciBpbmRleCBjYW4gYmUgZm91bmQgb24gdGhlIGhvc3Qgbm9kZSAoZS5nLiBmb3IgY29tcG9uZW50XG4gIC8vIG9yIGNvbnRhaW5lciksIHNvIHRoaXMgbG9vcCB3aWxsIGJlIHNraXBwZWQsIGJ1dCB3ZSBtdXN0IGtlZXAgdGhlIGxvb3AgaGVyZSB0byBzdXBwb3J0XG4gIC8vIHRoZSByYXJlciBjYXNlIG9mIGRlZXBseSBuZXN0ZWQgPG5nLXRlbXBsYXRlPiB0YWdzIG9yIGlubGluZSB2aWV3cy5cbiAgbGV0IGhvc3RUTm9kZSA9IHZpZXdbVF9IT1NUXTtcbiAgbGV0IHZpZXdPZmZzZXQgPSAxO1xuICB3aGlsZSAoaG9zdFROb2RlICYmIGhvc3RUTm9kZS5pbmplY3RvckluZGV4ID09PSAtMSkge1xuICAgIHZpZXcgPSB2aWV3W0RFQ0xBUkFUSU9OX1ZJRVddITtcbiAgICBob3N0VE5vZGUgPSB2aWV3ID8gdmlld1tUX0hPU1RdIDogbnVsbDtcbiAgICB2aWV3T2Zmc2V0Kys7XG4gIH1cblxuICByZXR1cm4gaG9zdFROb2RlID9cbiAgICAgIGhvc3RUTm9kZS5pbmplY3RvckluZGV4IHwgKHZpZXdPZmZzZXQgPDwgUmVsYXRpdmVJbmplY3RvckxvY2F0aW9uRmxhZ3MuVmlld09mZnNldFNoaWZ0KSA6XG4gICAgICAtMSBhcyBhbnk7XG59XG5cbi8qKlxuICogTWFrZXMgYSB0eXBlIG9yIGFuIGluamVjdGlvbiB0b2tlbiBwdWJsaWMgdG8gdGhlIERJIHN5c3RlbSBieSBhZGRpbmcgaXQgdG8gYW5cbiAqIGluamVjdG9yJ3MgYmxvb20gZmlsdGVyLlxuICpcbiAqIEBwYXJhbSBkaSBUaGUgbm9kZSBpbmplY3RvciBpbiB3aGljaCBhIGRpcmVjdGl2ZSB3aWxsIGJlIGFkZGVkXG4gKiBAcGFyYW0gdG9rZW4gVGhlIHR5cGUgb3IgdGhlIGluamVjdGlvbiB0b2tlbiB0byBiZSBtYWRlIHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gZGlQdWJsaWNJbkluamVjdG9yKFxuICAgIGluamVjdG9ySW5kZXg6IG51bWJlciwgdFZpZXc6IFRWaWV3LCB0b2tlbjogSW5qZWN0aW9uVG9rZW48YW55PnxUeXBlPGFueT4pOiB2b2lkIHtcbiAgYmxvb21BZGQoaW5qZWN0b3JJbmRleCwgdFZpZXcsIHRva2VuKTtcbn1cblxuLyoqXG4gKiBJbmplY3Qgc3RhdGljIGF0dHJpYnV0ZSB2YWx1ZSBpbnRvIGRpcmVjdGl2ZSBjb25zdHJ1Y3Rvci5cbiAqXG4gKiBUaGlzIG1ldGhvZCBpcyB1c2VkIHdpdGggYGZhY3RvcnlgIGZ1bmN0aW9ucyB3aGljaCBhcmUgZ2VuZXJhdGVkIGFzIHBhcnQgb2ZcbiAqIGBkZWZpbmVEaXJlY3RpdmVgIG9yIGBkZWZpbmVDb21wb25lbnRgLiBUaGUgbWV0aG9kIHJldHJpZXZlcyB0aGUgc3RhdGljIHZhbHVlXG4gKiBvZiBhbiBhdHRyaWJ1dGUuIChEeW5hbWljIGF0dHJpYnV0ZXMgYXJlIG5vdCBzdXBwb3J0ZWQgc2luY2UgdGhleSBhcmUgbm90IHJlc29sdmVkXG4gKiAgYXQgdGhlIHRpbWUgb2YgaW5qZWN0aW9uIGFuZCBjYW4gY2hhbmdlIG92ZXIgdGltZS4pXG4gKlxuICogIyBFeGFtcGxlXG4gKiBHaXZlbjpcbiAqIGBgYFxuICogQENvbXBvbmVudCguLi4pXG4gKiBjbGFzcyBNeUNvbXBvbmVudCB7XG4gKiAgIGNvbnN0cnVjdG9yKEBBdHRyaWJ1dGUoJ3RpdGxlJykgdGl0bGU6IHN0cmluZykgeyAuLi4gfVxuICogfVxuICogYGBgXG4gKiBXaGVuIGluc3RhbnRpYXRlZCB3aXRoXG4gKiBgYGBcbiAqIDxteS1jb21wb25lbnQgdGl0bGU9XCJIZWxsb1wiPjwvbXktY29tcG9uZW50PlxuICogYGBgXG4gKlxuICogVGhlbiBmYWN0b3J5IG1ldGhvZCBnZW5lcmF0ZWQgaXM6XG4gKiBgYGBcbiAqIE15Q29tcG9uZW50Lsm1Y21wID0gZGVmaW5lQ29tcG9uZW50KHtcbiAqICAgZmFjdG9yeTogKCkgPT4gbmV3IE15Q29tcG9uZW50KGluamVjdEF0dHJpYnV0ZSgndGl0bGUnKSlcbiAqICAgLi4uXG4gKiB9KVxuICogYGBgXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gaW5qZWN0QXR0cmlidXRlSW1wbCh0Tm9kZTogVE5vZGUsIGF0dHJOYW1lVG9JbmplY3Q6IHN0cmluZyk6IHN0cmluZ3xudWxsIHtcbiAgbmdEZXZNb2RlICYmXG4gICAgICBhc3NlcnROb2RlT2ZQb3NzaWJsZVR5cGVzKFxuICAgICAgICAgIHROb2RlLCBUTm9kZVR5cGUuQ29udGFpbmVyLCBUTm9kZVR5cGUuRWxlbWVudCwgVE5vZGVUeXBlLkVsZW1lbnRDb250YWluZXIpO1xuICBuZ0Rldk1vZGUgJiYgYXNzZXJ0RGVmaW5lZCh0Tm9kZSwgJ2V4cGVjdGluZyB0Tm9kZScpO1xuICBpZiAoYXR0ck5hbWVUb0luamVjdCA9PT0gJ2NsYXNzJykge1xuICAgIHJldHVybiB0Tm9kZS5jbGFzc2VzO1xuICB9XG4gIGlmIChhdHRyTmFtZVRvSW5qZWN0ID09PSAnc3R5bGUnKSB7XG4gICAgcmV0dXJuIHROb2RlLnN0eWxlcztcbiAgfVxuXG4gIGNvbnN0IGF0dHJzID0gdE5vZGUuYXR0cnM7XG4gIGlmIChhdHRycykge1xuICAgIGNvbnN0IGF0dHJzTGVuZ3RoID0gYXR0cnMubGVuZ3RoO1xuICAgIGxldCBpID0gMDtcbiAgICB3aGlsZSAoaSA8IGF0dHJzTGVuZ3RoKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IGF0dHJzW2ldO1xuXG4gICAgICAvLyBJZiB3ZSBoaXQgYSBgQmluZGluZ3NgIG9yIGBUZW1wbGF0ZWAgbWFya2VyIHRoZW4gd2UgYXJlIGRvbmUuXG4gICAgICBpZiAoaXNOYW1lT25seUF0dHJpYnV0ZU1hcmtlcih2YWx1ZSkpIGJyZWFrO1xuXG4gICAgICAvLyBTa2lwIG5hbWVzcGFjZWQgYXR0cmlidXRlc1xuICAgICAgaWYgKHZhbHVlID09PSBBdHRyaWJ1dGVNYXJrZXIuTmFtZXNwYWNlVVJJKSB7XG4gICAgICAgIC8vIHdlIHNraXAgdGhlIG5leHQgdHdvIHZhbHVlc1xuICAgICAgICAvLyBhcyBuYW1lc3BhY2VkIGF0dHJpYnV0ZXMgbG9va3MgbGlrZVxuICAgICAgICAvLyBbLi4uLCBBdHRyaWJ1dGVNYXJrZXIuTmFtZXNwYWNlVVJJLCAnaHR0cDovL3NvbWV1cmkuY29tL3Rlc3QnLCAndGVzdDpleGlzdCcsXG4gICAgICAgIC8vICdleGlzdFZhbHVlJywgLi4uXVxuICAgICAgICBpID0gaSArIDI7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgLy8gU2tpcCB0byB0aGUgZmlyc3QgdmFsdWUgb2YgdGhlIG1hcmtlZCBhdHRyaWJ1dGUuXG4gICAgICAgIGkrKztcbiAgICAgICAgd2hpbGUgKGkgPCBhdHRyc0xlbmd0aCAmJiB0eXBlb2YgYXR0cnNbaV0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHZhbHVlID09PSBhdHRyTmFtZVRvSW5qZWN0KSB7XG4gICAgICAgIHJldHVybiBhdHRyc1tpICsgMV0gYXMgc3RyaW5nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaSA9IGkgKyAyO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuXG4vKipcbiAqIFJldHVybnMgdGhlIHZhbHVlIGFzc29jaWF0ZWQgdG8gdGhlIGdpdmVuIHRva2VuIGZyb20gdGhlIE5vZGVJbmplY3RvcnMgPT4gTW9kdWxlSW5qZWN0b3IuXG4gKlxuICogTG9vayBmb3IgdGhlIGluamVjdG9yIHByb3ZpZGluZyB0aGUgdG9rZW4gYnkgd2Fsa2luZyB1cCB0aGUgbm9kZSBpbmplY3RvciB0cmVlIGFuZCB0aGVuXG4gKiB0aGUgbW9kdWxlIGluamVjdG9yIHRyZWUuXG4gKlxuICogVGhpcyBmdW5jdGlvbiBwYXRjaGVzIGB0b2tlbmAgd2l0aCBgX19OR19FTEVNRU5UX0lEX19gIHdoaWNoIGNvbnRhaW5zIHRoZSBpZCBmb3IgdGhlIGJsb29tXG4gKiBmaWx0ZXIuIE5lZ2F0aXZlIHZhbHVlcyBhcmUgcmVzZXJ2ZWQgZm9yIHNwZWNpYWwgb2JqZWN0cy5cbiAqICAgLSBgLTFgIGlzIHJlc2VydmVkIGZvciBpbmplY3RpbmcgYEluamVjdG9yYCAoaW1wbGVtZW50ZWQgYnkgYE5vZGVJbmplY3RvcmApXG4gKlxuICogQHBhcmFtIHROb2RlIFRoZSBOb2RlIHdoZXJlIHRoZSBzZWFyY2ggZm9yIHRoZSBpbmplY3RvciBzaG91bGQgc3RhcnRcbiAqIEBwYXJhbSBsVmlldyBUaGUgYExWaWV3YCB0aGF0IGNvbnRhaW5zIHRoZSBgdE5vZGVgXG4gKiBAcGFyYW0gdG9rZW4gVGhlIHRva2VuIHRvIGxvb2sgZm9yXG4gKiBAcGFyYW0gZmxhZ3MgSW5qZWN0aW9uIGZsYWdzXG4gKiBAcGFyYW0gbm90Rm91bmRWYWx1ZSBUaGUgdmFsdWUgdG8gcmV0dXJuIHdoZW4gdGhlIGluamVjdGlvbiBmbGFncyBpcyBgSW5qZWN0RmxhZ3MuT3B0aW9uYWxgXG4gKiBAcmV0dXJucyB0aGUgdmFsdWUgZnJvbSB0aGUgaW5qZWN0b3IsIGBudWxsYCB3aGVuIG5vdCBmb3VuZCwgb3IgYG5vdEZvdW5kVmFsdWVgIGlmIHByb3ZpZGVkXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRPckNyZWF0ZUluamVjdGFibGU8VD4oXG4gICAgdE5vZGU6IFREaXJlY3RpdmVIb3N0Tm9kZXxudWxsLCBsVmlldzogTFZpZXcsIHRva2VuOiBUeXBlPFQ+fEluamVjdGlvblRva2VuPFQ+LFxuICAgIGZsYWdzOiBJbmplY3RGbGFncyA9IEluamVjdEZsYWdzLkRlZmF1bHQsIG5vdEZvdW5kVmFsdWU/OiBhbnkpOiBUfG51bGwge1xuICBpZiAodE5vZGUgIT09IG51bGwpIHtcbiAgICBjb25zdCBibG9vbUhhc2ggPSBibG9vbUhhc2hCaXRPckZhY3RvcnkodG9rZW4pO1xuICAgIC8vIElmIHRoZSBJRCBzdG9yZWQgaGVyZSBpcyBhIGZ1bmN0aW9uLCB0aGlzIGlzIGEgc3BlY2lhbCBvYmplY3QgbGlrZSBFbGVtZW50UmVmIG9yIFRlbXBsYXRlUmVmXG4gICAgLy8gc28ganVzdCBjYWxsIHRoZSBmYWN0b3J5IGZ1bmN0aW9uIHRvIGNyZWF0ZSBpdC5cbiAgICBpZiAodHlwZW9mIGJsb29tSGFzaCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgZW50ZXJESShsVmlldywgdE5vZGUpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBibG9vbUhhc2goKTtcbiAgICAgICAgaWYgKHZhbHVlID09IG51bGwgJiYgIShmbGFncyAmIEluamVjdEZsYWdzLk9wdGlvbmFsKSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTm8gcHJvdmlkZXIgZm9yICR7c3RyaW5naWZ5Rm9yRXJyb3IodG9rZW4pfSFgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGxlYXZlREkoKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBibG9vbUhhc2ggPT0gJ251bWJlcicpIHtcbiAgICAgIGlmIChibG9vbUhhc2ggPT09IC0xKSB7XG4gICAgICAgIC8vIGAtMWAgaXMgYSBzcGVjaWFsIHZhbHVlIHVzZWQgdG8gaWRlbnRpZnkgYEluamVjdG9yYCB0eXBlcy5cbiAgICAgICAgcmV0dXJuIG5ldyBOb2RlSW5qZWN0b3IodE5vZGUsIGxWaWV3KSBhcyBhbnk7XG4gICAgICB9XG4gICAgICAvLyBJZiB0aGUgdG9rZW4gaGFzIGEgYmxvb20gaGFzaCwgdGhlbiBpdCBpcyBhIHRva2VuIHdoaWNoIGNvdWxkIGJlIGluIE5vZGVJbmplY3Rvci5cblxuICAgICAgLy8gQSByZWZlcmVuY2UgdG8gdGhlIHByZXZpb3VzIGluamVjdG9yIFRWaWV3IHRoYXQgd2FzIGZvdW5kIHdoaWxlIGNsaW1iaW5nIHRoZSBlbGVtZW50XG4gICAgICAvLyBpbmplY3RvciB0cmVlLiBUaGlzIGlzIHVzZWQgdG8ga25vdyBpZiB2aWV3UHJvdmlkZXJzIGNhbiBiZSBhY2Nlc3NlZCBvbiB0aGUgY3VycmVudFxuICAgICAgLy8gaW5qZWN0b3IuXG4gICAgICBsZXQgcHJldmlvdXNUVmlldzogVFZpZXd8bnVsbCA9IG51bGw7XG4gICAgICBsZXQgaW5qZWN0b3JJbmRleCA9IGdldEluamVjdG9ySW5kZXgodE5vZGUsIGxWaWV3KTtcbiAgICAgIGxldCBwYXJlbnRMb2NhdGlvbjogUmVsYXRpdmVJbmplY3RvckxvY2F0aW9uID0gTk9fUEFSRU5UX0lOSkVDVE9SO1xuICAgICAgbGV0IGhvc3RURWxlbWVudE5vZGU6IFROb2RlfG51bGwgPVxuICAgICAgICAgIGZsYWdzICYgSW5qZWN0RmxhZ3MuSG9zdCA/IGxWaWV3W0RFQ0xBUkFUSU9OX0NPTVBPTkVOVF9WSUVXXVtUX0hPU1RdIDogbnVsbDtcblxuICAgICAgLy8gSWYgd2Ugc2hvdWxkIHNraXAgdGhpcyBpbmplY3Rvciwgb3IgaWYgdGhlcmUgaXMgbm8gaW5qZWN0b3Igb24gdGhpcyBub2RlLCBzdGFydCBieVxuICAgICAgLy8gc2VhcmNoaW5nXG4gICAgICAvLyB0aGUgcGFyZW50IGluamVjdG9yLlxuICAgICAgaWYgKGluamVjdG9ySW5kZXggPT09IC0xIHx8IGZsYWdzICYgSW5qZWN0RmxhZ3MuU2tpcFNlbGYpIHtcbiAgICAgICAgcGFyZW50TG9jYXRpb24gPSBpbmplY3RvckluZGV4ID09PSAtMSA/IGdldFBhcmVudEluamVjdG9yTG9jYXRpb24odE5vZGUsIGxWaWV3KSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsVmlld1tpbmplY3RvckluZGV4ICsgUEFSRU5UX0lOSkVDVE9SXTtcblxuICAgICAgICBpZiAoIXNob3VsZFNlYXJjaFBhcmVudChmbGFncywgZmFsc2UpKSB7XG4gICAgICAgICAgaW5qZWN0b3JJbmRleCA9IC0xO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHByZXZpb3VzVFZpZXcgPSBsVmlld1tUVklFV107XG4gICAgICAgICAgaW5qZWN0b3JJbmRleCA9IGdldFBhcmVudEluamVjdG9ySW5kZXgocGFyZW50TG9jYXRpb24pO1xuICAgICAgICAgIGxWaWV3ID0gZ2V0UGFyZW50SW5qZWN0b3JWaWV3KHBhcmVudExvY2F0aW9uLCBsVmlldyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVHJhdmVyc2UgdXAgdGhlIGluamVjdG9yIHRyZWUgdW50aWwgd2UgZmluZCBhIHBvdGVudGlhbCBtYXRjaCBvciB1bnRpbCB3ZSBrbm93IHRoZXJlXG4gICAgICAvLyAqaXNuJ3QqIGEgbWF0Y2guXG4gICAgICB3aGlsZSAoaW5qZWN0b3JJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgcGFyZW50TG9jYXRpb24gPSBsVmlld1tpbmplY3RvckluZGV4ICsgUEFSRU5UX0lOSkVDVE9SXTtcblxuICAgICAgICAvLyBDaGVjayB0aGUgY3VycmVudCBpbmplY3Rvci4gSWYgaXQgbWF0Y2hlcywgc2VlIGlmIGl0IGNvbnRhaW5zIHRva2VuLlxuICAgICAgICBjb25zdCB0VmlldyA9IGxWaWV3W1RWSUVXXTtcbiAgICAgICAgaWYgKGJsb29tSGFzVG9rZW4oYmxvb21IYXNoLCBpbmplY3RvckluZGV4LCB0Vmlldy5kYXRhKSkge1xuICAgICAgICAgIC8vIEF0IHRoaXMgcG9pbnQsIHdlIGhhdmUgYW4gaW5qZWN0b3Igd2hpY2ggKm1heSogY29udGFpbiB0aGUgdG9rZW4sIHNvIHdlIHN0ZXAgdGhyb3VnaFxuICAgICAgICAgIC8vIHRoZSBwcm92aWRlcnMgYW5kIGRpcmVjdGl2ZXMgYXNzb2NpYXRlZCB3aXRoIHRoZSBpbmplY3RvcidzIGNvcnJlc3BvbmRpbmcgbm9kZSB0byBnZXRcbiAgICAgICAgICAvLyB0aGUgaW5zdGFuY2UuXG4gICAgICAgICAgY29uc3QgaW5zdGFuY2U6IFR8bnVsbCA9IHNlYXJjaFRva2Vuc09uSW5qZWN0b3I8VD4oXG4gICAgICAgICAgICAgIGluamVjdG9ySW5kZXgsIGxWaWV3LCB0b2tlbiwgcHJldmlvdXNUVmlldywgZmxhZ3MsIGhvc3RURWxlbWVudE5vZGUpO1xuICAgICAgICAgIGlmIChpbnN0YW5jZSAhPT0gTk9UX0ZPVU5EKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5zdGFuY2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChzaG91bGRTZWFyY2hQYXJlbnQoXG4gICAgICAgICAgICAgICAgZmxhZ3MsIGxWaWV3W1RWSUVXXS5kYXRhW2luamVjdG9ySW5kZXggKyBUTk9ERV0gPT09IGhvc3RURWxlbWVudE5vZGUpICYmXG4gICAgICAgICAgICBibG9vbUhhc1Rva2VuKGJsb29tSGFzaCwgaW5qZWN0b3JJbmRleCwgbFZpZXcpKSB7XG4gICAgICAgICAgLy8gVGhlIGRlZiB3YXNuJ3QgZm91bmQgYW55d2hlcmUgb24gdGhpcyBub2RlLCBzbyBpdCB3YXMgYSBmYWxzZSBwb3NpdGl2ZS5cbiAgICAgICAgICAvLyBUcmF2ZXJzZSB1cCB0aGUgdHJlZSBhbmQgY29udGludWUgc2VhcmNoaW5nLlxuICAgICAgICAgIHByZXZpb3VzVFZpZXcgPSB0VmlldztcbiAgICAgICAgICBpbmplY3RvckluZGV4ID0gZ2V0UGFyZW50SW5qZWN0b3JJbmRleChwYXJlbnRMb2NhdGlvbik7XG4gICAgICAgICAgbFZpZXcgPSBnZXRQYXJlbnRJbmplY3RvclZpZXcocGFyZW50TG9jYXRpb24sIGxWaWV3KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBJZiB3ZSBzaG91bGQgbm90IHNlYXJjaCBwYXJlbnQgT1IgSWYgdGhlIGFuY2VzdG9yIGJsb29tIGZpbHRlciB2YWx1ZSBkb2VzIG5vdCBoYXZlIHRoZVxuICAgICAgICAgIC8vIGJpdCBjb3JyZXNwb25kaW5nIHRvIHRoZSBkaXJlY3RpdmUgd2UgY2FuIGdpdmUgdXAgb24gdHJhdmVyc2luZyB1cCB0byBmaW5kIHRoZSBzcGVjaWZpY1xuICAgICAgICAgIC8vIGluamVjdG9yLlxuICAgICAgICAgIGluamVjdG9ySW5kZXggPSAtMTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChmbGFncyAmIEluamVjdEZsYWdzLk9wdGlvbmFsICYmIG5vdEZvdW5kVmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgIC8vIFRoaXMgbXVzdCBiZSBzZXQgb3IgdGhlIE51bGxJbmplY3RvciB3aWxsIHRocm93IGZvciBvcHRpb25hbCBkZXBzXG4gICAgbm90Rm91bmRWYWx1ZSA9IG51bGw7XG4gIH1cblxuICBpZiAoKGZsYWdzICYgKEluamVjdEZsYWdzLlNlbGYgfCBJbmplY3RGbGFncy5Ib3N0KSkgPT09IDApIHtcbiAgICBjb25zdCBtb2R1bGVJbmplY3RvciA9IGxWaWV3W0lOSkVDVE9SXTtcbiAgICAvLyBzd2l0Y2ggdG8gYGluamVjdEluamVjdG9yT25seWAgaW1wbGVtZW50YXRpb24gZm9yIG1vZHVsZSBpbmplY3Rvciwgc2luY2UgbW9kdWxlIGluamVjdG9yXG4gICAgLy8gc2hvdWxkIG5vdCBoYXZlIGFjY2VzcyB0byBDb21wb25lbnQvRGlyZWN0aXZlIERJIHNjb3BlICh0aGF0IG1heSBoYXBwZW4gdGhyb3VnaFxuICAgIC8vIGBkaXJlY3RpdmVJbmplY3RgIGltcGxlbWVudGF0aW9uKVxuICAgIGNvbnN0IHByZXZpb3VzSW5qZWN0SW1wbGVtZW50YXRpb24gPSBzZXRJbmplY3RJbXBsZW1lbnRhdGlvbih1bmRlZmluZWQpO1xuICAgIHRyeSB7XG4gICAgICBpZiAobW9kdWxlSW5qZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIG1vZHVsZUluamVjdG9yLmdldCh0b2tlbiwgbm90Rm91bmRWYWx1ZSwgZmxhZ3MgJiBJbmplY3RGbGFncy5PcHRpb25hbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gaW5qZWN0Um9vdExpbXBNb2RlKHRva2VuLCBub3RGb3VuZFZhbHVlLCBmbGFncyAmIEluamVjdEZsYWdzLk9wdGlvbmFsKTtcbiAgICAgIH1cbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0SW5qZWN0SW1wbGVtZW50YXRpb24ocHJldmlvdXNJbmplY3RJbXBsZW1lbnRhdGlvbik7XG4gICAgfVxuICB9XG4gIGlmIChmbGFncyAmIEluamVjdEZsYWdzLk9wdGlvbmFsKSB7XG4gICAgcmV0dXJuIG5vdEZvdW5kVmFsdWU7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBOb2RlSW5qZWN0b3I6IE5PVF9GT1VORCBbJHtzdHJpbmdpZnlGb3JFcnJvcih0b2tlbil9XWApO1xuICB9XG59XG5cbmNvbnN0IE5PVF9GT1VORCA9IHt9O1xuXG5mdW5jdGlvbiBzZWFyY2hUb2tlbnNPbkluamVjdG9yPFQ+KFxuICAgIGluamVjdG9ySW5kZXg6IG51bWJlciwgbFZpZXc6IExWaWV3LCB0b2tlbjogVHlwZTxUPnxJbmplY3Rpb25Ub2tlbjxUPixcbiAgICBwcmV2aW91c1RWaWV3OiBUVmlld3xudWxsLCBmbGFnczogSW5qZWN0RmxhZ3MsIGhvc3RURWxlbWVudE5vZGU6IFROb2RlfG51bGwpIHtcbiAgY29uc3QgY3VycmVudFRWaWV3ID0gbFZpZXdbVFZJRVddO1xuICBjb25zdCB0Tm9kZSA9IGN1cnJlbnRUVmlldy5kYXRhW2luamVjdG9ySW5kZXggKyBUTk9ERV0gYXMgVE5vZGU7XG4gIC8vIEZpcnN0LCB3ZSBuZWVkIHRvIGRldGVybWluZSBpZiB2aWV3IHByb3ZpZGVycyBjYW4gYmUgYWNjZXNzZWQgYnkgdGhlIHN0YXJ0aW5nIGVsZW1lbnQuXG4gIC8vIFRoZXJlIGFyZSB0d28gcG9zc2liaXRpZXNcbiAgY29uc3QgY2FuQWNjZXNzVmlld1Byb3ZpZGVycyA9IHByZXZpb3VzVFZpZXcgPT0gbnVsbCA/XG4gICAgICAvLyAxKSBUaGlzIGlzIHRoZSBmaXJzdCBpbnZvY2F0aW9uIGBwcmV2aW91c1RWaWV3ID09IG51bGxgIHdoaWNoIG1lYW5zIHRoYXQgd2UgYXJlIGF0IHRoZVxuICAgICAgLy8gYFROb2RlYCBvZiB3aGVyZSBpbmplY3RvciBpcyBzdGFydGluZyB0byBsb29rLiBJbiBzdWNoIGEgY2FzZSB0aGUgb25seSB0aW1lIHdlIGFyZSBhbGxvd2VkXG4gICAgICAvLyB0byBsb29rIGludG8gdGhlIFZpZXdQcm92aWRlcnMgaXMgaWY6XG4gICAgICAvLyAtIHdlIGFyZSBvbiBhIGNvbXBvbmVudFxuICAgICAgLy8gLSBBTkQgdGhlIGluamVjdG9yIHNldCBgaW5jbHVkZVZpZXdQcm92aWRlcnNgIHRvIHRydWUgKGltcGx5aW5nIHRoYXQgdGhlIHRva2VuIGNhbiBzZWVcbiAgICAgIC8vIFZpZXdQcm92aWRlcnMgYmVjYXVzZSBpdCBpcyB0aGUgQ29tcG9uZW50IG9yIGEgU2VydmljZSB3aGljaCBpdHNlbGYgd2FzIGRlY2xhcmVkIGluXG4gICAgICAvLyBWaWV3UHJvdmlkZXJzKVxuICAgICAgKGlzQ29tcG9uZW50SG9zdCh0Tm9kZSkgJiYgaW5jbHVkZVZpZXdQcm92aWRlcnMpIDpcbiAgICAgIC8vIDIpIGBwcmV2aW91c1RWaWV3ICE9IG51bGxgIHdoaWNoIG1lYW5zIHRoYXQgd2UgYXJlIG5vdyB3YWxraW5nIGFjcm9zcyB0aGUgcGFyZW50IG5vZGVzLlxuICAgICAgLy8gSW4gc3VjaCBhIGNhc2Ugd2UgYXJlIG9ubHkgYWxsb3dlZCB0byBsb29rIGludG8gdGhlIFZpZXdQcm92aWRlcnMgaWY6XG4gICAgICAvLyAtIFdlIGp1c3QgY3Jvc3NlZCBmcm9tIGNoaWxkIFZpZXcgdG8gUGFyZW50IFZpZXcgYHByZXZpb3VzVFZpZXcgIT0gY3VycmVudFRWaWV3YFxuICAgICAgLy8gLSBBTkQgdGhlIHBhcmVudCBUTm9kZSBpcyBhbiBFbGVtZW50LlxuICAgICAgLy8gVGhpcyBtZWFucyB0aGF0IHdlIGp1c3QgY2FtZSBmcm9tIHRoZSBDb21wb25lbnQncyBWaWV3IGFuZCB0aGVyZWZvcmUgYXJlIGFsbG93ZWQgdG8gc2VlXG4gICAgICAvLyBpbnRvIHRoZSBWaWV3UHJvdmlkZXJzLlxuICAgICAgKHByZXZpb3VzVFZpZXcgIT0gY3VycmVudFRWaWV3ICYmICh0Tm9kZS50eXBlID09PSBUTm9kZVR5cGUuRWxlbWVudCkpO1xuXG4gIC8vIFRoaXMgc3BlY2lhbCBjYXNlIGhhcHBlbnMgd2hlbiB0aGVyZSBpcyBhIEBob3N0IG9uIHRoZSBpbmplY3QgYW5kIHdoZW4gd2UgYXJlIHNlYXJjaGluZ1xuICAvLyBvbiB0aGUgaG9zdCBlbGVtZW50IG5vZGUuXG4gIGNvbnN0IGlzSG9zdFNwZWNpYWxDYXNlID0gKGZsYWdzICYgSW5qZWN0RmxhZ3MuSG9zdCkgJiYgaG9zdFRFbGVtZW50Tm9kZSA9PT0gdE5vZGU7XG5cbiAgY29uc3QgaW5qZWN0YWJsZUlkeCA9IGxvY2F0ZURpcmVjdGl2ZU9yUHJvdmlkZXIoXG4gICAgICB0Tm9kZSwgY3VycmVudFRWaWV3LCB0b2tlbiwgY2FuQWNjZXNzVmlld1Byb3ZpZGVycywgaXNIb3N0U3BlY2lhbENhc2UpO1xuICBpZiAoaW5qZWN0YWJsZUlkeCAhPT0gbnVsbCkge1xuICAgIHJldHVybiBnZXROb2RlSW5qZWN0YWJsZShsVmlldywgY3VycmVudFRWaWV3LCBpbmplY3RhYmxlSWR4LCB0Tm9kZSBhcyBURWxlbWVudE5vZGUpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBOT1RfRk9VTkQ7XG4gIH1cbn1cblxuLyoqXG4gKiBTZWFyY2hlcyBmb3IgdGhlIGdpdmVuIHRva2VuIGFtb25nIHRoZSBub2RlJ3MgZGlyZWN0aXZlcyBhbmQgcHJvdmlkZXJzLlxuICpcbiAqIEBwYXJhbSB0Tm9kZSBUTm9kZSBvbiB3aGljaCBkaXJlY3RpdmVzIGFyZSBwcmVzZW50LlxuICogQHBhcmFtIHRWaWV3IFRoZSB0VmlldyB3ZSBhcmUgY3VycmVudGx5IHByb2Nlc3NpbmdcbiAqIEBwYXJhbSB0b2tlbiBQcm92aWRlciB0b2tlbiBvciB0eXBlIG9mIGEgZGlyZWN0aXZlIHRvIGxvb2sgZm9yLlxuICogQHBhcmFtIGNhbkFjY2Vzc1ZpZXdQcm92aWRlcnMgV2hldGhlciB2aWV3IHByb3ZpZGVycyBzaG91bGQgYmUgY29uc2lkZXJlZC5cbiAqIEBwYXJhbSBpc0hvc3RTcGVjaWFsQ2FzZSBXaGV0aGVyIHRoZSBob3N0IHNwZWNpYWwgY2FzZSBhcHBsaWVzLlxuICogQHJldHVybnMgSW5kZXggb2YgYSBmb3VuZCBkaXJlY3RpdmUgb3IgcHJvdmlkZXIsIG9yIG51bGwgd2hlbiBub25lIGZvdW5kLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbG9jYXRlRGlyZWN0aXZlT3JQcm92aWRlcjxUPihcbiAgICB0Tm9kZTogVE5vZGUsIHRWaWV3OiBUVmlldywgdG9rZW46IFR5cGU8VD58SW5qZWN0aW9uVG9rZW48VD4sIGNhbkFjY2Vzc1ZpZXdQcm92aWRlcnM6IGJvb2xlYW4sXG4gICAgaXNIb3N0U3BlY2lhbENhc2U6IGJvb2xlYW58bnVtYmVyKTogbnVtYmVyfG51bGwge1xuICBjb25zdCBub2RlUHJvdmlkZXJJbmRleGVzID0gdE5vZGUucHJvdmlkZXJJbmRleGVzO1xuICBjb25zdCB0SW5qZWN0YWJsZXMgPSB0Vmlldy5kYXRhO1xuXG4gIGNvbnN0IGluamVjdGFibGVzU3RhcnQgPSBub2RlUHJvdmlkZXJJbmRleGVzICYgVE5vZGVQcm92aWRlckluZGV4ZXMuUHJvdmlkZXJzU3RhcnRJbmRleE1hc2s7XG4gIGNvbnN0IGRpcmVjdGl2ZXNTdGFydCA9IHROb2RlLmRpcmVjdGl2ZVN0YXJ0O1xuICBjb25zdCBkaXJlY3RpdmVFbmQgPSB0Tm9kZS5kaXJlY3RpdmVFbmQ7XG4gIGNvbnN0IGNwdFZpZXdQcm92aWRlcnNDb3VudCA9XG4gICAgICBub2RlUHJvdmlkZXJJbmRleGVzID4+IFROb2RlUHJvdmlkZXJJbmRleGVzLkNwdFZpZXdQcm92aWRlcnNDb3VudFNoaWZ0O1xuICBjb25zdCBzdGFydGluZ0luZGV4ID1cbiAgICAgIGNhbkFjY2Vzc1ZpZXdQcm92aWRlcnMgPyBpbmplY3RhYmxlc1N0YXJ0IDogaW5qZWN0YWJsZXNTdGFydCArIGNwdFZpZXdQcm92aWRlcnNDb3VudDtcbiAgLy8gV2hlbiB0aGUgaG9zdCBzcGVjaWFsIGNhc2UgYXBwbGllcywgb25seSB0aGUgdmlld1Byb3ZpZGVycyBhbmQgdGhlIGNvbXBvbmVudCBhcmUgdmlzaWJsZVxuICBjb25zdCBlbmRJbmRleCA9IGlzSG9zdFNwZWNpYWxDYXNlID8gaW5qZWN0YWJsZXNTdGFydCArIGNwdFZpZXdQcm92aWRlcnNDb3VudCA6IGRpcmVjdGl2ZUVuZDtcbiAgZm9yIChsZXQgaSA9IHN0YXJ0aW5nSW5kZXg7IGkgPCBlbmRJbmRleDsgaSsrKSB7XG4gICAgY29uc3QgcHJvdmlkZXJUb2tlbk9yRGVmID0gdEluamVjdGFibGVzW2ldIGFzIEluamVjdGlvblRva2VuPGFueT58IFR5cGU8YW55PnwgRGlyZWN0aXZlRGVmPGFueT47XG4gICAgaWYgKGkgPCBkaXJlY3RpdmVzU3RhcnQgJiYgdG9rZW4gPT09IHByb3ZpZGVyVG9rZW5PckRlZiB8fFxuICAgICAgICBpID49IGRpcmVjdGl2ZXNTdGFydCAmJiAocHJvdmlkZXJUb2tlbk9yRGVmIGFzIERpcmVjdGl2ZURlZjxhbnk+KS50eXBlID09PSB0b2tlbikge1xuICAgICAgcmV0dXJuIGk7XG4gICAgfVxuICB9XG4gIGlmIChpc0hvc3RTcGVjaWFsQ2FzZSkge1xuICAgIGNvbnN0IGRpckRlZiA9IHRJbmplY3RhYmxlc1tkaXJlY3RpdmVzU3RhcnRdIGFzIERpcmVjdGl2ZURlZjxhbnk+O1xuICAgIGlmIChkaXJEZWYgJiYgaXNDb21wb25lbnREZWYoZGlyRGVmKSAmJiBkaXJEZWYudHlwZSA9PT0gdG9rZW4pIHtcbiAgICAgIHJldHVybiBkaXJlY3RpdmVzU3RhcnQ7XG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG4vKipcbiAqIFJldHJpZXZlIG9yIGluc3RhbnRpYXRlIHRoZSBpbmplY3RhYmxlIGZyb20gdGhlIGBMVmlld2AgYXQgcGFydGljdWxhciBgaW5kZXhgLlxuICpcbiAqIFRoaXMgZnVuY3Rpb24gY2hlY2tzIHRvIHNlZSBpZiB0aGUgdmFsdWUgaGFzIGFscmVhZHkgYmVlbiBpbnN0YW50aWF0ZWQgYW5kIGlmIHNvIHJldHVybnMgdGhlXG4gKiBjYWNoZWQgYGluamVjdGFibGVgLiBPdGhlcndpc2UgaWYgaXQgZGV0ZWN0cyB0aGF0IHRoZSB2YWx1ZSBpcyBzdGlsbCBhIGZhY3RvcnkgaXRcbiAqIGluc3RhbnRpYXRlcyB0aGUgYGluamVjdGFibGVgIGFuZCBjYWNoZXMgdGhlIHZhbHVlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Tm9kZUluamVjdGFibGUoXG4gICAgbFZpZXc6IExWaWV3LCB0VmlldzogVFZpZXcsIGluZGV4OiBudW1iZXIsIHROb2RlOiBURGlyZWN0aXZlSG9zdE5vZGUpOiBhbnkge1xuICBsZXQgdmFsdWUgPSBsVmlld1tpbmRleF07XG4gIGNvbnN0IHREYXRhID0gdFZpZXcuZGF0YTtcbiAgaWYgKGlzRmFjdG9yeSh2YWx1ZSkpIHtcbiAgICBjb25zdCBmYWN0b3J5OiBOb2RlSW5qZWN0b3JGYWN0b3J5ID0gdmFsdWU7XG4gICAgaWYgKGZhY3RvcnkucmVzb2x2aW5nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENpcmN1bGFyIGRlcCBmb3IgJHtzdHJpbmdpZnlGb3JFcnJvcih0RGF0YVtpbmRleF0pfWApO1xuICAgIH1cbiAgICBjb25zdCBwcmV2aW91c0luY2x1ZGVWaWV3UHJvdmlkZXJzID0gc2V0SW5jbHVkZVZpZXdQcm92aWRlcnMoZmFjdG9yeS5jYW5TZWVWaWV3UHJvdmlkZXJzKTtcbiAgICBmYWN0b3J5LnJlc29sdmluZyA9IHRydWU7XG4gICAgbGV0IHByZXZpb3VzSW5qZWN0SW1wbGVtZW50YXRpb247XG4gICAgaWYgKGZhY3RvcnkuaW5qZWN0SW1wbCkge1xuICAgICAgcHJldmlvdXNJbmplY3RJbXBsZW1lbnRhdGlvbiA9IHNldEluamVjdEltcGxlbWVudGF0aW9uKGZhY3RvcnkuaW5qZWN0SW1wbCk7XG4gICAgfVxuICAgIGVudGVyREkobFZpZXcsIHROb2RlKTtcbiAgICB0cnkge1xuICAgICAgdmFsdWUgPSBsVmlld1tpbmRleF0gPSBmYWN0b3J5LmZhY3RvcnkodW5kZWZpbmVkLCB0RGF0YSwgbFZpZXcsIHROb2RlKTtcbiAgICAgIC8vIFRoaXMgY29kZSBwYXRoIGlzIGhpdCBmb3IgYm90aCBkaXJlY3RpdmVzIGFuZCBwcm92aWRlcnMuXG4gICAgICAvLyBGb3IgcGVyZiByZWFzb25zLCB3ZSB3YW50IHRvIGF2b2lkIHNlYXJjaGluZyBmb3IgaG9va3Mgb24gcHJvdmlkZXJzLlxuICAgICAgLy8gSXQgZG9lcyBubyBoYXJtIHRvIHRyeSAodGhlIGhvb2tzIGp1c3Qgd29uJ3QgZXhpc3QpLCBidXQgdGhlIGV4dHJhXG4gICAgICAvLyBjaGVja3MgYXJlIHVubmVjZXNzYXJ5IGFuZCB0aGlzIGlzIGEgaG90IHBhdGguIFNvIHdlIGNoZWNrIHRvIHNlZVxuICAgICAgLy8gaWYgdGhlIGluZGV4IG9mIHRoZSBkZXBlbmRlbmN5IGlzIGluIHRoZSBkaXJlY3RpdmUgcmFuZ2UgZm9yIHRoaXNcbiAgICAgIC8vIHROb2RlLiBJZiBpdCdzIG5vdCwgd2Uga25vdyBpdCdzIGEgcHJvdmlkZXIgYW5kIHNraXAgaG9vayByZWdpc3RyYXRpb24uXG4gICAgICBpZiAodFZpZXcuZmlyc3RDcmVhdGVQYXNzICYmIGluZGV4ID49IHROb2RlLmRpcmVjdGl2ZVN0YXJ0KSB7XG4gICAgICAgIG5nRGV2TW9kZSAmJiBhc3NlcnREaXJlY3RpdmVEZWYodERhdGFbaW5kZXhdKTtcbiAgICAgICAgcmVnaXN0ZXJQcmVPcmRlckhvb2tzKGluZGV4LCB0RGF0YVtpbmRleF0gYXMgRGlyZWN0aXZlRGVmPGFueT4sIHRWaWV3KTtcbiAgICAgIH1cbiAgICB9IGZpbmFsbHkge1xuICAgICAgaWYgKGZhY3RvcnkuaW5qZWN0SW1wbCkgc2V0SW5qZWN0SW1wbGVtZW50YXRpb24ocHJldmlvdXNJbmplY3RJbXBsZW1lbnRhdGlvbik7XG4gICAgICBzZXRJbmNsdWRlVmlld1Byb3ZpZGVycyhwcmV2aW91c0luY2x1ZGVWaWV3UHJvdmlkZXJzKTtcbiAgICAgIGZhY3RvcnkucmVzb2x2aW5nID0gZmFsc2U7XG4gICAgICBsZWF2ZURJKCk7XG4gICAgfVxuICB9XG4gIHJldHVybiB2YWx1ZTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBiaXQgaW4gYW4gaW5qZWN0b3IncyBibG9vbSBmaWx0ZXIgdGhhdCBzaG91bGQgYmUgdXNlZCB0byBkZXRlcm1pbmUgd2hldGhlciBvciBub3RcbiAqIHRoZSBkaXJlY3RpdmUgbWlnaHQgYmUgcHJvdmlkZWQgYnkgdGhlIGluamVjdG9yLlxuICpcbiAqIFdoZW4gYSBkaXJlY3RpdmUgaXMgcHVibGljLCBpdCBpcyBhZGRlZCB0byB0aGUgYmxvb20gZmlsdGVyIGFuZCBnaXZlbiBhIHVuaXF1ZSBJRCB0aGF0IGNhbiBiZVxuICogcmV0cmlldmVkIG9uIHRoZSBUeXBlLiBXaGVuIHRoZSBkaXJlY3RpdmUgaXNuJ3QgcHVibGljIG9yIHRoZSB0b2tlbiBpcyBub3QgYSBkaXJlY3RpdmUgYG51bGxgXG4gKiBpcyByZXR1cm5lZCBhcyB0aGUgbm9kZSBpbmplY3RvciBjYW4gbm90IHBvc3NpYmx5IHByb3ZpZGUgdGhhdCB0b2tlbi5cbiAqXG4gKiBAcGFyYW0gdG9rZW4gdGhlIGluamVjdGlvbiB0b2tlblxuICogQHJldHVybnMgdGhlIG1hdGNoaW5nIGJpdCB0byBjaGVjayBpbiB0aGUgYmxvb20gZmlsdGVyIG9yIGBudWxsYCBpZiB0aGUgdG9rZW4gaXMgbm90IGtub3duLlxuICogICBXaGVuIHRoZSByZXR1cm5lZCB2YWx1ZSBpcyBuZWdhdGl2ZSB0aGVuIGl0IHJlcHJlc2VudHMgc3BlY2lhbCB2YWx1ZXMgc3VjaCBhcyBgSW5qZWN0b3JgLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYmxvb21IYXNoQml0T3JGYWN0b3J5KHRva2VuOiBUeXBlPGFueT58SW5qZWN0aW9uVG9rZW48YW55PnxzdHJpbmcpOiBudW1iZXJ8RnVuY3Rpb258XG4gICAgdW5kZWZpbmVkIHtcbiAgbmdEZXZNb2RlICYmIGFzc2VydERlZmluZWQodG9rZW4sICd0b2tlbiBtdXN0IGJlIGRlZmluZWQnKTtcbiAgaWYgKHR5cGVvZiB0b2tlbiA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdG9rZW4uY2hhckNvZGVBdCgwKSB8fCAwO1xuICB9XG4gIGNvbnN0IHRva2VuSWQ6IG51bWJlcnx1bmRlZmluZWQgPSAodG9rZW4gYXMgYW55KVtOR19FTEVNRU5UX0lEXTtcbiAgLy8gTmVnYXRpdmUgdG9rZW4gSURzIGFyZSB1c2VkIGZvciBzcGVjaWFsIG9iamVjdHMgc3VjaCBhcyBgSW5qZWN0b3JgXG4gIHJldHVybiAodHlwZW9mIHRva2VuSWQgPT09ICdudW1iZXInICYmIHRva2VuSWQgPiAwKSA/IHRva2VuSWQgJiBCTE9PTV9NQVNLIDogdG9rZW5JZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJsb29tSGFzVG9rZW4oYmxvb21IYXNoOiBudW1iZXIsIGluamVjdG9ySW5kZXg6IG51bWJlciwgaW5qZWN0b3JWaWV3OiBMVmlld3xURGF0YSkge1xuICAvLyBDcmVhdGUgYSBtYXNrIHRoYXQgdGFyZ2V0cyB0aGUgc3BlY2lmaWMgYml0IGFzc29jaWF0ZWQgd2l0aCB0aGUgZGlyZWN0aXZlIHdlJ3JlIGxvb2tpbmcgZm9yLlxuICAvLyBKUyBiaXQgb3BlcmF0aW9ucyBhcmUgMzIgYml0cywgc28gdGhpcyB3aWxsIGJlIGEgbnVtYmVyIGJldHdlZW4gMl4wIGFuZCAyXjMxLCBjb3JyZXNwb25kaW5nXG4gIC8vIHRvIGJpdCBwb3NpdGlvbnMgMCAtIDMxIGluIGEgMzIgYml0IGludGVnZXIuXG4gIGNvbnN0IG1hc2sgPSAxIDw8IGJsb29tSGFzaDtcbiAgY29uc3QgYjcgPSBibG9vbUhhc2ggJiAweDgwO1xuICBjb25zdCBiNiA9IGJsb29tSGFzaCAmIDB4NDA7XG4gIGNvbnN0IGI1ID0gYmxvb21IYXNoICYgMHgyMDtcblxuICAvLyBPdXIgYmxvb20gZmlsdGVyIHNpemUgaXMgMjU2IGJpdHMsIHdoaWNoIGlzIGVpZ2h0IDMyLWJpdCBibG9vbSBmaWx0ZXIgYnVja2V0czpcbiAgLy8gYmYwID0gWzAgLSAzMV0sIGJmMSA9IFszMiAtIDYzXSwgYmYyID0gWzY0IC0gOTVdLCBiZjMgPSBbOTYgLSAxMjddLCBldGMuXG4gIC8vIEdldCB0aGUgYmxvb20gZmlsdGVyIHZhbHVlIGZyb20gdGhlIGFwcHJvcHJpYXRlIGJ1Y2tldCBiYXNlZCBvbiB0aGUgZGlyZWN0aXZlJ3MgYmxvb21CaXQuXG4gIGxldCB2YWx1ZTogbnVtYmVyO1xuXG4gIGlmIChiNykge1xuICAgIHZhbHVlID0gYjYgPyAoYjUgPyBpbmplY3RvclZpZXdbaW5qZWN0b3JJbmRleCArIDddIDogaW5qZWN0b3JWaWV3W2luamVjdG9ySW5kZXggKyA2XSkgOlxuICAgICAgICAgICAgICAgICAoYjUgPyBpbmplY3RvclZpZXdbaW5qZWN0b3JJbmRleCArIDVdIDogaW5qZWN0b3JWaWV3W2luamVjdG9ySW5kZXggKyA0XSk7XG4gIH0gZWxzZSB7XG4gICAgdmFsdWUgPSBiNiA/IChiNSA/IGluamVjdG9yVmlld1tpbmplY3RvckluZGV4ICsgM10gOiBpbmplY3RvclZpZXdbaW5qZWN0b3JJbmRleCArIDJdKSA6XG4gICAgICAgICAgICAgICAgIChiNSA/IGluamVjdG9yVmlld1tpbmplY3RvckluZGV4ICsgMV0gOiBpbmplY3RvclZpZXdbaW5qZWN0b3JJbmRleF0pO1xuICB9XG5cbiAgLy8gSWYgdGhlIGJsb29tIGZpbHRlciB2YWx1ZSBoYXMgdGhlIGJpdCBjb3JyZXNwb25kaW5nIHRvIHRoZSBkaXJlY3RpdmUncyBibG9vbUJpdCBmbGlwcGVkIG9uLFxuICAvLyB0aGlzIGluamVjdG9yIGlzIGEgcG90ZW50aWFsIG1hdGNoLlxuICByZXR1cm4gISEodmFsdWUgJiBtYXNrKTtcbn1cblxuLyoqIFJldHVybnMgdHJ1ZSBpZiBmbGFncyBwcmV2ZW50IHBhcmVudCBpbmplY3RvciBmcm9tIGJlaW5nIHNlYXJjaGVkIGZvciB0b2tlbnMgKi9cbmZ1bmN0aW9uIHNob3VsZFNlYXJjaFBhcmVudChmbGFnczogSW5qZWN0RmxhZ3MsIGlzRmlyc3RIb3N0VE5vZGU6IGJvb2xlYW4pOiBib29sZWFufG51bWJlciB7XG4gIHJldHVybiAhKGZsYWdzICYgSW5qZWN0RmxhZ3MuU2VsZikgJiYgIShmbGFncyAmIEluamVjdEZsYWdzLkhvc3QgJiYgaXNGaXJzdEhvc3RUTm9kZSk7XG59XG5cbmV4cG9ydCBjbGFzcyBOb2RlSW5qZWN0b3IgaW1wbGVtZW50cyBJbmplY3RvciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBfdE5vZGU6IFRFbGVtZW50Tm9kZXxUQ29udGFpbmVyTm9kZXxURWxlbWVudENvbnRhaW5lck5vZGV8bnVsbCxcbiAgICAgIHByaXZhdGUgX2xWaWV3OiBMVmlldykge31cblxuICBnZXQodG9rZW46IGFueSwgbm90Rm91bmRWYWx1ZT86IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIGdldE9yQ3JlYXRlSW5qZWN0YWJsZSh0aGlzLl90Tm9kZSwgdGhpcy5fbFZpZXcsIHRva2VuLCB1bmRlZmluZWQsIG5vdEZvdW5kVmFsdWUpO1xuICB9XG59XG5cbi8qKlxuICogQGNvZGVHZW5BcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIMm1ybVnZXRGYWN0b3J5T2Y8VD4odHlwZTogVHlwZTxhbnk+KTogRmFjdG9yeUZuPFQ+fG51bGwge1xuICBjb25zdCB0eXBlQW55ID0gdHlwZSBhcyBhbnk7XG5cbiAgaWYgKGlzRm9yd2FyZFJlZih0eXBlKSkge1xuICAgIHJldHVybiAoKCkgPT4ge1xuICAgICAgICAgICAgIGNvbnN0IGZhY3RvcnkgPSDJtcm1Z2V0RmFjdG9yeU9mPFQ+KHJlc29sdmVGb3J3YXJkUmVmKHR5cGVBbnkpKTtcbiAgICAgICAgICAgICByZXR1cm4gZmFjdG9yeSA/IGZhY3RvcnkoKSA6IG51bGw7XG4gICAgICAgICAgIH0pIGFzIGFueTtcbiAgfVxuXG4gIGxldCBmYWN0b3J5ID0gZ2V0RmFjdG9yeURlZjxUPih0eXBlQW55KTtcbiAgaWYgKGZhY3RvcnkgPT09IG51bGwpIHtcbiAgICBjb25zdCBpbmplY3RvckRlZiA9IGdldEluamVjdG9yRGVmPFQ+KHR5cGVBbnkpO1xuICAgIGZhY3RvcnkgPSBpbmplY3RvckRlZiAmJiBpbmplY3RvckRlZi5mYWN0b3J5O1xuICB9XG4gIHJldHVybiBmYWN0b3J5IHx8IG51bGw7XG59XG5cbi8qKlxuICogQGNvZGVHZW5BcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIMm1ybVnZXRJbmhlcml0ZWRGYWN0b3J5PFQ+KHR5cGU6IFR5cGU8YW55Pik6ICh0eXBlOiBUeXBlPFQ+KSA9PiBUIHtcbiAgcmV0dXJuIG5vU2lkZUVmZmVjdHMoKCkgPT4ge1xuICAgIGNvbnN0IHByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHR5cGUucHJvdG90eXBlKS5jb25zdHJ1Y3RvciBhcyBUeXBlPGFueT47XG4gICAgY29uc3QgZmFjdG9yeSA9IChwcm90byBhcyBhbnkpW05HX0ZBQ1RPUllfREVGXSB8fCDJtcm1Z2V0RmFjdG9yeU9mPFQ+KHByb3RvKTtcbiAgICBpZiAoZmFjdG9yeSAhPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGZhY3Rvcnk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFRoZXJlIGlzIG5vIGZhY3RvcnkgZGVmaW5lZC4gRWl0aGVyIHRoaXMgd2FzIGltcHJvcGVyIHVzYWdlIG9mIGluaGVyaXRhbmNlXG4gICAgICAvLyAobm8gQW5ndWxhciBkZWNvcmF0b3Igb24gdGhlIHN1cGVyY2xhc3MpIG9yIHRoZXJlIGlzIG5vIGNvbnN0cnVjdG9yIGF0IGFsbFxuICAgICAgLy8gaW4gdGhlIGluaGVyaXRhbmNlIGNoYWluLiBTaW5jZSB0aGUgdHdvIGNhc2VzIGNhbm5vdCBiZSBkaXN0aW5ndWlzaGVkLCB0aGVcbiAgICAgIC8vIGxhdHRlciBoYXMgdG8gYmUgYXNzdW1lZC5cbiAgICAgIHJldHVybiAodCkgPT4gbmV3IHQoKTtcbiAgICB9XG4gIH0pO1xufVxuIl19