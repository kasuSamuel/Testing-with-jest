module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/src/setup.jest.ts"],
 maxWorkers: "50%",
   maxRetries: 3,
  testTimeout: 30000,
};

