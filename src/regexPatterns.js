// const variableDeclarationPattern = /(let|var|const)\s{1,}[a-zA-Z]+\s{1,}=\s{1,}((\d)+|("\w*")|({(\s*[a-zA-Z]+\s*:\s*("\w*"|\d+)\s*,?)*})|(\[(\s*[0-9])))/g;
// const variableDeclarationPattern = /let\s{1,}[a-zA-Z]+\s{1,}=\s{1,}((\d)+|("\w*")|({(\s*[a-zA-Z]+\s*:\s*("\w*"|\d+)\s*,?)*}))/g;

// const combineRegexes = (regexes, joiner='', tags=['', '']) => {
//     console.log(regexes, tags)
//     return new RegExp( regexes.map(regex => tags[0] + regex.source + tags[1]).join(joiner), 'g');
// }

const combineRegexes = (...regexes) => new RegExp( regexes.map(regex => regex.source ).join(''), 'g');

let variableDeclarationPattern;

const variableDeclarators = /(let|var|const)\s+/;
const validVariableName = /[a-zA-Z_\$]([0-9a-zA-Z_\$]?)*/;
const variableAssigment = /\s*=\s*/;

const variableLeftPart = combineRegexes(variableDeclarators, validVariableName, variableAssigment);

// const stringValues = /("|'|`)((?:\\\1|(?:(?!\1).))*)\1/
// const booleanValue = /(true|false)/;
// const arrayValue = combineRegexes([/\[/, , /\]/]);

// const stringValues = /("|'|`).*("|'|`)/
const stringValues = /("|'|`).*("|'|`)/
// const numberValues = /[0-9]+(.[0-9]+)?/;
const numberValues = /\d+(.\d+)/;
// const arrayValues = /\[(\s*\S*\s*,\s*\S*)*\]/;
// const arrayValues = /\[(\s*\S+\s*,((\s*\S*)|(\s*\{\s*\S*\s*:\s*\S*\s*\}\s*)*)*)*/;
const arrayValues = /\[(\s*\S*\s*,\s*(\S*|(\{(\s*\S+\s*:\s*[\S^{}]+\s*,?\s*)*\})))*\]/;
const objectValues = /\{(\s*\S+\s*:\s*.+\s*,?\s*)*\}/;

const arrayVariables = combineRegexes(variableLeftPart, arrayValues);
const objectVariables = combineRegexes(variableLeftPart, objectValues);
const numberVariables = combineRegexes(variableLeftPart, numberValues);
const stringVariables = combineRegexes(variableLeftPart, stringValues);

export function variableDeclarations(input) {
    return input?.match(arrayVariables);
    // console.log(input?.match(objectVariables))
}


export const matchArrayVariables = input => input?.match(arrayVariables);
export const matchObjectVariables = input => input?.match(objectVariables);
export const matchNumberVariables = input => input?.match(numberVariables);
export const matchStringVariables = input => input?.match(stringVariables);
export {
    arrayValues,
    objectValues,
    numberValues,
    stringValues
}