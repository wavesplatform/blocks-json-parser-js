const jsonAstParseTransform = require('./jsonAstParseTransform');
const blockAstTransform = require('./blockAstTransform');

// type factories
const sanitizeAssetId = require('./sanitizeAssetId');

module.exports = (
  blockRaw,
  { long = x => parseInt(x), assetId = sanitizeAssetId } = {}
) => jsonAstParseTransform(blockRaw, blockAstTransform({ long, assetId }));
