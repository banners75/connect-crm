module.exports = {
    "reporters": [
        "default",
        [
            "jest-junit",
            {
                "outputDirectory": "reports",   // Directory for the JUnit XML file
                "outputName": "jest-junit.xml"  // File name for the report
            }
        ]
    ],
    "moduleFileExtensions": [
        "js",
        "json",
        "ts"
    ],
    "rootDir": "src",
    "testRegex": ".*\\.spec\\.ts$",
    "transform": {
        "^.+\\.(t|j)s$": "ts-jest"
    },
    "collectCoverageFrom": [
        "**/*.(t|j)s"
    ],
    "coverageDirectory": "../coverage",
    "testEnvironment": "node",
};