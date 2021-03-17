// import { parse, generate } from 'abstract-syntax-tree';
import { parse, print } from "recast";
import { stringify } from './jsonFunctions';
import { objectDeclaration, arrayDeclaration } from './handleDeclarations';

function objectInterface(properties) {
    let obj = {};

    for(let i = 0; i < properties.length; i++) {
        switch (properties[i].value.type) {
            case 'Literal':
                obj[properties[i].key.name] = typeof properties[i].value.value;

                break;

            case 'ObjectExpression':
                obj[properties[i].key.name] = objectInterface(properties[i].value.properties);

                break;
        }
    }

    return obj;
}


function arrayInterface(elements) {
    let set = new Set();

    for(let i = 0; i < elements.length; i++) {
        switch (elements[i].type) {
            case 'Literal':
                if(elements[i].value === null) {
                    set.add('null');
                }

                set.add(typeof elements[i].value)

                break;
        
            case 'ObjectExpression':
                set.add(objectInterface(elements[i].properties))

                break;
        }
    }

    return Array(...set);
}

export default function(input, setResults) {
    try {
        let tree = parse(input);
        let ref = tree.program.body;
        let interfaces = [];
        
        
        for(let i = 0; i < ref.length; i++) {

            switch (ref[i].declarations[0].init.type) {
                case 'ObjectExpression':
                    objectDeclaration(ref[i], interfaces)

                    break;
            
                case 'ArrayExpression':
                    arrayDeclaration(ref[i]);

                    break;
            }
        }
        
        
        let newTree = (interfaces.length > 0 ? interfaces.join('\n\n') + '\n\n' : '') + print(tree).code; 
        
        setResults(newTree)
    } catch(e) {
        setResults(`${e.toString()} at column ${e.column}`)
        console.log(e)
    }
}