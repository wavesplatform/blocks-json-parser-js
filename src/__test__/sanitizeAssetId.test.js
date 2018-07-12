const sanitizeAssetId = require('../sanitizeAssetId');

describe('sanitizeAssetId', () => {
  it('returns WAVES for nulls', () =>
    expect(sanitizeAssetId(null)).toEqual('WAVES'));

  it('returns WAVES for string `null`', () =>
    expect(sanitizeAssetId('null')).toEqual('WAVES'));

  it('returns WAVES for `waves`', () =>
    expect(sanitizeAssetId('waves')).toEqual('WAVES'));

  it('returns WAVES for `Waves`', () =>
    expect(sanitizeAssetId('Waves')).toEqual('WAVES'));

  it('does not change any other values', () => {
    expect(sanitizeAssetId(1)).toEqual(1);
    expect(sanitizeAssetId('rand string')).toEqual('rand string');
    expect(sanitizeAssetId({ q: 1 })).toEqual({ q: 1 });
    expect(sanitizeAssetId(undefined)).toEqual(undefined);
  });
});
