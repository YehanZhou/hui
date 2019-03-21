<template>
  <div class="side-nav">
    <ul>
      <li>
        <router-link to="/layout">layout 布局</router-link>
      </li>
      <li>
        <router-link to="/icon">icon 图标</router-link>
      </li>
      <li>
        <router-link to="/button">button 按钮</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'SideNav',
    props: {
      data: Array,
      base: {
        type: String,
        default: ''
      }
    }
  };
</script>
<style lang="scss" scoped>
.side-nav {
  ul {
    width: 250px;
    margin: 0;
    padding: 0;
    li {
      margin: 0;
      list-style: none;
      padding: 0;
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: pointer;
      a {
        font-size: 16px;
        color: #333;
        line-height: 40px;
        height: 40px;
        margin: 0;
        padding: 4px 25px;
        text-decoration: none;
        display: block;
        position: relative;
        -webkit-transition: 0.15s ease-out;
        transition: 0.15s ease-out;
        font-weight: 700;
        border-right: 1px solid #e8e8e8;
        &:hover {
          color: #4598F0;
        }
      }
    }
  }
}
.side-nav ul li.main--link-group {
  height: auto;
}
.side-nav ul li.main--link-group a:hover {
  color: #333;
  cursor: default;
}
.side-nav ul li.main--link-group ul a {
  display: block;
  height: 40px;
  color: #444;
  line-height: 40px;
  font-size: 14px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: 400;
}
.side-nav ul li.main--link-group ul a:hover {
  color: #4598F0;
  cursor: pointer;
}
</style>
