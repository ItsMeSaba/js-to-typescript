import { objectDeclaration, arrayDeclaration, literalDeclaration } from './handleDeclarations';
import { variableDeclarations } from './syntax/variableDeclarations'
import { functionDeclarations } from './syntax/functionDeclarations'
import { callExpression } from './syntax/callExpression';
import { expressionStatement } from './syntax/expressionStatement';

export function loopBody(ref) {
    if(!ref) return false;

    for(let i = { count : 0 }; i.count < ref.length; i.count++) {
        switch(ref[i.count].type) {
            case 'VariableDeclaration':
                variableDeclarations(ref, i);
            break;
                
            case 'FunctionDeclaration':
                functionDeclarations(ref[i.count], i)
                loopBody(ref[i.count].body.body)
            break;
                
            case 'ForStatement':    
                loopBody(ref[i.count].body.body);
            break;
                
            // case 'CallExpression':
            //     // callExpression(ref[i.count])
            //     console.log('callexp', ref[i.count])
            // break;
                
            case 'ExpressionStatement':
                expressionStatement(ref[i.count]);
            break;
                
            case 'FunctionExpression':
                functionDeclarations(ref[i.count], i);
                loopBody(ref[i.count].body.body)
            break;

            case 'IfStatement':
                loopBody(ref[i.count].consequent.body);
            break;
        }
    }
}