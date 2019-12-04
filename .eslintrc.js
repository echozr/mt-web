module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  rules: {
    'no-const-assign':0,
    'no-unused-vars': 0,
    'nuxt/no-cjs-in-config': 'off',
    "vue/singleline-html-element-content-newline": "off",
    'vue/html-indent':"off",
    "no-console": 0,
    "indent": ["error", 4],
    "space-before-function-paren": 0,
    "no-restricted-syntax": [
      "error",
      {
          "selector": "CallExpression[callee.object.name='console'][callee.property.name=/^(log|warn|error|info|trace)$/]",
          "message": "Unexpected property on console object was called"
      }
    ]
  }
}
