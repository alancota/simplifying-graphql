//@src/components/REST.js

import React from 'react'

const Rest = (props) => {

    return (
        <div>
            <ul>
                {props.response.map((item) => (
                    <li>{item}</li>
                ))}
            </ul>
        </div>
    )
};

export default Rest
