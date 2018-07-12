const jsonToAst = require('json-to-ast');
const reviveAst = require('./reviveAst');

module.exports = (raw, transformAst = x => x) =>
  reviveAst(transformAst(jsonToAst(raw)));
