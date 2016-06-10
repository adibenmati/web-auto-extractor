# Web Auto Extractor
[![Build Status](https://travis-ci.org/ind9/web-auto-extractor.svg?branch=master)](https://travis-ci.org/ind9/web-auto-extractor)

Automatically extracts semantically structured information from any HTML webpage.

Supported formats:-
- Formats that support Schema.org vocabularies:-
  - Microdata
  - RDFa-lite
  - JSON-LD
  - meta tags

**[Demo](https://tonicdev.com/npm/web-auto-extractor)** it on tonicdev

## Introduction
Parse any sematically structured HTML
```js
import WAE from 'web-auto-extractor'
import request from 'request'

const pageUrl = 'http://southernafricatravel.com/'

request(pageUrl, function (error, response, html) {
  const wae = WAE.init(html)
  wae.parse()
}
```

#### CommonJS import style
```js
var WAE = require('web-auto-extractor').default
```

## Installation
`npm install web-auto-extractor`

## API

### Initializing
You would first need to load in the HTML to get a WAEObject

```js
const wae = WAE.init('<div itemtype="Product">...</div>')
```
Each WAEObject comes with the following set of methods

### WAEObject Methods

#### .parse()
Finds all supported semantically structured information on the HTML in normalized format.

#### .parseMicrodata()
Finds all Microdata information on the page and returns it as a [WAEParserObject](#waeparserobject-attributes).

#### .parseRdfa()
Finds all RDFa-Lite information on the page and returns it as a [WAEParserObject](#waeparserobject-attributes).

#### .parseJsonld()
Finds all JSON-LD information on the page and returns it as a [WAEParserObject](#waeparserobject-attributes).

#### .parseMetaTags()
Finds all meta tags information on the page and returns it as a [WAEParserObject](#waeparserobject-attributes).

### WAEParserObject Attributes
*NOTE: The result of these functions are **cached**, so multiple calls to them shouldn't affect performance.*

#### .data()
Gets the normalized result of the parsed format.

#### .unnormalizedData()
Gets the unnormalized flattened result of the parsed format which includes meta information relating to the parsed properties.

#### .find(propName)
Returns a list of elements from `.data()` that corresponds to the property with the name `propName`

[See test cases](https://github.com/ind9/web-auto-extractor/blob/master/test/test.js) for more examples.
