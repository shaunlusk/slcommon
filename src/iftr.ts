import { readFileSync, writeFileSync } from 'fs';

const usage = `IFTR
Insert Files in a Template using Regex Replacement.
Replaces a symbols in a file with the entire contents of other files. 
Usage:
node path/to/iftr <inputFile> <outputFile> <replacementMap>

replacementMap format:
{
  "regexKey1": "sourceFilePath1",
  "regexKey2": "sourceFilePath2"
}
e.g.:
{
  "{{tutorial}}": "./src/Tutorial.ts",
  "/(li|u)nix/": "./src/someFile.txt"
}
`;

if (process.argv.length < 4 || process.argv[2] === '-h') {
  console.log(usage);
  process.exit();
}
const inputFilePath = process.argv[2];
const outputFilePath = process.argv[3];
const replaceConfigPath = process.argv[4];

const replaceConfig = JSON.parse(readFileSync(replaceConfigPath).toString()) as {[key: string]: string};
let text = readFileSync(inputFilePath).toString();

for (const key in replaceConfig) {
  const reg = new RegExp(key, "g");
  const replacementText = readFileSync(replaceConfig[key]).toString();
  text = text.replace(reg, replacementText);
}

writeFileSync(outputFilePath, text);
