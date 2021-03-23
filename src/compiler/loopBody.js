import { objectDeclaration, arrayDeclaration, literalDeclaration } from './handleDeclarations';
import { variableDeclarations } from './syntax/variableDeclarations'
import { functionDeclarations } from './syntax/functionDeclarations'
import { callExpression } from './syntax/callExpression';

export function loopBody(ref) {
    for(let i = { count : 0 }; i.count < ref.length; i.count++) {
        
        switch(ref[i.count].type) {
            case 'VariableDeclaration':
                variableDeclarations(ref, i);
            break;

            case 'FunctionDeclaration':
                functionDeclarations(ref[i.count])
                loopBody(ref[i.count].body.body)
            break;

            case 'ForStatement':    
                loopBody(ref[i.count].body.body);
            break;

            // case 'CallExpression':
            //     callExpression(ref[i.count])
            // break;

        }
    }
}