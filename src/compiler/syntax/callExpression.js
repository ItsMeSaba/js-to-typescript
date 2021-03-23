import { loopBody } from '../loopBody';

export function callExpression(ref) {
    let args = ref.declarations[0].init.arguments;

    // for(let i in args) {
    for(let i = 0; i < args.length; i++) {
        let type = args[i].type;

        if(type === 'ArrowFunctionExpression') {
            if(args[i].body) {
                loopBody(args[i].body.body);
            }
        }
    }
}