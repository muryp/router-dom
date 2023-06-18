module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'comma-dangle': ['warn', 'always-multiline'],
    'prefer-template': ['warn'],
    'no-multi-spaces': ['warn', { ignoreEOLComments: false }],
    'no-multiple-empty-lines': ['warn', { max: 1 }],
    'no-trailing-spaces': ['warn'],
    'no-mixed-spaces-and-tabs': ['warn'],
    camelcase: ['warn'],
    indent: ['warn', 2],
    'linebreak-style': [
      'warn',
      'unix',
    ],
    quotes: [
      'warn',
      'single',
    ],
    semi: [
      'warn',
      'never',
    ],
    'no-console': ['warn'],
    'no-alert': ['warn'],
  },
}
