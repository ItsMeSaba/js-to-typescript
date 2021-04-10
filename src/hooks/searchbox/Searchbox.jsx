import React, { useRef, useState, useEffect } from 'react'
import './searchbox.css'
import { Controlled as CodeMirror } from 'react-codemirror2';

// import compiler from '../../compiler/compiler';
import compiler from 'js-to-typescript'

import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

// import 'codemirror/mode/htmlmixed/htmlmixed';
// import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';

const sampleCode = `let a = [1];

let b = {
    a : 5,
    b : 'a',
    c : ['a', 5]
}
`

function Searchbox() {
    const [timeoutId, setTimeoutId] = useState(null);
    const [code, setCode] = useState(sampleCode);
    const [results, setResults] = useState(compiler(sampleCode));
    const codeMirrorOptions = {
        theme: "material",
        lineNumbers: true,
        scrollbarStyle: null,
        lineWrapping: true
    };


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
                        setResults(compiler(js));
                    }, 500))
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

        </div>
    )
}

const DisplayResults = ({ results }) => (
    results.map((x, index) => <div key={index}>{x}</div>)
)

export default Searchbox