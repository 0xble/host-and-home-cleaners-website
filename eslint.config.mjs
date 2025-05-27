import antfu from '@antfu/eslint-config'

export default antfu({
  type: 'app', // Type of the project. 'lib' for libraries, the default is 'app'
  typescript: {
    // You can optionally enable the type aware rules by passing the options object to the typescript config.
    tsconfigPath: 'tsconfig.json',
  },
  // react: true, // To enable React support, you need to explicitly turn it on
  rules: {
    'no-console': 'off',
    'node/prefer-global/process': 'off',
    'unicorn/prefer-node-protocol': 'off',
  },
})
