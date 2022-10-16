module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'comma-dangle': 0,
    'no-use-before-define': 0,
    'implicit-arrow-linebreak': 0,
    'function-paren-newline': 0,
    'no-param-reassign': 0,
    'no-confusing-arrow': 0,
    'object-curly-newline': 0,
    'no-nested-ternary': 0,
    'react/prop-types': ['off']
  },
};
