// kidif.js - store structured raw text in simple files
// v1.1.0
// https://github.com/oakmac/kidif.js
//
// Copyright (c) 2016, Chris Oakman
// Released under the ISC license
// https://github.com/oakmac/kidif.js/blob/master/LICENSE.md

// modules
const fs = require('fs');
const glob = require('glob');

// constants
const defaultDelimiter = '=====';
const fileEncoding = {encoding: 'utf8'};
const NEWLINE = '\n';

//------------------------------------------------------------------------------
// Util
//------------------------------------------------------------------------------

function isObject(x) {
  return Object.prototype.toString.call(x) === '[object Object]';
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
function trim(str) {
  return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
}

// http://stackoverflow.com/a/32604073/2137320
function toCamelCase(str) {
  return str.toLowerCase()
    .replace( /[-_]+/g, ' ')
    .replace( /[^\w\s]/g, '')
    .replace( / (.)/g, function($1) { return $1.toUpperCase(); })
    .replace( / /g, '' );
}

function isTitleLine(line, delim) {
  return line.substring(0, delim.length) === delim &&
         trim(line) !== delim; // title lines must contain some text other than
                               // the delimiter
}

function trimSections(result) {
  for (var i in result) {
    if (! result.hasOwnProperty(i)) continue;

    if (typeof result[i] === 'string') {
      result[i] = trim(result[i]);
    }
    else {
      for (var j = 0; j < result[i].length; j++) {
        result[i][j] = trim(result[i][j]);
      }
    }
  }

  return result;
}

function ensureOptions(options) {
  // make sure options is an object
  if (! isObject(options)) {
    options = {};
  }

  // delimiter must be a string and cannot be the empty string
  if (typeof options.delimiter !== 'string' || options.delimiter === '') {
    options.delimiter = defaultDelimiter;
  }

  // camelCase titles
  if (options.camelCaseTitles !== false) {
    options.camelCaseTitles = true;
  }

  // trim sections
  if (options.trimSections !== false) {
    options.trimSections = true;
  }

  return options;
}

//------------------------------------------------------------------------------
// Parsing Functions
//------------------------------------------------------------------------------

function parseFile(file, options) {
  const fileContents = fs.readFileSync(file, fileEncoding);
  const lines = fileContents.split(NEWLINE);

  var result = {};
  var currentTitle = false;
  var line = '';

  for (var i = 0; i < lines.length; i++) {
    line = lines[i];

    // is this a title line?
    if (isTitleLine(line, options.delimiter)) {
      // remove the delimiter and trim the line
      currentTitle = trim(line.substring(options.delimiter.length));

      // optionally convert to camelCase
      if (options.camelCaseTitles) {
        currentTitle = toCamelCase(currentTitle);
      }

      // When we encounter a new section title, there are three options:
      // 1) section does not exist, start a new one
      if (! result.hasOwnProperty(currentTitle)) {
        result[currentTitle] = '';
      }
      // 2) section already exists and is a string, convert it into an array
      else if (typeof result[currentTitle] === 'string') {
        result[currentTitle] = [result[currentTitle], ''];
      }
      // 3) section is already an array, add a new element
      else {
        result[currentTitle].push('');
      }

      // go to the next line
      continue;
    }

    // drop this line if we have not found the first title yet
    if (currentTitle === false) {
      continue;
    }

    // append this line to the current section
    if (typeof result[currentTitle] === 'string') {
      result[currentTitle] += line + NEWLINE;
    }
    else {
      result[currentTitle][result[currentTitle].length - 1] += line + NEWLINE;
    }
  }

  // optionally trim the sections
  if (options.trimSections) {
    result = trimSections(result);
  }

  return result;
}

function parseFiles(pattern, options) {
  // make sure the options are formatted correctly
  options = ensureOptions(options);

  // glob for the files they want
  const files = glob.sync(pattern);

  // process all the files
  var result = [];
  for (var i = 0; i < files.length; i++) {
    result.push(parseFile(files[i], options));
  }

  return result;
}

//------------------------------------------------------------------------------
// Module Export
//------------------------------------------------------------------------------

module.exports = parseFiles;
