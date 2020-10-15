module.exports = {
  roots: ["<rootDir>/src"],
  testMatch: ["**/__tests__/**/*.+(ts|tsx|js)", "**/?(*.)+(spec|test).+(ts|tsx|js)"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  globals: {
    __DEV__: true,
  },
  globalSetup: "./src/tests/jest-config.ts",
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["./src/ioc/ioc.ts"],
  collectCoverageFrom: [
    "<rootDir>/src/**/*.{js,jsx,ts,tsx}",
    "!<rootDir>/src/Server/Controllers/**", //controllers should not be tested, controllers logic is tested instead
    "!<rootDir>/src/App.ts", //this file should not have any own logic
    "!<rootDir>/src/Server/Startup.ts", //this file should not have any own logic
    "!<rootDir>/src/Server/Helpers/Validator.ts", //this has to be excluded because it is not possible to test
    "!<rootDir>/src/tests/jest-config.ts", //this has to be excluded because it is not recognized correctly
  ],
};
