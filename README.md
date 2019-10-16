# vue-demo

> a demo

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```


```
.
├── build                                       // webpack配置文件
│
├── config                                      // 项目打包路径
│
├── src                                         // 源码目录
│   ├── components                              // 组件
│   │   ├── common                              // 公共组件
│   │   │   ├── Test.vue                        // 模板文件，用于新建.vue
│   │   │   ├── Composition.vue                 // 大小可拖动修改的布局（水平或垂直）
│   │   │   ├── ScrollView.vue                  // 统一滚动条的view
│   │   │
│   │   ├── footer                              // 底部公共组件
│   │   │   ├──
│   │   │
│   │   ├── header                              // 头部公共组件
│   │   │   ├── Header.vue
│   │   │
│   │   ├── lefter                              // 左侧公共组件
│   │   │   ├── MenuUi.vue                      // 菜单UI
│   │   │   ├──
│   │   │
│   │   └── righter                             //右侧部公共组件
│   │       ├──
│   │
│   ├── config                                  // 基本配置
│   │   ├── axios.js                            // axios获取数据
│   │   ├── filters.js                          // 过滤器统一配置
│   │   ├── data                                // 获取数据的统一调配文件，对接口进行统一管理
│   │   └── rem.js                              // 根据显示器设定rem
│   │
│   ├── images                                  // 公共图片
│   │
│   ├── pages                                   // 页面
│   │   ├──

│   ├── plugins                                 // 引用的插件
│   │
│   ├── router
│   │   ├── config.js                           // 路由配置生成方法
│   │   ├── index.js                            // 路由总配置
│   │   └── pages.js                            // 页面引入
│   │
│   ├── store                                   // vuex的状态管理
│   │   ├── action.js                           // 全局actions
│   │   ├── getters.js                          // 全局getters
│   │   ├── index.js                            // 引用vuex，创建store
│   │   ├── modules                             // store模块
│   │   │   ├── xxxx                            //
│   │   │
│   │   ├── store-types.js                   // 定义常量muations名
│   │   └── mutations.js                        // 配置mutations
│   │
│   ├── style
│   │   ├── common.css                          // 公共样式文件
│   │   ├── css.js                              // 样式引用配置
│   │   └──
│   │
│   ├── App.vue                                 // 页面入口文件
│   │
│   └── main.js                                 // 程序入口文件，加载各种公共组件
│
├── static
│   └── favicon.ico                             // 图标
│
├── index.html                                  // 入口html文件


```