module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ["<rootDir>/config/jest/setupJest.ts"],
  globals: {
      "ts-jest": {
          "tsConfig": "tsconfig.spec.json",
          stringifyContentPathRegex: '\\.html$'
      }
  },
  transform: {
      '^.+\\.(ts|html)$': 'ts-jest',
  },
  transformIgnorePatterns: ["(node_modules)", "polyfills.browser.ts"],
  moduleDirectories: [
      "node_modules",
      "src"
  ],
  testEnvironment: 'jest-environment-jsdom-fourteen',
  moduleFileExtensions: ['ts', 'html', 'js', 'json'],
  moduleNameMapper: {
      "ng-event-source": "<rootDir>/config/jest/jestNgEventSource.js"
  },
  collectCoverage: false,
  collectCoverageFrom: [
      "**/*.ts",
      "!**/models/*.ts",
      "!**/*.model.ts",
      "!**/*.formly-component.ts",
      "!**/*.object-mapper.ts",
      "!**/*.api.ts",
      "!**/*.spec.ts",
      "!**/*index.ts",
      "!**/*-stub.ts",
      "!**/*ng-open-cargo-web.ts",
      "!**/*module.ts",
      "!**/*.d.ts",
      "!**/*polyfills.ts",


      "!**/vendor/**",
      "!**/dist/**",
      "!**/config/**"
  ],
  testURL: "http://localhost",
  coverageDirectory: "./coverage/",
  coverageReporters: [
      "json",
      "lcov",
      "text"
  ],
  roots: [
      "<rootDir>"
  ]
};
