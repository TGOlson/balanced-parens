var R = require('ramda');
var P = require('parsimmon');


var PAREN_PAIR   = ['(', ')'];
var BRACKET_PAIR = ['[', ']'];
var BRACE_PAIR   = ['{', '}'];


var TOKENS_TO_IGNORE = [':', ';', '=', '.'];


var ignoredTokenParser = P.alt.apply(P, R.map(P.string, TOKENS_TO_IGNORE));
var ignore = P.whitespace.or(P.letter).or(P.digit).or(ignoredTokenParser);


var hasBalancedPairs = R.curry(function(pairs, text) {
  var expr = P.lazy(function() {
    return P.alt.apply(P, parsers).or(ignore).many();
  });

  var parsers = R.map(betweenPair(expr), pairs);

  return expr.parse(text).status;
});

var betweenPair = R.curry(function(expr, pair) {
  var head = R.head(pair);
  var last = R.last(pair);

  return P.seq(P.string(head), expr, P.string(last));
});


var hasBalancedParens  = hasBalancedPairs([PAREN_PAIR]);
var hasBalancedSymbols = hasBalancedPairs([PAREN_PAIR, BRACKET_PAIR, BRACE_PAIR]);


module.exports = {
  hasBalancedParens  : hasBalancedParens,
  hasBalancedSymbols : hasBalancedSymbols
};
