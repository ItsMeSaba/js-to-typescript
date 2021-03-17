import types from './types.jsx';

export default function(search, setResults) {
    let results = [];

    if(search.match(/^[1-9]*$/)) return setResults([<p>const variable : <span className='answer'>number</span> = {search}</p>])

    for(let [key, value] of Object.entries(types)) {
        if(key.includes(search)) results.push(...value);
    }

    return setResults(results);
}