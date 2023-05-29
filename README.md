# 说明

## 项目环境配置

- 项目使用Vue-CLI搭建，想要运行，请先安装 node.js + Vue CLI
- Vue CLI官网：[Home | Vue CLI (vuejs.org)](https://cli.vuejs.org/zh/)

### 项目依赖安装

- 如果就是直接打开我发的整个压缩包，这步可忽略

```
npm install
```

### 运行

```
npm run serve
```

- 成功后直接在浏览器进入local url即可

<img src="C:\Users\11731\AppData\Roaming\Typora\typora-user-images\image-20230526232354791.png" alt="image-20230526232354791" style="zoom:67%;" align="left"/>

## 代码

- 完成画SVG图的 d3 代码装在 MapComponent.vue 中，由RoadMap.vue调用，其他的跟Vue相关，可以不管

```
│  App.vue
│  main.js
│  router.js
│
├─assets
│      logo.png
│
├─components
│  ├─roadData
│  │      *MapComponent.vue 
│  │
│  └─ui
│          BaseButton.vue
│          BaseCard.vue
│
└─pages
        *RoadMap.vue  
        WelcomePage.vue
```



## 效果：

- 可缩放，拖动

- 可多选显示

- 不同类别颜色区分

- 动图展示

  ![20230527001545_rec_](C:\Users\11731\AppData\Roaming\LarkShell\screenshot\20230527001545_rec_.gif)
