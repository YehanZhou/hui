# HUI

> 签到统计 web 端 UI 组件

## 安装 Yarn

```bash
# 用淘宝的镜像安装yarn
npm install -g yarn --registry=https://registry.npm.taobao.org

# 将yarn的源改成淘宝的
yarn config set registry 'https://registry.npm.taobao.org'
```

## 代码格式化

`package.json` 已有 prettier 依赖，`.vscode` 里已经修改了 vscode 相关设置，
只需在 vscode 里安装 prettier-code formatter 和 vetur 插件，即可保存时自动格式化代码。

## 构建方式

```bash
# install dependencies
yarn install

# serve with hot reload at localhost:8080
npm run start

# build for production with minification
npm run build
```
