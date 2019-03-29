# react ssr app

手动一步步搭建 react 服务端渲染。

## 起步

项目中用到了 prettier 和 editorconfig 来自动格式化代码，因此需要安装这两个编辑器插件。

prettier 根据 eslint 规则配置的，所以类如缺少空格、缺少分号、强制单引号等与 format 风格有关的 eslint 错误都能用 prettier 解决。建议将编辑器设置为保存时自动格式化，这将可以减少开发时在代码格式化风格调整上花的时间。

同时建议安装 eslint 编辑器插件，它会提供友好的 eslint 错误提示（红色波浪线的提示）。

本地启动项目：

```bash
# 先启动客户端
npm run start:client

# 客户端启动完毕后，重开一个shell，再启动服务端
npm run start:server
```

项目打包：

```bash
npm run build
```
