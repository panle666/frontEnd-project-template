<template>
  <div id="header">
    <div id="navigator">
      <ul id="navList">
        <li>
          <a id="blog_nav_sitehome" class="menu" href="/"> InLife.Ink</a>
        </li>
        <li>
          <a id="blog_nav_myhome" class="menu" href="/"> 首页</a>
        </li>
        <li><a class="menu" href="https://github.com/panle666"> github</a></li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue-demi";

let msg = ref("head");
</script>

<style lang="less" scoped>
  #header {
    overflow-x: hidden;
  }
  #navigator {
    background-color: #2b4450;
    height: 60px;
    clear: both;
    position: relative;
    border: 1px solid #138cca;
    border-left: none;
    border-right: none;
  }
  #navList {
    width: 1200px;
    margin: 0 auto;
    height: 60px;
  }
  @media only screen and (max-width: 767px) {
    #navList {
      width: 100vw;
    }
  }
  #navList li {
    float: left;
    height: 60px;
    line-height: 60px;
    list-style-type: none;
  }
  #navList a {
    padding: 0 20px;
    font-size: 16px;
    display: block;
    color: #fff;
  }
  #navList a:link {
    color: #fff;
    text-shadow: 3px 3px 3px #000;
  }
  #navList a:hover {
    text-decoration: none;
    background-color: #fff;
    color: #169fe6;
  }
  </style>

