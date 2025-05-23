export default {
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.css$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom"], 
  transform: {
    "^.+\\.jsx?$": "babel-jest", 
  },
  collectCoverage: true,
  coverageReporters: ["json", "lcov", "text", "clover"],
  coverageDirectory: "coverage",
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "/.storybook/",
    "/storybook-static/",
  ],
}
