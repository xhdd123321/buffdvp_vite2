# buffdvp_vite2

数据可视化平台BuffDVP前端源码

基于最新vue全家桶搭建：Vue3 + Vite2 + pinia + vue-router + axios

代码规范：eslint + standard

组件库： element-plus + arco-design

包管理工具： npm + yarn

## 开发环境部署

```shell
git clone xxx   # 拉取项目

cd buffdvp_vite2    # 进入项目根目录

yarn    # 安装依赖

vite    # dev环境启动项目
```

## 后端接入

项目未使用mock模拟api，需要实现后端接口或使用配套后端

`vite.config.js`配置代理，解决开发环境同源问题

生产环境下使用Nginx代理解决同源问题