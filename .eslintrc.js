/*
Settings for eslint
https://eslint.org/docs/user-guide/configuring/
 */

module.exports = {
    parser: '@typescript-eslint/parser', // specify the parser you wish to use for transpilation
    extends: ['plugin:react/recommended', 'plugin:@typescript-eslint/recommended', 'prettier'], // specify any configs from other libs that you wish to extend into this config
    settings: {
        react: {
            version: 'detect',
        },
    }, // settings - specify settings you wish to share across all rules - in our case we wish to share the react version, which we get by detecting
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    plugins: ['@typescript-eslint', 'react', 'prettier'], // plugins can be installed and listed here in order to consume custom rules from the package
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2015,
        sourceType: 'module',
    }, // configurations for the parser - here we specify that we're using JSX, ES6 (2015), and the sourceType is module (i.e using ES Modules)
    overrides: [
        {
            // enable the rule specifically for TypeScript files
            files: ['*.ts', '*.tsx'],
            rules: {
                '@typescript-eslint/explicit-function-return-type': ['error'],
                '@typescript-eslint/explicit-module-boundary-types': ['error'],
                '@typescript-eslint/no-var-requires': ['error'],
            },
        },
    ], // overrides allow us to replace the top-level rules with other rules under certain conditions - this is good when we want to use a rule that can only be applied situationally
    rules: {
        'react/prop-types': 'off', // since we're using TS and have static typing, we don't need react prop-types
        '@typescript-eslint/explicit-function-return-type': 'off', // turned off for all file times but overridden to be on specifically for ts files
        'prettier/prettier': 'error', // error where prettier's formatting rules aren't satisfied
        '@typescript-eslint/interface-name-prefix': 'off', // do not require interface names to start with I
        '@typescript-eslint/no-explicit-any': 'off', // allow usage of the 'any' type
        '@typescript-eslint/ban-ts-ignore': 'off', // allow ignoring TypeScript linting rules
        '@typescript-eslint/explicit-module-boundary-types': 'off', // turned off for all file times but overridden to be on specifically for ts files
        '@typescript-eslint/no-unused-vars': ['error'], // error when variables are declared but not used
        '@typescript-eslint/no-var-requires': 'off', // turned off for all file times but overridden to be on specifically for ts files
    },
}
