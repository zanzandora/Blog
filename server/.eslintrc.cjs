// .eslintrc.cjs
module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:node/recommended',
    'plugin:promise/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module', // Quan trọng: chỉ định ES Modules
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'import', 'node', 'promise'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    'node/no-missing-import': 'off',
    // Đặc biệt quan trọng khi dùng ES Modules:
    'node/no-unsupported-features/es-syntax': [
      'error',
      { ignores: ['modules'] }, // Cho phép sử dụng ES Modules
    ],
    'import/no-unresolved': 'off',
    'no-unused-vars': 'off',
  },
  settings: {
    'import/resolver': {
      typescript: {},
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
