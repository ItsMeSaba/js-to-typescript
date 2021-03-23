import { objectDeclaration, arrayDeclaration } from '../handleDeclarations';
import { addTypesToFunction } from '../tsTreeParameters'


export function functionDeclarations(ref) {
    addTypesToFunction(ref)
}