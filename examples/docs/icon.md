## Icon 图标

提供了一套常用的图标集合。

### 使用方法

:::demo 直接通过设置类名为 `h-icon-iconName` 来使用即可。例如：

```html
<i class="h-icon-edit"></i>
<i class="h-icon-share"></i>
<i class="h-icon-delete"></i>
<h-button type="primary" icon="h-icon-search">搜索</h-button>
```

:::

### 图标集合

<ul class="icon-list">
  <li v-for="name in ['info','error','success','warning','question','back','arrow-left','arrow-down','arrow-right','arrow-up','caret-left','caret-bottom','caret-top','caret-right','d-arrow-left','d-arrow-right','minus','plus','remove','circle-plus','remove-outline','circle-plus-outline','close','check','circle-close','circle-check','circle-close-outline','circle-check-outline','zoom-out','zoom-in','d-caret','sort','sort-down','sort-up','tickets','document','goods','sold-out','news','message','date','printer','time','bell','mobile-phone','service','view','menu','more','more-outline','star-on','star-off','location','location-outline','phone','phone-outline','picture','picture-outline','delete','search','edit','edit-outline','rank','refresh','share','setting','upload','upload2','download','loading']" :key="name">
    <span>
      <i :class="'h-icon-' + name"></i>
      <span class="icon-name">{{'h-icon-' + name}}</span>
    </span>
  </li>
</ul>
