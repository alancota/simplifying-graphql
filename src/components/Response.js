//@src/components/Response.js

import React from 'react'
import './Response.css'
import {JSONTree} from "react-json-tree";
import Collapsible from 'react-collapsible';


const Response = (props) => {


    //JSONTree theme
    const theme = {
        scheme: "monokai",
        author: "wimer hazenberg (http://www.monokai.nl)",
        base00: "#272822",
        base01: "#383830",
        base02: "#49483e",
        base03: "#75715e",
        base04: "#a59f85",
        base05: "#f8f8f2",
        base06: "#f5f4f1",
        base07: "#f9f8f5",
        base08: "#f92672",
        base09: "#fd971f",
        base0A: "#f4bf75",
        base0B: "#a6e22e",
        base0C: "#a1efe4",
        base0D: "#66d9ef",
        base0E: "#ae81ff",
        base0F: "#cc6633",
    };


    return (
        <div className="response_textarea shadowit text-start">

            {props.data.map((item,i) => (
                <Collapsible
                    className="p-3"
                    key={i}
                    trigger={<>
                                <span className="response-step">Trip {i+1} - </span>
                                <span className="response-type">[{item.type}]: </span>
                                <span className="response-person">[{item.tracking.person}]</span>
                                <span className="response-film">{item.tracking.film ? ` -> [${item.tracking.film}]` : ''}</span>
                                <span className="response-planet">{`${item.tracking.planet ? ` -> [${item.tracking.planet}]` : ''}`}</span>
                            </>}
                >
                        {
                         <>
                             <div className="p-2">
                                 <span className="response-method">{item.method}--> </span>
                                 <span className="response-endpoint">{item.endpoint}</span>
                             </div>
                             <JSONTree
                                 data={item.data}
                                 theme={theme}
                                 hideRoot={true}
                                 shouldExpand={false}
                             />
                         </>

                         }
                </Collapsible>
            ))}
        </div>
    )
};

export default Response
