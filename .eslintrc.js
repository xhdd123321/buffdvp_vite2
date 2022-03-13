module.exports = {
  env: {
    browser: true,
    es2021: true,
    'vue/setup-compiler-macros': true
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'standard'
  ],
  parserOptions: {
    ecmaVersion: '2021',
    sourceType: 'module'
  },
  plugins: [
    'vue'
  ],
  rules: {
  }
}
