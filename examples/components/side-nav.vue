<template>
  <div class="side-nav">
    <ul>
      <li
        class="nav-item"
        v-for="(item,i) in navs"
        :key="i"
      >
        <router-link
          v-if="item.path"
          :to="item.path"
          exact
          v-text="item.name"
        >
        </router-link>
        <a v-else>{{item.name}}</a>
        <template v-if="item.groups">
          <div
            class="nav-group"
            v-for="(group, key) in item.groups"
            :key="key"
          >
            <div class="nav-group__title">{{group.groupName}}</div>
            <ul class="pure-menu-list">
              <li
                class="nav-item"
                v-for="(navItem, key) in group.list"
                :key="key"
              >
                <router-link
                  :to="navItem.path"
                  exact
                  v-text="navItem.title"
                ></router-link>
              </li>
            </ul>
          </div>
        </template>
      </li>
    </ul>
  </div>
</template>
<script>
import navs from '../config/nav.config.js'

export default {
  name: 'SideNav',
  data() {
    return {
      navs: navs.CN
    }
  }
}
</script>
<style lang="scss" scoped>
.side-nav {
  width: 250px;
  box-sizing: border-box;
  padding-right: 30px;

  li {
    list-style: none;
  }

  ul {
    padding: 0;
    margin: 0;
    overflow: hidden;
  }

  > ul > .nav-item > a {
    margin-top: 15px;
  }

  > ul > .nav-item:nth-child(-n + 4) > a {
    margin-top: 0;
  }

  .nav-item {
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
      transition: 0.15s ease-out;
      font-weight: bold;
      border-right: 1px solid #e8e8e8;
      &.active {
        color: #409eff;
      }
    }

    .nav-item {
      a {
        display: block;
        height: 40px;
        color: #444;
        line-height: 40px;
        font-size: 14px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-weight: normal;
        &:hover,
        &.active {
          color: #409eff;
        }
      }
    }
  }

  .nav-group__title {
    font-size: 12px;
    color: #999;
    line-height: 26px;
    padding: 4px 25px;
    border-right: 1px solid #e8e8e8;
  }
}
</style>
