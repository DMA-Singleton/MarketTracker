module.exports = {
  roots: ["<rootDir>/src"],
  testMatch: ["**/__tests__/**/*.+(ts|tsx|js)", "**/?(*.)+(spec|test).+(ts|tsx|js)"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  globals: {
    __DEV__: true,
  },
  globalSetup: "./bin/tests/jest-config.js",
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["./src/ioc/ioc.ts"],
  collectCoverageFrom: [
    "<rootDir>/src/**/*.{js,jsx,ts,tsx}",
    "!<rootDir>/src/Server/Controllers/**",
    "!<rootDir>/src/App.ts",
    "!<rootDir>/src/Server/Startup.ts",
    "!<rootDir>/src/tests/jest-config.ts",
  ],
};
