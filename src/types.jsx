import React from "react";

const HTMLElement = element => [
    <>const {element} = <span className='answer'>&lt;HTML{element}Element&gt;</span> document.getElementById('{element}')</>, 
    <>const {element} = document.getElementById('{element}') <span className='answer'>as HTML{element}Element</span></>,
] 

const wrapWithSigns = element => <span className='answer'>&lt;{element}&gt;</span>;

const types = {
    canvas : HTMLElement('Canvas'),
    input : HTMLElement('Input'),
    image : HTMLElement('Image'),
    div : HTMLElement('Div'),
    paragraph : HTMLElement('Paragraph'),
    textarea : HTMLElement('Textarea'),
    button : HTMLElement('Button'),
    useRef : [
        <p>const Ref = useRef{wrapWithSigns('HTMLElement')}(null<span className='answer'>!</span>)</p>,
        <p>const Ref = useRef{wrapWithSigns('HTMLElement')}(null)</p>,
        <p>const Ref = useRef{wrapWithSigns('(HTMLElement | null)')}(null)</p>,
    ]
}


export default types