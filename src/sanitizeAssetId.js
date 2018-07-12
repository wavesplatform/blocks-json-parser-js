const sanitizeAssetId = assetId =>
  assetId === null ||
  assetId === 'null' ||
  assetId === 'Waves' ||
  assetId === 'waves'
    ? 'WAVES'
    : assetId;

module.exports = sanitizeAssetId;
