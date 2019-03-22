## Container 布局容器

用于布局的容器组件，方便快速搭建页面的基本结构：

`<h-container>`：外层容器。当子元素中包含 `<h-header>` 或 `<h-footer>` 时，全部子元素会垂直上下排列，否则会水平左右排列。

`<h-header>`：顶栏容器。

`<h-aside>`：侧边栏容器。

`<h-main>`：主要区域容器。

`<h-footer>`：底栏容器。

:::tip
以上组件采用了 flex 布局，使用前请确定目标浏览器是否兼容。此外，`<h-container>` 的子元素只能是后四者，后四者的父元素也只能是 `<h-container>`。
:::

### 常见页面布局

:::demo 常见页面布局

```html
<h-container>
  <h-header>Header</h-header>
  <h-main>Main</h-main>
</h-container>

<h-container>
  <h-header>Header</h-header>
  <h-main>Main</h-main>
  <h-footer>Footer</h-footer>
</h-container>

<h-container>
  <h-aside width="200px">Aside</h-aside>
  <h-main>Main</h-main>
</h-container>

<h-container>
  <h-header>Header</h-header>
  <h-container>
    <h-aside width="200px">Aside</h-aside>
    <h-main>Main</h-main>
  </h-container>
</h-container>

<h-container>
  <h-header>Header</h-header>
  <h-container>
    <h-aside width="200px">Aside</h-aside>
    <h-container>
      <h-main>Main</h-main>
      <h-footer>Footer</h-footer>
    </h-container>
  </h-container>
</h-container>

<h-container>
  <h-aside width="200px">Aside</h-aside>
  <h-container>
    <h-header>Header</h-header>
    <h-main>Main</h-main>
  </h-container>
</h-container>

<h-container>
  <h-aside width="200px">Aside</h-aside>
  <h-container>
    <h-header>Header</h-header>
    <h-main>Main</h-main>
    <h-footer>Footer</h-footer>
  </h-container>
</h-container>

<style>
  .h-header,
  .h-footer {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .h-aside {
    background-color: #d3dce6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .h-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .h-container {
    margin-bottom: 40px;
  }

  .h-container:nth-child(5) .h-aside,
  .h-container:nth-child(6) .h-aside {
    line-height: 260px;
  }

  .h-container:nth-child(7) .h-aside {
    line-height: 320px;
  }
</style>
```

:::

### Container Attributes

| 参数      | 说明             | 类型   | 可选值                | 默认值                                                               |
| --------- | ---------------- | ------ | --------------------- | -------------------------------------------------------------------- |
| direction | 子元素的排列方向 | string | horizontal / vertical | 子元素中有 `h-header` 或 `h-footer` 时为 vertical，否则为 horizontal |

### Header Attributes

| 参数   | 说明     | 类型   | 可选值 | 默认值 |
| ------ | -------- | ------ | ------ | ------ |
| height | 顶栏高度 | string | —      | 60px   |

### Aside Attributes

| 参数  | 说明       | 类型   | 可选值 | 默认值 |
| ----- | ---------- | ------ | ------ | ------ |
| width | 侧边栏宽度 | string | —      | 300px  |

### Footer Attributes

| 参数   | 说明     | 类型   | 可选值 | 默认值 |
| ------ | -------- | ------ | ------ | ------ |
| height | 底栏高度 | string | —      | 60px   |
