module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    'jest/globals': true,
  },
  globals: {
    device: false,
    expect: false,
    waitFor: false,
    element: false,
    by: false,
  },
  parser: 'babel-eslint',
  extends: [
    '@react-native-community',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:react-hooks/recommended',
  ],
  plugins: ['jsx-a11y', 'prettier', 'import', 'react-hooks'],
  rules: {
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'parent', 'index', 'sibling'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'prettier/prettier': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  settings: {
    'import/resolver': {
      alias: {
        extensions: ['.js', '.jsx', '.json'],
      },
    },
    'import/ignore': ['react-native'],
  },
};
