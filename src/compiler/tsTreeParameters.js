import { arrayInterface, objectInterface } from './customTypes'
import { stringifyWithSpaces, objectsEqual, stringifyWithoutQuotes, stringifyQuotesSpaces } from './jsonFunctions'

const {parse, print} = require('recast')
const tsParser = require("recast/parsers/typescript")

const parseTS = ts => parse(ts, { parser: tsParser }).program.body[0];


export function addVariableArrayType(ref) {
    let arrType = stringifyWithSpaces(arrayInterface(ref.declarations[0].init.elements))
    let newArrType = parseTS(`let a : ${arrType}`).declarations[0].id.typeAnnotation;

    ref.declarations[0].id.typeAnnotation = newArrType;

    console.log(parseTS(`let a = () => 5`))
}

export function addVariableObjectType(ref, i) {
    let objType = stringifyQuotesSpaces(objectInterface(ref[i.count].declarations[0].init.properties));
    let interfaceName = `${ref[i.count].declarations[0].id.name}Interface`;
    let newObjType = parseTS(`let a : ${interfaceName}`).declarations[0].id.typeAnnotation;
    
    ref[i.count].declarations[0].id.typeAnnotation = newObjType;

    ref.insert(i.count, parseTS(`interface ${interfaceName} ${objType}\n\n`));
    i.count++;
}

export function addTypesToFunction(ref, a) {
    let parsedFunction = parseTS(`function test(a: any): any {}`);
    let paramType = parsedFunction.params[0].typeAnnotation;
    let returnType = parsedFunction.returnType;
    
    ref[a.count].returnType = returnType;
    
    for(let i = 0; i < ref[a.count].params.length; i++) {
        ref[a.count].params[i].typeAnnotation = paramType;
    }
}

export function addTypesToArrowFunction(ref, i) {
    let parsedArrowFunction = parseTS(`let a = (a : any): any => 5`);
    let paramType = parsedArrowFunction.declarations[0].init.params[0].typeAnnotation;
    let returnType = parsedArrowFunction.declarations[0].init.returnType;
    let params = ref.declarations[0].init.params;

    ref.declarations[0].init.returnType = returnType;
    
    for(let i = 0; i < params.length; i++) {
        params[0].typeAnnotation = paramType;
    }
}