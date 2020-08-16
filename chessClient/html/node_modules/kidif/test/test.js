const assert = require('assert');
const kidif = require('../kidif.js');

//------------------------------------------------------------------------------
// Test 1 - Defaults
//------------------------------------------------------------------------------

const test1a = {
  alphaBravo: 'charlie delta\necho foxtrot'
};

const test1b = {
  alphaBravo: 'one two\n   three four\n\n=====\nx',
  sierraTango: 'VICTOR WHISKEY'
};

const test1c = {
  alphaBravo: [
    'one two\n   three four',
    'fizzle'
  ],
  sierraTango: [
    'VICTOR WHISKEY',
    'MIKE   \nNOVEMBER'
  ],
  charlieDelta: 'Echo Golf'
};

const test1d = {
  "description": "The Foo widget has `onChange` and `onDestroy` events you can hook into for\ncustom functionality.",
  "html": '<div id="fooContainer"></div>',
  "css": "#fooContainer {\n  background: #eee;\n  height: 400px;\n  width: 600px;\n}",
  "javascript": "function onChangeMyFoo(oldState, newState) {\n  // potentially modify the new state here...\n  return newState;\n}\n\n" +
                "function onDestroyMyFoo(containerEl) {\n  // execute any necessary cleanup code here\n}\n\n" +
                "var myFoo = Foo('fooContainer', {\n  allowFlip: true,\n  onChange: onChangeMyFoo,\n  onDestroy: onDestroyMyFoo\n});\n\n" +
                "myFoo.init();"
};

const test1Expected = [test1a, test1b, test1c, test1d];
const test1Input = kidif('test/tests1/*.test');

//------------------------------------------------------------------------------
// Test 2 - Custom Delimiter
//------------------------------------------------------------------------------

const test2a = {
  alphaBravo: 'charlie delta\necho foxtrot'
};

const test2b = {
  alphaBravo: 'one two\n   three four',
  sierraTango: 'VICTOR WHISKEY'
};

const test2Expected = [test2a, test2b];
const test2Input = kidif('test/tests2/*.test', {delimiter: '~~~~'});

//------------------------------------------------------------------------------
// Test 3 - Camel Case Conversion
//------------------------------------------------------------------------------

const test3a = {
  'Alpha Bravo': 'charlie delta\necho foxtrot'
};

const test3b = {
  'Alpha Bravo': 'one two\n   three four',
  'Sierra Tango': 'VICTOR WHISKEY'
};

const test3Expected = [test3a, test3b];
const test3Input = kidif('test/tests3/*.test', {camelCaseTitles: false});

//------------------------------------------------------------------------------
// Test 4 - Trimming whitespace
//------------------------------------------------------------------------------

const test4a = {
  alphaBravo: '\ncharlie delta\necho foxtrot\n\n'
};

const test4b = {
  alphaBravo: '\none two\n   three four\n\n\n\n\n\n\n',
  sierraTango: '\nVICTOR WHISKEY\n\n'
};

const test4Expected = [test4a, test4b];
const test4Input = kidif('test/tests4/*.test', {trimSections: false});

//------------------------------------------------------------------------------
// Test 5 - All options at once
//------------------------------------------------------------------------------

const test5a = {
  'Foo Bar': '\n\n\nx\n',
  'Fizzle': 'a\n\nb\n\n'
};

const test5Expected = [test5a];
const test5Input = kidif('test/tests5/*.test', {
  camelCaseTitles: false,
  delimiter: '~~~',
  trimSections: false
});

//------------------------------------------------------------------------------
// Run the tests
//------------------------------------------------------------------------------

function testParsing() {
  it('defaults', function() {
    assert.deepEqual(test1Expected, test1Input);
  });

  it('custom delimiter', function() {
    assert.deepEqual(test2Expected, test2Input);
  });

  it('camelCase conversion', function() {
    assert.deepEqual(test3Expected, test3Input);
  });

  it('trim section whitespace', function() {
    assert.deepEqual(test4Expected, test4Input);
  });

  it('all options at once', function() {
    assert.deepEqual(test5Expected, test5Input);
  });
}

describe('kidif parsing', testParsing);
