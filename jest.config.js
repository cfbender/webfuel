module.exports = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts", "jest-canvas-mock"],
  testEnvironment: "jsdom",
};
