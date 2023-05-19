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
    setupFilesAfterEnv: ["<rootDir>/tests/setup.js"],
    transform: {
        "^.+\\.jsx$|js$": "babel-jest"
    },
    transformIgnorePatterns: [
        "node_modules/(?!(data-transparency-ui))"
    ]
};
