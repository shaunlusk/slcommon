var omitSpecialCharacters = require("../src/StringToWordTokens").omitSpecialCharacters;
var StringToWordTokens = require("../src/StringToWordTokens").StringToWordTokens;
var assert = require("./testUtil").assert;

describe("StringToWordTokens", function() {
    it("omit default special characters", function(done) {
        var string = "~`just! @some# $special% ^ characters& *salt( )and_ =peppering + {a} [set] ;of: \"words< >in, .a/ ?string| \\";
        var expected = ['just', 'some', 'special', 'characters', 'salt', 'and', 'peppering', 'a', 'set', 'of', 'words', 'in', 'a', 'string'];

        var actual = StringToWordTokens(string, omitSpecialCharacters);

        validate(actual, expected);
        done();
    });
    it("omit custom regex patterns", function(done) {
        var string = "find something like this or that";
        var omit = [/this/, /that/];
        var expected = ['find', 'something', 'like', 'or'];
        
        var actual = StringToWordTokens(string, omit);

        validate(actual, expected);
        done();
    });
    it("omit nothing", function(done) {
        var string = "This? ^returns token's, with special characters!";
        var expected = ['This?', '^returns', 'token\'s,', 'with', 'special', 'characters!'];
        
        var actual = StringToWordTokens(string);

        validate(actual, expected);
        done();
    });
    it("empty string", function(done) {
        var string = "";
        
        var actual = StringToWordTokens(string);

        assert(actual !== null);
        assert(actual.length === 0);
        done();
    });
    it("null", function(done) {
        var string = null;
        
        var actual = StringToWordTokens(string);

        assert(actual !== null);
        assert(actual.length === 0);
        done();
    });
    it("escaped quotes", function(done) {
        var string = "\"der\"";
        var expected  = ['der'];
        var actual = StringToWordTokens(string, omitSpecialCharacters);

        validate(actual, expected);
        done();
    });
});

function validate(actual, expected) {
    for (var i = 0; i < expected.length; i++) {
        assert(expected[i] === actual[i], "tokens did not match (expected " + expected[i] + '; actual ' + actual[i] + ')');
    }
}
