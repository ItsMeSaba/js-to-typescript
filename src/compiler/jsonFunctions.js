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

export const stringifyQuotesSpaces = data => JSON.stringify(data, null, '\t').replace(/"/g, '')

export function objectsEqual(obj1, obj2) {
    for(let [key, value] of Object.keys(obj1)) {
        if(!obj2.hasOwnProperty(key)) return false;

        if(obj2[key] !== value) return false;
    }

    return  true;
}