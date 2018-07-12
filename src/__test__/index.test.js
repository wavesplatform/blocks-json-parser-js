const readJsonSync = require('./readJsonSync');
const blockRaw = readJsonSync('block.json');

const parse = require('../');

class MockLong {
  constructor(string) {
    this._raw = string;
    this.value = parseInt(string);
  }
}

describe('Block parsing', () => {
  it('returns a correct block with Longs and sanitized AssetIds', () =>
    expect(parse(blockRaw, { long: x => new MockLong(x) })).toMatchSnapshot());
});
