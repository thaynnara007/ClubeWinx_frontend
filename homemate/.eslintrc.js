module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  plugins: ["import"],
  extends: "eslint:recommended",
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "no-console": "warn",
    "import/first": "error"
  },
};
