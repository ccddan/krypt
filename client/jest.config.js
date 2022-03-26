/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleDirectories: ["node_modules", "./tests"],
  moduleNameMapper: {
    "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
    "<rootDir>/tests/__mocks__/file.mock.ts",
    "\\.(css|less)$": "<rootDir>/tests/__mocks__/file.mock.ts",
    "(.*)abis/Transactions.json": "<rootDir>/tests/__mocks__/Transactions.json.mock.ts",
    "(.*)abis/Transactions_addr.json": "<rootDir>/tests/__mocks__/Transactions_addr.json.mock.ts",
    "@project/tests/(.*)": "<rootDir>/tests/$1",
    "@project/config": "<rootDir>/src/config/index.ts",
    "@project/blockchain": "<rootDir>/src/blockchain/index.ts",
    "@project/blockchain/(.*)": "<rootDir>/src/blockchain/$1",
  },
  // The bail config option can be used here to have Jest stop running tests after
  // the first failure.
  bail: false,
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
  // Indicates whether each individual test should be reported during the run.
  verbose: false,
  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: false,
  // The directory where Jest should output its coverage files.
  coverageDirectory: "./coverage/",
  // If the test path matches any of the patterns, it will be skipped.
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  // If the file path matches any of the patterns, coverage information will be skipped.
  coveragePathIgnorePatterns: ["<rootDir>/node_modules/"],
  // The pattern Jest uses to detect test files.
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(tsx|ts)?$",
  // This option sets the URL for the jsdom environment.
  // It is reflected in properties such as location.href.
  // @see: https://github.com/facebook/jest/issues/6769
  testURL: "http://localhost/",
  // @see: https://jestjs.io/docs/en/configuration#coveragethreshold-object
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 95,
      functions: 100,
      lines: 100,
    },
  },
  reporters: [
    "default",
    [
      "jest-html-reporters",
      {
        pageTitle: "Test Report - Krypt Client",
        publicPath: "./coverage/",
        filename: "test-report.html",
        logoImgPath: "./images/krypt-icon-black.png",
      },
    ],
  ],
};
