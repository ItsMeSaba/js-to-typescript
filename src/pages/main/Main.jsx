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
                    Remembering all type names is impossible, this tool will help you to easily find right Typescript Type for your variable. I got inspired to create it while learning typescript, googling every type that you need or scrolling through cheatsheets was kinda tiring and took longer time, I wanted to have place every you could search and results would pop instantly without any extra text or info, just example of using type. 
                </Section>

                <Section style={{backgroundColor : 'var(--mainColor)', color : 'white'}}>
                    <pre>
                        {JSON.stringify({
                            "a" : 2,
                            "b" : { "c" : 5, "d" : [2, null] },
                            "c" : [{ "a" : 5 }, 5, true, null]
                        }, null, '   ')}
                    </pre>
                    
                    Remembering all type names is impossible, this tool will help you to easily find right Typescript Type for your variable. I got inspired to create it while learning typescript, googling every type that you need or scrolling through cheatsheets was kinda tiring and took longer time, I wanted to have place every you could search and results would pop instantly without any extra text or info, just example of using type. 
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
