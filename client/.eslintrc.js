module.exports = {
  env: {
    browser: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    tsconfigRootDir: __dirname
  },
  plugins: ['unicorn', '@typescript-eslint'],
  extends: [
    'next/core-web-vitals',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:unicorn/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ]
}
