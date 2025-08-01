const { defineConfig } = require('eslint/config');
const babelParser = require('@babel/eslint-parser');
const jsxA11y = require('eslint-plugin-jsx-a11y');
const reactPlugin = require('eslint-plugin-react');
const importPlugin = require('eslint-plugin-import');

module.exports = defineConfig([
    {
        ignores: ["src/js/vendor/*", "src/stories/*", "coverage/*"]
    },
    {
        files: ["src/js/**/*.jsx", "src/js/**/*.js"],
        plugins: {
            'jsx-a11y': jsxA11y,
            'react': reactPlugin,
            'import': importPlugin
        },
        "languageOptions": {
            "parser": babelParser,
            "ecmaVersion": 2018,
            "globals": {
                "window": true,
                "document": true
            },
            "parserOptions": {
                "ecmaFeatures": {
                    "jsx": true
                }
            }
        },
        "settings": {
            "import/resolver": {
                "node": {
                    "moduleDirectory": ["node_modules", "src/js", "src/_scss"]
                }
            },
            "react": {
                "version": "detect"
            }
        },
        // overrides to the Airbnb style follow
        "rules": {
            // indentation should be 4 spaces (use soft tabs) and switch cases should be indented
            "indent": [2, 4, {
                "SwitchCase": 1
            }],
            // This is in direct competition with the above indent rule for some reason even when given the same
            // arguments, so it is turned off and the above adequately handles jsx files.
            "react/jsx-indent": [0],
            "react/jsx-indent-props": [0],
            // Allows React Router "Link" component to be a11y compliant
            "jsx-a11y/anchor-is-valid": [ "error", {
                "components": [ "Link" ],
                "specialLink": [ "to", "hrefLeft", "hrefRight" ],
                "aspects": [ "noHref", "invalidHref", "preferButton" ]
            }],
            // Restrict console use to only warnings and errors to aid in rapid debugging
            "no-console": ["error", { "allow": ["warn", "error"] }]
            ,
            // closing brackets should be aligned with the final prop (props.. />)
            "react/jsx-closing-bracket-location": [2, "after-props"],
            "react/no-unused-prop-types": [2],
            // also set the tab width for the max line width with a max length of 120
            "max-len": [1, 120, {"tabWidth": 4}],
            // do not allow dangling commas at the end of arrays, objects, etc.
            "comma-dangle": [2, "never"],
            // Make sure there are always semicolons at the end of lines where applicable
            "@/semi": [2, "always"],
            // downgrade extra semicolons to warnings
            "no-extra-semi": [1],
            // require parens in arrow functions with single arguments for improved readability
            "arrow-parens": [2, "always"],
            // allow double-quoted strings
            "quotes": [0],
            // allow for loops
            "no-restricted-syntax": [2, "LabeledStatement", "WithStatement"],
            // require stroustrup brace styles
            "brace-style": [1, "stroustrup"],
            // disallow stateless functions in place of fully declared React components
            "react/prefer-stateless-function": [0],
            // allow binding in React props because we don't have autobind in ES6
            "react/jsx-no-bind": [0],
            // downgrading export default preference to warning, since we may add additional exports
            // to files in the future
            "import/prefer-default-export": [1],
            // disabling class method "this" requirement to avoid React conflicts
            "class-methods-use-this": [0],
            "no-underscore-dangle": [0, {
                "allowAfterThis": true
            }],
            // allow ++ and -- in for loops
            "no-plusplus": [2, {
                "allowForLoopAfterthoughts": true
            }],
            // allow continue statements
            "no-continue": [0],
            // allow named exports in files with default exports in order to expose containers
            // for testing
            "import/no-named-as-default": [0],
            // don't require all function arguments be on new lines
            "function-paren-newline": [0],
            // ignore jsdoc
            "spaced-comment": [2, "always", {
                "exceptions": ["*"]
            }],
            // for now, don't do destructuring
            "prefer-destructuring": [0],
            // allow some globals
            "no-restricted-globals": [0],
            // default prop types not required
            "react/require-default-props": [0],
            "react/default-props-match-prop-types": [1],
            // allow object prop-type
            "react/forbid-prop-types": [1, {
                "forbid": ["any"]
            }],
            // allow unused state because linter does not always know when a state is passed to child
            // components
            "react/no-unused-state": [0],
            // Disabling this rule, since its been deprecated
            "jsx-a11y/label-has-for": [0],
            // downgrade array index as React key to warning (though it should be higher, this would
            // be an expensive refactor)
            "react/no-array-index-key": [1],
            // prevent no-unused-vars error on for loop variables
            "no-unused-vars": [1],
            // the next 2 stop "no-unused-vars" from missing the React imports/vars
            "react/jsx-uses-react": "warn",
            "react/jsx-uses-vars": "warn"
        }
    }
]);