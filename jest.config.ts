import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./",
});

const config = {
  clearMocks: true,
  coverageProvider: "v8",
  preset: "ts-jest/presets/js-with-ts",
  setupFiles: ["dotenv/config"],
  transform: {
    "^.+\\.mjs$": "ts-jest",
  },
  moduleNameMapper: {
    "@/(.*)": ["<rootDir>/src/$1"],
  },
  testEnvironment: "jsdom",
};

module.exports = createJestConfig(config);
