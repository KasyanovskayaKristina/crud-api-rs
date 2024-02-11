module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    project: "tsconfig.json",
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "eslint:recommended",
    "plugin:node/recommended",
    "plugin:prettier/recommended",
  ],
  env: {
    es2021: true,
    jest: true,
    node: true,
  },
  root: true,
  ignorePatterns: [".eslintrc.js"],
  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
      node: {
        extensions: [".js", ".ts"],
      },
    },
    node: {
      allowModules: ["electron"],
      resolvePaths: [__dirname],
      tryExtensions: [".js", ".ts"],
    },
    typescript: {
      project: "./",
    },
  },
  rules: {
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "object-curly-spacing": ["error", "always"],
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": ["warn", { vars: "local" }],
    "no-multi-spaces": "error",
    "node/no-unsupported-features/es-syntax": "off",
  },
};
