import React from 'react'
import Searchbox from '../../hooks/searchbox/Searchbox'
import './main.css'

function Main() {
    return (
        <div className='main'>
            <div className="upper">
                <h1 className='headerText'>Find Your Type.</h1>
                <br/>
                <br/>
                <Searchbox />
            </div>    
            
            <article>
                <Section>
                    <h1>js-to-typescript</h1>

                    <p>Typescript gives you advantage by adding types to Javascript which leads to better error handling. This tool will help you to transform your JS porject to TS one.</p>
                </Section>

                <Section>
                    <h1>Is this tool enough?</h1>

                    <p>Short answer: No.</p>

                    <p>Long answer: It can't guess all types perfectly, you will have to change some 'any' types to correct ones.</p>
                </Section>
            </article>
        </div>
    )
}

function Section({ children, ...props }) {
    return (
        <div className="section" {...props}>
            { children }
        </div>
    )
}

export default Main
