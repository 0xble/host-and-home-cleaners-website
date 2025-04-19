import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  rules: {
    'node/prefer-global/process': 'off', // Allow using `process.env`
    'no-alert': 'off',
    'no-fallthrough': 'error', // Prevent switch statement fallthroughs
    'ts/restrict-template-expressions': [
      'error',
      {
        /** Whether to allow `any` typed values in template expressions. */
        allowAny: true,
        /** Whether to allow `array` typed values in template expressions. */
        allowArray: false,
        /** Whether to allow `boolean` typed values in template expressions. */
        allowBoolean: false,
        /** Whether to allow `never` typed values in template expressions. */
        allowNever: false,
        /** Whether to allow `nullish` typed values in template expressions. */
        allowNullish: false,
        /** Whether to allow `number` typed values in template expressions. */
        allowNumber: true,
        /** Whether to allow `regexp` typed values in template expressions. */
        allowRegExp: true,
      },
    ],
    'ts/no-use-before-define': 'off',
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
