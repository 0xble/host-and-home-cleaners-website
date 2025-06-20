import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: ['**/*.md'],
  formatters: true,
  typescript: {
    tsconfigPath: 'tsconfig.json',
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

    // Disable requirement to use 'node:' protocol for Node.js built-in modules
    'unicorn/prefer-node-protocol': 'off',
  },
  // TypeScript-specific rules in a separate override
  overrides: {
    files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
    rules: {
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
          allowAny: true,
          allowNullableBoolean: true,
          allowNullableEnum: true,
          allowNullableNumber: false,
          allowNullableObject: true,
          allowNullableString: true,
          allowNumber: false,
          allowString: true,
        },
      ],
    },
  },
})
