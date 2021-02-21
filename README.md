vue@2.6.6
vue-cli@3.0
node@9.10.0

创建项目

> npm i -g @vue/cli
> vue create xxx

axios@0.18.0
vue-axios@2.1.4
vue-cookie@1.1.4
vue-router@3.0.2
weixin-js-sdk@1.3.2

架构设计
目录结构定义
公共函数编写
开发规范定义
环境配置、统一请求处理、错误机制、loading 机制
封装组件

启动项目

> yarn serve

#### h5 响应式方案

##### pc

- 媒体查询
- flex、百分比
- 栅格布局

##### 移动端 h5

- 字体大小
- 元素大小、布局
- 元素边距、内填充
- rem+flex
- 媒体查询+百分比+flex
- lib-flexible

##### rem 布局方案

- viewport
- 物理像素和页面像素
- 设计尺寸和开发尺寸

1. 动态改变 html 的 font-size,页面元素使用 rem 布局
2. 设置基准值为 100px，那么 1rem 就等于 100px
3. 由于网页默认打开都是 16px，所以基于 750 的 UI 图，html font-size 应该设置为 `屏幕宽度/750 * 100`
