const ignorePatterns = [
    'data-tranparency-ui',
    /** react-markdown 10.1.0 */
    'react-markdown',
    'devlop',
    'hast-util-.*',
    'mdast-util-.*',
    'unist-util-.*',
    'remark-.*',
    'bail',
    'comma-separated-tokens',
    'decode-named-character-reference',
    'estree-util-is-identifier-name',
    'html-url-attributes',
    'is-plain-obj',
    'micromark',
    'property-information',
    'space-separated-tokens',
    'trim-lines',
    'trough',
    'unified',
    'vfile',
    'vfile-message'
].join('|')

module.exports = {
    rootDir: ".",
    testRegex: "tests/.*-(test)\\.(jsx||js)?$",
    verbose: true,
    bail: false,
    collectCoverage: true,
    collectCoverageFrom: [
        "src/js/containers/**/*.{js,jsx}",
        "src/js/components/**/*.{js,jsx}",
        "src/js/redux/reducers/**/*.{js,jsx}",
        "!node_modules/**",
        "!public/**"
    ],
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|md)$":
        "<rootDir>/__mocks__/fileMock.js",
        "^(data-transparency-ui)$": "<rootDir>/node_modules/data-transparency-ui",
        "\\.(css|less|scss)$": "identity-obj-proxy",
        d3: '<rootDir>/node_modules/d3/d3.min.js'
    },
    setupFiles: ["<rootDir>/tests/rejection.js"],
    setupFilesAfterEnv: ["<rootDir>/tests/setup.js", "jest-canvas-mock"],
    transform: {
        "^.+\\.(jsx|js)$": "babel-jest"
    },
    transformIgnorePatterns: [
        `node_modules/(?!(${ignorePatterns}))`,
        ]
};
