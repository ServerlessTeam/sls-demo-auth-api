module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'import',
    'unused-imports', // Auto remove unused imports
    'prettier',
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'no-await-in-loop': 'off',
    'no-restricted-syntax': 'off',
    'no-underscore-dangle': 'off',
    'no-console': 'off',
    // 'no-param-reassign': [
    //   'error',
    //   {
    //     props: true,
    //     ignorePropertyModificationsFor: ['_opts'],
    //   },
    // ],
    '@typescript-eslint/naming-convention': [
      'error',
      // Enforce that all variables, functions and properties follow are camelCase
      {
        selector: 'variableLike',
        format: ['camelCase'],
        leadingUnderscore: 'allow',
        filter: {
          regex: '^npm_',
          match: false,
        },
      },
      // Enforce that boolean variables are prefixed with 'is' or 'has'
      // when added prefix, ESLint will trim the prefix and check the format, so PascalCase needed
      {
        selector: 'variable',
        format: ['PascalCase'],
        types: ['boolean'],
        prefix: ['is', 'has'],
        leadingUnderscore: 'allow',
      },
      // Allow that const variables can be UPPER_CASE or camelCase
      {
        selector: 'variable',
        modifiers: ['const'],
        format: ['camelCase', 'UPPER_CASE'],
        leadingUnderscore: 'allow',
        filter: {
          regex: '^npm_',
          match: false,
        },
      },
      // Enforce that class, interface, type and enum  follow are PascalCase
      { selector: 'typeLike', format: ['PascalCase'] },
      // Enforce that interface names do not begin with an I
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: false,
        },
      },
      { selector: 'enumMember', format: ['UPPER_CASE'] },
    ],
    'unused-imports/no-unused-imports': 'warn',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    // Conflict with sort-imports-es6 plugin
    'import/order': 'off',
    // For Typescript, it is better not to use default export: https://stackoverflow.com/a/33307487/11440474
    'import/prefer-default-export': 'off',
    // Conflict with alias path
    'import/extensions': 'off',
    // Not enforce using 'this' in a class function since some function can be a pure function
    'class-methods-use-this': 'off',
  },
};
