module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential', '@vue/standard', 'eslint:recommended'
    ],
    "plugins": ["compat"],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'semi': [1, 'always'],
        "indent": ["error", 4, {
            "outerIIFEBody": 0,
            "MemberExpression": 1,
            "FunctionDeclaration": {
                "parameters": "first"
            },
            "CallExpression": {
                "arguments": "first"
            },
            "ObjectExpression": 1,
            "flatTernaryExpressions": false,
            "SwitchCase": 1

        }],
        'array-element-newline': ["error", "never"],
        'compat/compat': "error"
    },
    parserOptions: {
        parser: 'babel-eslint'
    },
    // "browserslist": [
    //     "> 1%",
    //     "last 2 versions",
    //     "ie <= 8",
    //     "safari >= 7",
    //     "ios_saf >= 7"
    // ]
};
