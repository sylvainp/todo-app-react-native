module.exports = {
  root: true,
  env: {
    "jest/globals": true
  },
  extends: [
    '@react-native-community',
    'prettier',
    'plugin:jest/recommended',
    'airbnb,',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier', 'jest'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'prettier/prettier': 'error',
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        "jest/prefer-expect-assertions": ['error']
      },
    },
  ],
};
