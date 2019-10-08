# Spring
Spring应用的前端项目，本项目为上海纽约大学2019秋季学期 *Software Engineering* 课程小组项目。

## 技术栈

基本框架：TypeScript + React

样式表：Less

状态管理：Mobx

打包：Webpack

## 安装

推荐使用 `yarn` 作为包管理工具，[下载地址](https://yarnpkg.com/en/docs/install)

```bash
yarn # 安装依赖
```

### 开发环境下使用，启动热模块重载(HMR)功能

```bash
yarn dev
```

### 生产环境下使用，打包出压缩后的文件

```bash
yarn build
```

### 删除依赖

```bash
yarn clean
```

## 项目结构

* `index.tsx` 项目的主入口
* `App.tsx` 根组件
* `assets` 存放静态文件（图片、音频、视频）等的文件夹
* `components` 与业务无关的通用组件
* `biz-components` 业务组件，只有它可以用Store
* `pages` 页面组件，一个页面组件对应一个路由
* `stores` 状态管理，用来存储数据
* `styles` 通用的样式表
* `constants` 常量，可以存放一些 `type` , `enum` , `interface` 之类的东西
* `utils` 工具函数
