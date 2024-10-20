// @ts-check
import eslint from '@eslint/js'
// @ts-expect-error Could not find declaration files
import jsxA11y from 'eslint-plugin-jsx-a11y'
import react from 'eslint-plugin-react'
// @ts-expect-error Could not find declaration files
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default [
  // Use ESLint recommended configuration
  eslint.configs.recommended,
  // Use React recommended configuration
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  // Use JSX Accessibility recommended configuration
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  jsxA11y.flatConfigs.recommended,
  // Use TypeScript ESLint recommended configuration
  // This includes a set of recommended rules for TypeScript codebases
  ...tseslint.configs.recommendedTypeChecked,
  // Use Next.js recommended configuration
  {
    languageOptions: {
      ...react.configs.flat.recommended.languageOptions,
      ecmaVersion: 'latest', // Use the latest ECMAScript features (ES2022 as of 2023)
      sourceType: 'module', // Treat files as ECMAScript modules (allows import/export)
      parser: tseslint.parser, // Use TypeScript ESLint parser for TypeScript files
      parserOptions: {
        project: 'tsconfig.json', // Specify the TypeScript configuration file
        tsconfigRootDir: import.meta.dirname, // Add this line to specify the root directory
        projectService: true, // Enable TypeScript's type checking service
        ecmaFeatures: {
          jsx: true, // Enable parsing of JSX syntax
        },
      },
      globals: {
        ...globals.serviceworker, // Include service worker global variables and types
        ...globals.browser, // Include browser global variables and types
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin, // Add TypeScript-specific linting rules
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      'react-hooks': reactHooksPlugin, // Add React Hooks linting rules
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect the React version
      },
    },
    rules: {
      // Allow let for destructuring even if not all variables are reassigned
      'prefer-const': [
        'warn',
        {
          destructuring: 'all',
          ignoreReadBeforeAssign: false,
        },
      ],
      'no-useless-escape': 'warn', // Warn about unnecessary escape characters
      // Require async functions to have an await expression
      '@typescript-eslint/require-await': 'error',
      // Disallow floating promises (unhandled promise rejections)
      // IIFE and void operator usage are allowed
      '@typescript-eslint/no-floating-promises': [
        'error',
        {
          ignoreIIFE: true,
          ignoreVoid: true,
        },
      ],
      // Allow inferrable types to be explicitly specified
      '@typescript-eslint/no-inferrable-types': 'off',
      // Disallow unused variables, but ignore if they start with underscore
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '_',
          varsIgnorePattern: '_',
        },
      ],
      // Disallow confusing void expressions
      // This rule disallows the use of void operator in confusing locations
      '@typescript-eslint/no-confusing-void-expression': ['error'],
    },
    ignores: [
      '.*',
      '.next/*',
      'artifacts',
      'build',
      'cache',
      'coverage',
      'dist',
      'node_modules',
      'types',
      '*.env',
      '*.log',
      'bun.lockb',
      'coverage.json',
      'package-lock.json',
      'pnpm-lock.yaml',
      'yarn.lock',
    ],
  },
]
