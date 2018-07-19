# @waves/blocks-json-parser

A package that parses blocks from Waves Node API into JS objects of the same shape, with the ability to preserve Long values and sanitizing asset names.

## API

```js
parse(blockText, [ options ]);
```

- `blockText` raw JSON string from API
- `options`
  - `long`: a factory creating Long values from string. For example, `long.js` or `bignumber.js` can be used.
  - `assetId`: a transform for fields containing asset IDs. By default, changes `null` values from API to `WAVES`.


## Usage

```js
const parseBlock = require('@waves/blocks-json-parser');
const Long = require('long');

parse(blocksText, { long: x => Long.fromString(x) });
```
