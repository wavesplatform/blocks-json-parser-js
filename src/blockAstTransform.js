const last = arr => {
  if (!arr.length) return undefined;
  else return arr[arr.length - 1];
};

// @impure, mutates ast in place
const blockAstTransform = typeFactories => node => {
  const { long, assetId } = typeFactories;
  const LONG_FIELDS = [
    // block-specific
    'blocksize',
    'base-target',

    // time
    'timestamp',
    'expiration',

    // MONETARY VALUES
    // amounts
    'amount',
    'totalAmount', // tx 11
    'quantity',
    'fee',
    'matcherFee',
    'buyMatcherFee',
    'sellMatcherFee',
    // prices
    'price',
  ];
  const ASSET_ID_FIELDS = [
    'assetId',
    'feeAsset',
    'feeAssetId',
    'amountAsset',
    'priceAsset',
  ];

  const loop = (node, currentPath) => {
    switch (node.type) {
      case 'Array':
        node.children = node.children.map((x, i) =>
          loop(x, currentPath.concat([i]))
        );
        break;
      case 'Object':
        node.children = node.children.map(x => loop(x, currentPath));
        break;
      case 'Property':
        node.value = loop(node.value, currentPath.concat([node.key.value]));
        break;
      case 'Literal':
        const shouldBeLong = (p, v) => {
          if (LONG_FIELDS.includes(last(p))) return true;
          // test for data transaction `integer` type
          if (
            p[p.length - 3] === 'data' &&
            last(p) === 'value' &&
            typeof v === 'number'
          )
            return true;
        };
        const shouldBeAssetId = p => ASSET_ID_FIELDS.includes(last(p));

        // change value if needed
        if (shouldBeLong(currentPath, node.value)) node.value = long(node.raw);
        if (shouldBeAssetId(currentPath)) node.value = assetId(node.value);
        break;
    }
    return node;
  };

  return loop(node, []);
};

module.exports = blockAstTransform;
