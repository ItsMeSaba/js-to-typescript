import React, { useRef, useState, useEffect } from 'react'
import './searchbox.css'
import algorithm from "../../algorithm";
import { isInputObject, isInputArray, arrayInterface, objectInterface, isInputString } from '../../customTypesX';
import { Controlled as CodeMirror } from 'react-codemirror2';
import compiler from '../../compiler/compiler';
import { variableDeclarations } from '../../regexPatterns';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

// import 'codemirror/mode/htmlmixed/htmlmixed';
// import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';

function Searchbox() {
    const [timeoutId, setTimeoutId] = useState(null);
    const [results, setResults] = useState('');
    const [code, setCode] = useState('');
    const codeMirrorOptions = {
        theme: "material",
        lineNumbers: true,
        scrollbarStyle: null,
        lineWrapping: true
    };


    function inputHandler(e) {
        let newInput = e.nativeEvent.data;
        let value = e.target.value.trim(); 
        
        if(!value) return setResults([]);

        if(isInputString(value)) return setResults([<p>let str: <span className='answer'>string</span> = {value}</p>]) 

        if(isInputArray(value)) return arrayInterface(value, setResults);

        if(isInputObject(value)) return objectInterface(value, setResults);
        
        if(newInput !== ' ') algorithm(value, setResults)   
    }

    variableDeclarations();

    return (
        <div className='searchbox'>
            {/* <textarea type="text" onChange={inputHandler} placeholder='Search' className='mainInput'></textarea> */}
        
            <CodeMirror
                value={code}
                style={{ height : '600px' }}
                options={{
                    mode: "javascript",
                    ...codeMirrorOptions
                }}
                onBeforeChange={(editor, data, js) => {
                    clearTimeout(timeoutId);
                    setCode(js);
                    
                    setTimeoutId(setTimeout(() => {
                        compiler(js, setResults);
                    }, 2000))
                }}
                />

            <CodeMirror
                value={results}
                style={{ height : '600px' }}
                options={{
                    mode: "javascript",
                    ...codeMirrorOptions
                  }}
                onBeforeChange={(editor, data, js) => {

                }}
            />

            {/* <div className="results">
                { results.length > 0 && <DisplayResults results={results} /> }
            </div> */}
        </div>
    )
}

const DisplayResults = ({ results }) => (
    results.map((x, index) => <div key={index}>{x}</div>)
)

export default Searchbox