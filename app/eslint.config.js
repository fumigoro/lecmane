import google from "eslint-config-google";
import prettier from "eslint-config-prettier";
import typeScriptESLintParser from "@typescript-eslint/parser";

import react from 'eslint-plugin-react';
// const globals = require('globals');
const config = [
    {
        files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
        
        languageOptions: {
            parser: typeScriptESLintParser,
        },
        plugins: {
            react,
            google,
            prettier
        },
        rules: {
            "require-jsdoc": 0,
            "max-len": 0,
            "react/react-in-jsx-scope": 0,
            "object-curly-spacing": 0,
            "valid-jsdoc": 0,
        }
    }
]
export default config;