var omitSpecialCharacters = [
    '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', 
    '_', '=', '+', ',', '.', '<', '>', '/', '\\',
    '?', '[', ']', '{', '}', '|', '`', '~', '"',
    ';', ':'
];

function StringToWordTokens(string, omit) {
    if (!string || string.length === 0) return [];

    if (omit) {
        omit.forEach(function(element) {
            string = string.replace(element, ' ');
        });
    }
    return string.match(/(\S+)/g);
}

module.exports = {
    StringToWordTokens: StringToWordTokens,
    omitSpecialCharacters: omitSpecialCharacters
}