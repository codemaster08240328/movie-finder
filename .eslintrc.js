module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended'],
  plugins: [],
  // add your custom rules here
  rules: {
    quotes: [1, 'single', 'avoid-escape'],
    'comma-dangle': ['error', 'only-multiline'],
    semi: ['error', 'always'],
    'space-before-function-paren': ['warning', 'never'],
    'vue/singleline-html-element-content-newline': ['warning', 'ignore'],
    'arrow-parens': ['warning', 'as-needed'],
  },
};
