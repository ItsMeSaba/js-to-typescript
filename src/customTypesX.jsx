export function isInputObject(test) {
    try {
        let parsed = JSON.parse(test);
        return typeof parsed === 'object' && !Array.isArray(parsed);
    } catch(e) {
        return false;
    }
}

export function isInputArray(test) {
    try {
        return Array.isArray(JSON.parse(test));
    } catch(e) {
        return false;
    }
}

export const isInputString = test => test.match(/^"[^\"]*"$/g);

// export function arrayInterface(arr, setResults) {
//     let parsedArr = Array.isArray(arr) ? arr : JSON.parse(arr);
//     let types = {};
//     let type;

//     for(let i = 0; i < parsedArr.length; i++) {
//         if(Array.isArray(parsedArr[i])) {
//             type = arrayInterface(parsedArr[i])
            
//             if(!types[type]) types[type] = 1;
                        
//             continue;

//         } else if(parsedArr[i] === null && !types['null']) {
//             types['null'] = 1; 
            
//             continue;

//         } else if(typeof parsedArr[i] === 'object') {

//             type = JSON.stringify(objectInterface(parsedArr[i]), null, 4).replace(/"/g, '');

//             console.log('type', type)
            
//             if(!types[type]) types[type] = type; 
            
//             console.log('type', Object.keys(types))

//             continue;
//         }

//         type = typeof parsedArr[i];
        
//         if(!types[type]) types[type] = 1;
//     }

//     types = Object.keys(types);
//     type = types.length > 1 ? `( ${ types.join(' | ') } )` : types.join('');

//     if(!setResults) return `${type}[]`

//     setResults([
//         <>let arr : <span className='answer'>{type}[]</span> = {arr}</>,
//     ])
// }

export function arrayInterface(arr, setResults) {
    let parsedArr = Array.isArray(arr) ? arr : JSON.parse(arr);
    let types = new Set();
    let type;

    for(let i = 0; i < parsedArr.length; i++) {
        if(Array.isArray(parsedArr[i])) {
            type = arrayInterface(parsedArr[i])
            
            types.add(type);
                        
            continue;

        } else if(parsedArr[i] === null && !types['null']) {
            types.add('null');
            
            continue;

        } else if(typeof parsedArr[i] === 'object') {
            type = objectInterface(parsedArr[i]);

            type = JSON.stringify(type).replace(/"/g, ' ');

            types.add(type);
            continue;
        }

        type = typeof parsedArr[i];
        
        types.add(type);
    }

    types = Array(...types);

    type = types.length > 1 ? `( ${ types.join(' | ') } )` : types.join('');
    

    if(!setResults) return `${type}[]`

    setResults([
        <>let arr : <span className='answer'>{type}[]</span> = {arr}</>,
    ])
}

export function objectInterface(obj, setResults) {
    let parsedObj = typeof obj === 'object' ? obj : JSON.parse(obj);
    let types = {};
    let type;

    for(let [key, value] of Object.entries(parsedObj)) {
        if(value === null) {
            types[key] = null;
            continue;

        } else if(Array.isArray(value)) {
            types[key] = arrayInterface(value);

            continue;

        } else if(typeof value === 'object') {
            types[key] = objectInterface(value);
            continue;

        } else {
            type = typeof value;
            types[key] = type;
        }
    }
    

    if(!setResults) return types;

    setResults([
        <pre
            // className='answerTextarea' 
            // disabled 
            // value={JSON.stringify(types, null, 2)}
        >
            interface _InerfaceName_ { JSON.stringify(types, null, 4).replace(/"/g, ' ') }
        </pre>
    ])
}