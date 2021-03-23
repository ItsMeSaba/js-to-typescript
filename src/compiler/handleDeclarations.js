import { objectInterface, arrayInterface } from './customTypes';
import { stringifyWithSpaces } from './jsonFunctions'

export function objectDeclaration(object, interfaces) {
    let ref = object.declarations[0];

    let objType = objectInterface(ref.init.original.properties);

    let objInterface = JSON.stringify(objType, null, '   ').replace(/"/g, '');

    // interfaces.push(`interface ${ref.id.name}Interface ${objInterface}`);
    object.kind = `interface ${ref.id.name}Interface ${objInterface}\n\n${object.kind}`

    ref.id.name += ` : ${ref.id.name}Interface`;
}

export function arrayDeclaration(array) {
    let ref = array.declarations[0];

    let type = stringifyWithSpaces(arrayInterface(ref.original.init.elements));
    
    ref.id.name += ` : ${type}`
}

// export function literalDeclaration(literal) {
//     let ref = literal.declarations[0];

//     ref.id.name += ` : ${typeof ref.init.original.value}`
//  }