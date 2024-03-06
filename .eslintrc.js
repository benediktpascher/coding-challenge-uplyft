module.exports = {
  extends: ['airbnb-typescript/base'],
  env: {
    node: true,
  },
  rules: {
    'import/prefer-default-export': 'warn',
    'max-len': ['error', {
      code: 120,
      ignoreComments: true,
      ignoreTrailingComments: true,
      ignoreStrings: true,
    }],
    'no-console': 0,
  }
};
