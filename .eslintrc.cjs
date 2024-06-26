module.exports = {
    root: true,
    env: {
        browser: true,
        es2020: true,
        node: true, // Add node environment
    },
    parser: "@typescript-eslint/parser",  // Specifies the ESLint parser
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"  // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    ],
    ignorePatterns: [
        "node_modules",
        "vendor"
    ],
    parserOptions: {
        ecmaVersion: 2020,  // Allows for the parsing of modern ECMAScript features
        sourceType: "module",  // Allows for the use of imports
    },
    rules: {
        // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
        // e.g. "@typescript-eslint/explicit-function-return-type": "off",
        "indent": ["error", 4],
        "quotes": ["error", "double"],
        "semi": ["error", "always"],
        "no-extra-semi": "off",
        "@typescript-eslint/no-extra-semi": "off",
        "eol-last": ["error", "always"],
        "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 1 }],
    }
};
  
