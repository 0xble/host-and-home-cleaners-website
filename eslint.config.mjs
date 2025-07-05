// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    // Base config
    rules: {
      'no-console': 'off',
      'no-alert': 'off',
      'node/prefer-global/process': 'off',
      'unicorn/prefer-node-protocol': 'off',
      'no-extra-boolean-cast': 'off',
      'no-cond-assign': ['error', 'except-parens'],
    },
    typescript: {
      tsconfigPath: 'tsconfig.json',
    },
  },
  {
    // React specific overrides
    files: ['**/*.tsx'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: ['node:*'],
        },
      ],
    },
  },
  {
    // TypeScript specific overrides
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      'ts/strict-boolean-expressions': [
        'error',
        {
          allowNullableBoolean: true,
          allowNullableObject: true,
          allowNullableString: true,
          allowString: true,
        },
      ],
    },
  },
)
