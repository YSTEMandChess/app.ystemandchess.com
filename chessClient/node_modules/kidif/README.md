# kidif.js [![Build Status](https://travis-ci.org/oakmac/kidif.js.svg?branch=master)](https://travis-ci.org/oakmac/kidif.js)

> **K**idif **I**s **D**ata **I**n **F**iles

Kidif files are a simple way to store structured data when you need raw strings.

## Rationale

Most data formats (JSON, EDN, YAML, etc) have special escape rules for strings,
making them difficult to write and edit when you care about raw, unescaped text.

Kidif files are well-suited to things like examples or test cases where you want
to use existing text-management tools (git, file system, etc), but store raw
text in a structured way.

Kidif files are designed to be **simple**. The idea is simple, the format is
simple, and the parser is simple.

Kidif files are **not** a good data exchange format; please extract the data
from your kidif files and then transfer it over the wire using something
appropriate for your application.

Kidif files were inspired by how [chessboard.js stores examples](https://github.com/oakmac/chessboardjs/tree/master/examples).

## File Format

Kidif files consist of only three things: **comments**, **titles**, and **sections**

A basic example:

```
===== Foo

bar

===== Another Section

Hello world!

```

When parsed by kidif, this file will produce the following JavaScript Object
(show here as JSON):

```json
{
  "foo": "bar",
  "anotherSection": "Hello world!"
}
```

Notice that by default, the section titles are converted to camelCase and the
section text is trimmed of whitespace.

A file with repeat titles will convert each section into an array of strings.

```
NOTE: any text above the first title line is treated as a comment and ignored

===== Activity

Plan the hackathon

===== People

Charles

===== People

Lucy

```

Produces the following:

```json
{
  "activity": "Plan the hackathon",
  "people": [
    "Charles",
    "Lucy"
  ]
}
```

The delimiter for title lines must start on the first character of the line and
the line must contain some text in addition to the delimiter string. In other
words, you cannot have an empty title.

Here is a more realistic example of what you might store in a kidif file:

```
This example should demonstrate the onChange and onDestroy events.

===== Description

The Foo widget has `onChange` and `onDestroy` events you can hook into for
custom functionality.

===== HTML

<div id="fooContainer"></div>

===== CSS

#fooContainer {
  background: #eee;
  height: 400px;
  width: 600px;
}

===== JavaScript

function onChangeMyFoo(oldState, newState) {
  // potentially modify the new state here...
  return newState;
}

function onDestroyMyFoo(containerEl) {
  // execute any necessary cleanup code here
}

var myFoo = Foo('fooContainer', {
  allowFlip: true,
  onChange: onChangeMyFoo,
  onDestroy: onDestroyMyFoo
});

myFoo.init();
```

Will produce the following JSON that can be used to build an example HTML page
from a template:

```json
{
  "css": "#fooContainer {\n  background: #eee;\n  height: 400px;\n  width: 600px;\n}",
  "description": "The Foo widget has `onChange` and `onDestroy` events you can hook into for\ncustom functionality.",
  "html": "<div id=\"fooContainer\"></div>",
  "javascript": "function onChangeMyFoo(oldState, newState) {\n  // potentially modify the new state here...\n  return newState;\n}\n\nfunction onDestroyMyFoo(containerEl) {\n  // execute any necessary cleanup code here\n}\n\nvar myFoo = Foo('fooContainer', {\n  allowFlip: true,\n  onChange: onChangeMyFoo,\n  onDestroy: onDestroyMyFoo\n});\n\nmyFoo.init();"
}
```

## Usage

The kidif module exports a single function:

```js
var kidif = require('kidif');

// the first argument to kidif() should be a glob string; it is passed
// directly to the node-glob library: https://github.com/isaacs/node-glob
var myExamples = kidif('examples/*.example');

// prints an array of your examples
console.log(myExamples);
```

You can optionally pass a JavaScript Object as a second argument with the
following properties:

* `camelCaseTitles`: boolean, default is `true`, will convert titles to camelCase strings
* `delimiter`: string, default is `'====='`, the string to use as a title line delimiter
* `trimSections`: boolean, default is `true`, will trim all the whitespace in sections

An example file:

```
~~~ Foo Bar



x
~~~ Fizzle
a

b

```

JavaScript:

```js
var examples2 = kidif('examples2/*.example', {
  camelCaseTitles: false,
  delimiter: '~~~',
  trimSections: false
});
```

Will produce the following:

```json
{
  "Foo Bar": "\n\n\nx\n",
  "Fizzle": "a\n\nb\n\n"
}
```

## FAQ

#### Do kidif files have a character escape sequence?

No. Any line of text that is not a comment or a title line will be treated
exactly as it is.

#### What should I use as a file extension?

Use a file extension that is appropriate for the content in the file. For
example, `.example` or `.test`.

#### What if I need more structure than a kidif file supports?

Then you probably shouldn't be using kidif files ;)

Serious answer: kidif files are _intentionally_ simple and limited in what they
support. They are not the solution for every use case.

#### Can I have comments in a kidif file?

Yes. Anything above the first title line will be ignored.

#### Does kidif execute asynchronously?

No. Everything in kidif happens synchronously. Kidif is designed to be used by
things like build and test scripts where simplicity trumps speed.

## Development Setup

```sh
# install node_modules
npm install

# run the tests
npm test
```

## License

[ISC License](LICENSE.md)
