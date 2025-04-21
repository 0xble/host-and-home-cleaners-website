import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true, // Enable code formatting rules
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  rules: {
    // Allow using `process.env` directly without global declaration
    'node/prefer-global/process': 'off',

    // Allow using window.alert, window.confirm, window.prompt
    'no-alert': 'off',

    // Allow using console.log
    'no-console': 'off',

    // Prevent accidental fall-through in switch statements
    'no-fallthrough': 'error',

    // Prevent imports that reach up to parent directories using '../'
    'import/no-relative-parent-imports': 'error',

    // Prevent relative imports from packages in node_modules
    'import/no-relative-packages': 'error',

    // Prevent all relative imports
    'no-restricted-imports': ['error', {
      patterns: [{
        group: ['./*', '../*', '../../*', '../../../*', '../../../../*'],
        message: 'Please use absolute imports instead of relative imports',
      }],
    }],

    // Disable requirement to use 'node:' protocol for Node.js built-in modules
    'unicorn/prefer-node-protocol': 'off',

    'ts/no-floating-promises': [
      'error',
      {
        allowForKnownSafeCalls: [],
        allowForKnownSafePromises: [],
        checkThenables: false,
        ignoreIIFE: false,
        ignoreVoid: true,
      },
    ],
    'ts/require-await': 'error',
    'ts/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '_',
        varsIgnorePattern: '_',
      },
    ],
    'ts/strict-boolean-expressions': [
      'error',
      {
        /** Whether to allow `any`s in a boolean context. */
        allowAny: true,
        /** Whether to allow nullable `boolean`s in a boolean context. */
        allowNullableBoolean: true,
        /** Whether to allow nullable `enum`s in a boolean context. */
        allowNullableEnum: true,
        /** Whether to allow nullable `number`s in a boolean context. */
        allowNullableNumber: false,
        /** Whether to allow nullable `object`s, `symbol`s, and functions in a boolean context. */
        allowNullableObject: true,
        /** Whether to allow nullable `string`s in a boolean context. */
        allowNullableString: true,
        /** Whether to allow `number`s in a boolean context. */
        allowNumber: false,
        /** Whether to allow `string`s in a boolean context. */
        allowString: true,
      },
    ],
  },
})
