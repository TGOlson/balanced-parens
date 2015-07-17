var SyntaxParser = require('../src/syntax-parser');

describe('SyntaxParser', function() {
  describe('hasBalancedParens', function() {
    it('should be satisfied is the parenthesis are balanced', function() {
      expect(SyntaxParser.hasBalancedParens('(')).toBe(false);
      expect(SyntaxParser.hasBalancedParens(')')).toBe(false);
      expect(SyntaxParser.hasBalancedParens('()')).toBe(true);
      expect(SyntaxParser.hasBalancedParens(')(')).toBe(false);
      expect(SyntaxParser.hasBalancedParens('(())')).toBe(true);
    });
  });

  describe('hasBalancedSymbols', function() {
    it('should be satisfied if the sybmols are balanced', function() {
      expect(SyntaxParser.hasBalancedSymbols('[](){}')).toBe(true);
      expect(SyntaxParser.hasBalancedSymbols('[({})]')).toBe(true);
      expect(SyntaxParser.hasBalancedSymbols('[(]{)}')).toBe(false);
    });

    it('should ignore non-parenthesis characters', function() {
      var balancedCode   = 'var wow = { yo: thisIsAwesome() }';
      var unbalancedCode = 'var hubble = function() { telescopes.awesome();';

      expect(SyntaxParser.hasBalancedSymbols(balancedCode)).toBe(true);
      expect(SyntaxParser.hasBalancedSymbols(unbalancedCode)).toBe(false);
    });
  });
});
