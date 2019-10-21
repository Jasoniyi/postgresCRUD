module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: "airbnb-base",
  //   globals: {
  //     Atomics: "readonly",
  //     SharedArrayBuffer: "readonly"
  //   },
  //   parserOptions: {
  //     ecmaVersion: 2018,
  //     sourceType: "module"
  //   },
  rules: {
    "no-console": 0,
    "no-param-reassign": [2, { props: false }],
    "prefer-destructuring": 0,
    "arrow-body-style": 0,
    "comma-dangle": 0,
    semi: ["error", "always"],
    quotes: ["error", "double"]
  }
};
