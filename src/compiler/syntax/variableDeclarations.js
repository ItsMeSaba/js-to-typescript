import { objectDeclaration, arrayDeclaration } from '../handleDeclarations';
import { addVariableArrayType, addVariableObjectType, addTypesToArrowFunction } from '../tsTreeParameters'
import { callExpression } from './callExpression';

export function variableDeclarations(ref, i) {
    switch (ref[i.count].declarations[0].init.type) {
        
        case 'ObjectExpression':
            addVariableObjectType(ref, i)
            
        break;
            
        case 'ArrayExpression':
            addVariableArrayType(ref[i.count])
            
        break;
        
        case 'CallExpression':
            callExpression(ref[i.count]);

        break;

        case 'ArrowFunctionExpression':
            addTypesToArrowFunction(ref[i.count], i)
        break;
    }
}  



// function callExpression(ref) {
//     let calleeRef = ref.declarations[0].original.init.callee;

//     if(calleeRef.object.name === 'document') {
//         let propertyName = calleeRef.property.name;

//         if(propertyName.match(/^getElements/)) {
//             return ref.declarations[0].id.name += ' : HTMLCollectionOf<Element>'
//         } 

//         if(propertyName.match(/^getElement/)) {
//             return ref.declarations[0].id.name += ' : HTMLElement'
//         }

//         if(propertyName === 'querySelectorAll') {
//             return ref.declarations[0].id.name += ' : NodeListOf<HTMLElement>'
//         }

//     }
// }