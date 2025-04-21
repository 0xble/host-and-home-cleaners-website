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
  },
})
