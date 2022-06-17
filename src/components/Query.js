//@src/components/Query.js

import React from 'react'
import { CopyBlock, dracula, github } from "react-code-blocks";

const Query = ({ code, language, showLineNumbers, startingLineNumber }) => {
    return (
        <CopyBlock
            text={code}
            language={language}
            showLineNumbers={showLineNumbers}
            startingLineNumber={startingLineNumber}
            theme={github}
            wrapLines={true}
            codeBlock
        />
    )
};

export default Query
