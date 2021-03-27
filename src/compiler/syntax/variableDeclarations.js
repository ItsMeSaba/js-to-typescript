import { objectDeclaration, arrayDeclaration } from '../handleDeclarations';
import { addVariableArrayType, addVariableObjectType, addTypesToArrowFunction } from '../tsTreeParameters'
import { callExpression } from './callExpression';
import { loopBody } from '../loopBody'

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
            loopBody(ref[i.count].declarations[0].init.body.body)
        break;
        
    }
}  