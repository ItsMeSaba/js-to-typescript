const replace = (str, index, value) => str.slice(0, index) + value + str.slice(index+1); 


export function stringifyWithSpaces(data) {
    let str = JSON.stringify(data); 
    let newStr = '';

    for(let i = 0; i < str.length; i++) {
        switch (str[i]) {
            case '"':
                break;

            case '{':
                newStr += '{ ';
                break;

            case '}':
                newStr += ' }';
                break;
                
            case ',':
                newStr += ', ';
                break;
                
            case ':':
                newStr += ' : ';
                break;
            
            default:
                newStr += str[i];
                break;
        }
    }
    return newStr;
}

export const stringifyWithoutQuotes = data => JSON.stringify(data).replace(/"/g, '');