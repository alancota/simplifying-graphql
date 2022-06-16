//@src/components/Header.js

import React from 'react'

import "./Header.css"
import {Container} from "react-bootstrap";

const Header = () => {
    return (
        <Container fluid className="header-container p-3 text-center">
            <div>REST vs GraphQL Demo</div>
        </Container>
    )
};

export default Header
