# fis3-lint-noob-eslint

[noob lab](https://github.com/Noob-Lab)（菜鸟实验室）出品，基于fis3的eslint自动检测插件

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

## 查看文件版本
命令行中输入如下命令：
```
noob-eslint
```

## 注意事项
- 因为fis3对文件对象中每一个文件进行单文件编译。当开起文件监听模式的时候，每次修改后保存，只会编译此时发生保存动作的这个文件，所以只会输出一个文件的检查结果。
- 而如果保存动作发生在fis-config.js文件中时，fis3会将所有命中文件相继编译一遍，此时会输出所有文件的检查结果。同理，开启文件监听模式在刚`release`时会输出所有命中文件检查结果，之后只会输出发生保存动作的文件的检查结果
- 本插件使用的是fis3提供的lint插件扩展点。此扩展点比较特殊，要触发此扩展点需要在`release`的时候添加`-l`参数，所以要打开文件监听，页面自刷新和代码检查需用以下命令：
```
fis3 release -wLl
```