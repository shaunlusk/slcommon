import { StringToWordTokens, omitSpecialCharacters } from '../src/StringToWordTokens';

describe("StringToWordTokens", function() {
    it("omit default special characters", function(done) {
        const string = "~`just! @some# $special% ^ characters& *salt( )and_ =peppering + {a} [set] ;of: \"words< >in, .a/ ?string| \\";
        const expected = ['just', 'some', 'special', 'characters', 'salt', 'and', 'peppering', 'a', 'set', 'of', 'words', 'in', 'a', 'string'];

        const actual = StringToWordTokens(string, omitSpecialCharacters);

        validate(actual, expected);
        done();
    });
    it("omit custom regex patterns", function(done) {
        const string = "find something like this or that";
        const omit = [/this/, /that/];
        const expected = ['find', 'something', 'like', 'or'];
        
        const actual = StringToWordTokens(string, omit);

        validate(actual, expected);
        done();
    });
    it("omit nothing", function(done) {
        const string = "This? ^returns token's, with special characters!";
        const expected = ['This?', '^returns', 'token\'s,', 'with', 'special', 'characters!'];
        
        const actual = StringToWordTokens(string);

        validate(actual, expected);
        done();
    });
    it("empty string", function(done) {
        const string = "";
        
        const actual = StringToWordTokens(string);

        expect(actual).toBeTruthy();
        expect(actual.length).toBe(0);
        done();
    });
    it("null", function(done) {
        let string;
        
        const actual = StringToWordTokens(string);

        expect(actual).toBeTruthy();
        expect(actual.length).toBe(0);
        done();
    });
    it("escaped quotes", function(done) {
        const string = "\"der\"";
        const expected  = ['der'];
        const actual = StringToWordTokens(string, omitSpecialCharacters);

        validate(actual, expected);
        done();
    });
});

function validate(actual: RegExpMatchArray , expected: string[]) {
    for (let i = 0; i < expected.length; i++) {
        expect(expected[i]).toBe(actual[i]);
    }
}
