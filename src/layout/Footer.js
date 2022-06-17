//@src/layout/Footer.js

import React from 'react'
import metadata from "../utils/metadata.json"

const Footer = () => {
    return (
            <span>
                {`build number ${metadata.buildMajor}.${metadata.buildMinor}.${metadata.buildRevision} - ${metadata.buildTag} ${process.env.NODE_ENV}`}
            </span>
    )
};

export default Footer
