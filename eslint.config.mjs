import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  rules: {
    'node/prefer-global/process': 'off', // Allow using `process.env`,
    'no-alert': 'off',
    'no-console': 'off',
  },
})
