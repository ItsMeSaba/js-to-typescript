import { stringify } from './jsonFunctions';
import { objectDeclaration, arrayDeclaration, literalDeclaration } from './handleDeclarations';
import { variableDeclarations } from './syntax/variableDeclarations'
import { functionDeclarations } from './syntax/functionDeclarations'

import { loopBody } from './loopBody'

Array.prototype.insert = function(index, item) {
    this.splice(index, 0, item);

    return this;
};


export default function(input, setResults) {
    const {parse, print} = require('recast')
    
    try {
        let tree = parse(input);
        let ref = tree.program.body;
        let interfaces = [];

        console.clear();

        loopBody(ref)
        console.log('---')
        

        let newTree = print(tree).code;

        setResults(newTree)

    } catch(e) {

        setResults(`${e.toString()} at column ${e.column}`)

        console.log(e)

    }
}