# fis3-lint-noob-eslint

noob lab（菜鸟实验室）出品，基于fis3的eslint自动检测插件
![](https://img.shields.io/npm/v/fis3.svg) ![](https://img.shields.io/npm/dm/fis3.svg)
## 安装

```nodejs
npm install fis3-lint-noob-eslint -g
```

## 使用示例
在fis-config.js中配置如下：
```
var config = {
    "ignoreFiles":["fis-config.js"],
    envs: ['es6'],
    globals: ['fis'],
    rules: {
       "accessor-pairs": "error",
       "arrow-spacing": ["error", { "before": true, "after": true }],
       "block-spacing": ["error", "always"],
       "brace-style": ["error", "1tbs", { "allowSingleLine": true }],
       "camelcase": ["error", { "properties": "never" }],
       "comma-dangle": ["error", {
       "arrays": "never",
       "objects": "never",
       "imports": "never",
       "exports": "never",
       "functions": "never"
       }]
    }
}

fis.match('*.js', {
    lint: fis.plugin('noob-eslint', config)
})

```
>在自定义config中的属性会覆盖插件的默认配置

config是对eslint的自定义配置文件。具体配置可以参考[Configuring ESLint](http://eslint.org/docs/user-guide/configuring)

```
fis.match('*.js', {
    lint: fis.plugin('noob-eslint')
})
```
>大部分情况下使用默认配置就行，如有特殊情况可以配置自定义config

在不传config的情况下，插件默认使用[feross](https://github.com/feross)的[standard](https://github.com/feross/standard)标准

## standard标准外的默认配置
```
{
  "ignoreFiles":["fis-config.js"],
  "useEslintrc": false,
  "envs": ["es6", "browser", "node", "commonjs", "amd"],
  "globals": [
    "__inline",
    "__uri",
    "__RESOURCE_MAP__",
    "fis"
  ],
  "rules": {}, // 遵循standard标准，已默认配置
  "plugins": [] // 遵循standard标准，已默认配置
}
```
