export const omitSpecialCharacters = [
    '\\!', '@', '#', '\\$', '%', '\\^', '&', '\\*', '\\(', '\\)', 
    '_', '=', '\\+', ',', '\\.', '<', '>', '/', '\\\\',
    '\\?', '\\[', '\\]', '\\{', '\\}', '\\|', '`', '\\~', '"',
    ';', ':'
];

export function StringToWordTokens(string: string, omit?: string[]): RegExpMatchArray ;
export function StringToWordTokens(string: string, omit?: RegExp[]): RegExpMatchArray ;
export function StringToWordTokens(string: string, omit?: RegExp[] | string[]): RegExpMatchArray  {
    if (!string || string.length === 0) return [];

    if (omit) {
        omit.forEach(function(element) {
            string = string.replace(new RegExp(element, 'g'), ' ');
        });
    }
    return string.match(/(\S+)/g);
}

