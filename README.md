# 说明

## 前置环境配置

- ~~项目使用Vue-CLI搭建，想要运行，请先安装 node.js + Vue CLI~~
- ~~Vue CLI官网：[Home | Vue CLI (vuejs.org)](https://cli.vuejs.org/zh/)~~

>  为了兼容性和更轻量，本项目从VueCli搭建迁移到Vite搭建

- 步骤
  - 安装 node.js: [Node.js (nodejs.org)](https://nodejs.org/en)
  - 安装 Vite (作者用的npm): [Vite | 下一代的前端工具链 (vitejs.cn)](https://vitejs.cn/vite3-cn/)

### 1. git clone 本项目到本地

### 2. 项目依赖安装

```
npm install
```

### 3. 运行

```
npm run dev
```

- 成功后直接在浏览器进入local url即可

![runProject](/img/1.png)



## 效果：

- 最终版展示

  ![FinalVersion](/img/demo.gif)

- 初版

  - 可缩放，拖动

  - 可多选显示

  - 不同类别颜色区分

  - 动图展示

    ![Version1](/img/show1.gif)

- 2版

  - 增加鼠标hover效果

    - 显示消息框展示properties
    - 对应元素变色，好观察

  - 动图展示

    ![Version2](./img/show2.gif)

- 3版

  - 增加对road_sec_id属性的突出显示

  - 改变’路段”的值进行选择，范围为 [0,134], 0 表示全选

    ![Version3](./img/show3.gif)
