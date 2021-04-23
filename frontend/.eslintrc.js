module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    // 'plugin:react/recommended',
    // 'airbnb',
    // 'airbnb-base',
    'prettier',
    'prettier/react',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'no-underscore-dangle': [
      'error',
      { allow: ['_id', '_baseUrl', '_headers'] },
    ],
  },
}
