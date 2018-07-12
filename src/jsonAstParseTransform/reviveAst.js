const reviveAst = node => {
  switch (node.type) {
    case 'Object':
      let obj = {};
      node.children.forEach(prop => {
        obj[prop.key.value] = reviveAst(prop.value);
      });
      return obj;
    case 'Array':
      let arr = [];
      node.children.forEach(val => {
        arr.push(reviveAst(val));
      });
      return arr;
    case 'Literal':
      return node.value;
    default:
      throw new Error('Unexpected node type received.');
  }
};

module.exports = reviveAst;
