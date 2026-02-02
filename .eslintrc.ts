import lit from 'eslint-plugin-lit'
// import litA11y from 'eslint-plugin-lit-a11y'
import tsParser from '@typescript-eslint/parser'

/** @type {import('eslint').Linter.Config[]} */
export default [
  // 1. Setup global ignores
  {
    ignores: ['dist/', 'node_modules/']
  },

  // 2. Gunakan config recommended bawaan lit (Ini otomatis mendaftarkan plugin 'lit')
  lit.configs['flat/recommended'],

  // 3. Konfigurasi untuk lit-a11y dan rules custom kamu
  {
    files: ['**/*.js', '**/*.ts'],
    // plugins: {
    //   // Kita tidak mendaftarkan 'lit' lagi di sini karena sudah ada di nomor 2
    //   'lit-a11y': litA11y,
    // },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tsParser,
    },
    rules: {
      // Rekomendasi rules a11y (karena versi 'next' seringkali belum punya flat config utuh)
      // ...(litA11y.configs?.recommended?.rules || {}),

      // Sisipan rule custom kamu
      'lit/no-invalid-html': 'error',
      'lit/no-property-change-update': 'warn',
      'lit/no-template-map': 'error',
      'lit/prefer-nothing': 'error',
      'lit/no-useless-template-literals': 'error',
      'lit/no-invalid-escape-sequences': 'error',
      'lit/no-duplicate-template-bindings': 'error',
      'lit/quoted-expressions': ['error', 'always'],
    },
  },

  // 4. Aturan spesifik TypeScript & Style
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      'comma-dangle': ['error', 'always-multiline'],
      'prefer-template': ['error'],
      'no-multi-spaces': ['error', { ignoreEOLComments: false }],
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'no-trailing-spaces': ['error'],
      'no-mixed-spaces-and-tabs': ['error'],
      'camelcase': ['error'],
      'indent': ['error', 2],
      'linebreak-style': ['error', 'unix'],
      'quotes': ['error', 'single'],
      'semi': ['error', 'never'],
      'no-console': ['warn'],
      'no-alert': ['warn'],
    },
  },
]
