import {
  chain,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import {
  NodePackageInstallTask,
  RunSchematicTask,
} from '@angular-devkit/schematics/tasks';
import {
  addPackageJsonDependency,
  NodeDependency,
  NodeDependencyType,
} from '@schematics/angular/utility/dependencies';
import { of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { getNPMPackage, NpmRegistryPackage } from '../util/npmjs';
import { Schema } from './schema';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export default function (options: Schema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return chain([
      addPackageJsonDependencies(options),
      installDependencies(),
      setupProject(options),
    ])(tree, context);
  };
}

function addPackageJsonDependencies(options: Schema): Rule {
  return (tree: Tree, _: SchematicContext): any => {
    return of(
      { name: 'agora-rtc-sdk', version: options.version },
      { name: 'ngx-agora', version: undefined }
    ).pipe(
      mergeMap((pkg) => getNPMPackage(pkg as NpmRegistryPackage)),
      map((npmRegistryPackage: NpmRegistryPackage) => {
        const nodeDependency: NodeDependency = {
          type: NodeDependencyType.Default,
          name: npmRegistryPackage.name,
          version: npmRegistryPackage.version,
          overwrite: false,
        };
        addPackageJsonDependency(tree, nodeDependency);
        return tree;
      })
    );
  };
}

function installDependencies(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.addTask(new NodePackageInstallTask());
    return tree;
  };
}

function setupProject(options: Schema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const installTaskId = context.addTask(new NodePackageInstallTask());
    context.addTask(new RunSchematicTask('ng-add-setup-project', options), [
      installTaskId,
    ]);
    return tree;
  };
}
