module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true, jest: true }, // Added jest: true for test files
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:storybook/recommended"
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs", "vite.config.js"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    semi: ["error", "never"], // Prohibit semicolons
    "react/prop-types": "off", // Turning off prop-types for this project as it's small
    "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
  },
};
