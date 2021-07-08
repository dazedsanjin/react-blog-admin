/*
 * @Author: shaoqing
 * @Date: 2021-06-25 17:35:04
 * @LastEditTime: 2021-07-08 17:36:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-blog\.eslintrc.js
 */
module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'airbnb-base', // 包含所欲ES6+ 规范
    'plugin:react/recommended' // react jsx 规范支持
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  parser: 'babel-eslint',
  plugins: [],
  rules: {
    'consistent-return': 0, // 箭头函数不强制return
    semi: 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'react/jsx-uses-react': 'error', // 防止react被错误地标记为未使用
    'react/jsx-uses-vars': 'error',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/jsx-key': 2, // 在数组或迭代器中验证JSX具有key属性
    'import/no-dynamic-require': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-named-as-default': 0,
    'import/no-webpack-loader-syntax': 0,
    'import/prefer-default-export': 0,
    'react/react-in-jsx-scope': 0,
    'import/no-named-as-default-member': 0,
    'no-param-reassign': 0,
    'arrow-body-style': [2, 'as-needed'], // 箭头函数
    'class-methods-use-this': 0, // 强制类方法使用 this
    // Indent props with 4 spaces
    'react/jsx-indent-props': 0,
    'no-console': 0, // 不禁用console
    'react/jsx-props-no-spreading': 0,
    'prefer-destructuring': 0,
    'linebreak-style': 0,
    'comma-dangle': 0,
    'max-len': 0,
    'object-curly-newline': 0,
    'react/prop-types': 0,
    'no-plusplus': 0,
    'no-unused-expressions': 0,
    'func-names': 0,
    'operator-linebreak': 0,
    'import/no-unresolved': [
      2,
      {
        ignore: ['^@/'] // @ 是设置的路径别名
      }
    ]
  },
  settings: {
    'import/resolve': {
      webpack: {
        config: 'config/webpack.dev.js'
      }
    },
    react: {
      version: 'detect'
    }
  }
}
