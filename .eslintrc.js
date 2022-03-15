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
    // 强制在单行元素的内容前后加换行符
    'vue/singleline-html-element-content-newline': 'off',
    // 该规则强制在多行元素的内容前后换行。
    'vue/multiline-html-element-content-newline': 'off'
  }
}
