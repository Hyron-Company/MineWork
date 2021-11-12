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
  ],
  rules: {
    'unicorn/filename-case': [
      'error',
      {
        cases: {
          camelCase: true,
          pascalCase: true,
          kebabCase: true
        }
      }
    ],
    'unicorn/prevent-abbreviations': [
      'error',
      {
        allowList: {
          getInitialProps: false
        },
        replacements: {
          props: {
            properties: false
          }
        }
      }
    ],
    'unicorn/no-null': 'off',
    'unicorn/prefer-query-selector': 'off',
    'react/no-unescaped-entities': 'off',
    '@typescript-eslint/indent': 'off'
  }
}
