<template>
  <div>
    <div class="skin-codinglife has-navbar">
      <BlogHead></BlogHead>
      <div id="home">
        <div id="main">
          <div id="mainContent">
            <div
              class="forFlow"
              v-if="articleStore && articleStore.articleList"
            >
              <div
                v-for="item in articleStore.articleList"
                :key="item.id"
                v-show="isShow(item.tag)"
                class="day"
                role="article"
                aria-describedby="postlist_description_11168708"
              >
                <div class="dayTitle">
                  <div>{{ item.createTimeFormat }}</div>
                </div>

                <div class="postTitle" role="heading" aria-level="2">
                  <a
                    class="postTitle2 vertical-middle pinned-post"
                    :href="'http://inlife.ink/detail?id=' + item.id"
                  >
                    <span>
                      {{ item.title }}
                    </span>
                  </a>
                </div>
                <div class="postCon">
                  <div class="c_b_p_desc" id="postlist_description_11168708">
                    摘要： {{ abstract(item.content) }}
                    <a
                      :href="'http://inlife.ink/detail?id=' + item.id"
                      class="c_b_p_desc_readmore"
                      >阅读全文</a
                    >
                  </div>
                </div>
                <div class="clear"></div>
                <div class="postDesc">
                  <span data-post-id="11168708" class="post-view-count"
                    >阅读({{ item.pageView }})</span
                  >
                </div>
                <div class="clear"></div>
              </div>

              <div class="topicListFooter">
                <div id="nav_next_page"></div>
              </div>
            </div>
          </div>

          <div id="sideBar">
            <div id="sideBarMain">
              <div id="sidebar_c3"></div>

              <div id="leftcontentcontainer">
                <div id="blog-sidecolumn">
                  <div id="sidebar_toptags" class="sidebar-block">
                    <div class="catListTag">
                      <h3 class="catListTitle">我的标签</h3>
                      <ul v-if="filtArticle">
                        <li @click="filtArticle('')">
                          <a href="javascript:;">全部</a>
                        </li>
                        <li
                          v-for="item in articleStore.articleTagView"
                          :key="item.tag"
                          @click="filtArticle(item.tag)"
                        >
                          <a href="javascript:;"
                            >{{ item.tag
                            }}<span class="tag-count"
                              >({{ item.count }})</span
                            ></a
                          >
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="clear"></div>
        </div>
        <div class="clear"></div>
        <div id="footer">
          Copyright © 2022 panle
          <br /><span id="poweredby">Powered by NEST.JS on NUXT3</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import PathHelper from "@/helpers/pathHelper";
import { useArticleStore } from "@/stores/modules/article";
import { ref } from "vue";

let showTag = ref("");
const articleStore = useArticleStore();

const abstract = (content: string) => {
  if (!content) {
    return;
  }
  content = content.replace(/<[^>]+>/g, "");
  return content.substring(0, 250);
};

const toDetail = (id: string) => {
  PathHelper.toDetail(id);
};

const getData = async () => {
  articleStore.findAll();
  articleStore.findTop10Tag();
};

const filtArticle = (tag: string) => {
  showTag.value = tag;
};

const isShow = (tag: string) => {
  if (!showTag.value || showTag.value === tag) {
    return true;
  }
  return false;
};

getData();
</script>

<style lang="less" scoped>
.topicListFooter {
  text-align: right;
  margin-right: 10px;
  margin-top: 10px;
}
* {
  margin: 0;
  padding: 0;
}
html {
  height: 100%;
}
.skin-codinglife {
  // background: #f0eef5;
  color: #7d8b8d;
  font-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", "Helvetica",
    "Arial", sans-serif;
  font-size: 14px;
  line-height: 25px;
  min-height: 101%;
}
#header {
  overflow-x: hidden;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
  max-width: 850px;
}
#sideBar ul {
  word-break: break-all;
  list-style: none;
}
#sideBar li {
  list-style: none;
}
h1,
h2,
h3 {
  font-size: 100%;
  font-weight: normal;
}
a:link {
  color: #000;
  text-decoration: none;
}
a:hover {
  color: #f60;
  text-decoration: underline;
}
.clear {
  clear: both;
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
.blogStats {
  display: none;
}
#main {
  display: flex;
  max-width: 1200px;
  margin: 20px auto 0;
  clear: both;
}

@media only screen and (max-width: 767px) {
  #main {
    width: auto;
    flex-wrap: wrap;
  }
}

.postDesc a:link {
  color: #a3a3a3;
}
.postDesc a:hover {
  color: #9ab26b;
  text-decoration: none;
}
.postSeparator {
  border-top: 1px dashed #c0c0c0;
  margin: 20px 0;
  clear: both;
}
.topicListFooter {
  margin-top: 15px;
  height: 68px;
  line-height: 68px;
  font-size: 16px;
}

.topicListFooter .pager a,
.topicListFooter .pager span {
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  background: #fff;
  -webkit-box-shadow: 0 0 1px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.09);
  -moz-box-shadow: 0 0 1px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.09);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.09);
  height: 40px;
  line-height: 40px;
  margin-top: 14px;
  color: #2e6ab1;
  display: inline-block;
  padding: 0 15px;
  text-decoration: none;
  border: none;
}
.topicListFooter .pager a:hover,
.topicListFooter .pager span {
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  background: #9ab26b;
  -webkit-box-shadow: 0 0 1px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.09);
  -moz-box-shadow: 0 0 1px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.09);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.09);
  height: 40px;
  line-height: 40px;
  margin-top: 14px;
  color: #fff;
  display: inline-block;
  padding: 0 15px;
  text-decoration: none;
  border: none;
}

#footer {
  text-align: center;
  min-height: 15px;
  _height: 15px;
  margin-top: 10px;
  padding-top: 10px;
  margin-bottom: 10px;
  padding-bottom: 10px;
  color: #333;
}

.postCon a:link {
  text-decoration: none;
  color: #9ab26b;
}
body,
div,
h1,
h2,
h3,
h4,
h5,
h6,
ul,
li,
img {
  margin: 0;
  padding: 0;
}
img {
  border: none;
}
#home {
  margin: 0 auto;
}

#mynav li,
.catListTag ul li,
.catListTag ul li:before {
  -webkit-transition: all 0.2s ease-in;
  -o-transition: all 0.1s ease-out;
  -ms-transition: all 0.1s ease-out;
  transition: all 0.1s ease-out;
}
#mainContent {
  flex: 0 1 880px;
  background: none;
  overflow: visible;
  text-overflow: ellipsis;
  max-width: 880px;
  word-break: break-all;
}
#mainContent .forFlow {
  float: none;
  width: 100%;
}
.day {
  background: #fff;
  padding: 20px;
  border: 1px solid #dedede;
  margin-bottom: -1px;
}
.day:hover {
  border: 1px solid #169fe6;
  position: relative;
  z-index: 10;
}
.day:hover .postSeparator {
  border-top: 1px dashed #169fe6;
}
.dayTitle {
  color: #fff;
  background-color: #2b4450;
  padding: 3px 6px;
  font-size: 12px;
  display: block;
  float: left;
  margin-right: 10px;
  z-index: 10;
}
.dayTitle a {
  color: #fff;
}
.day .postTitle2 {
  color: #555;
}
.day .postTitle {
  font-size: 21px;
  line-height: 1.5em;
  float: left;
  clear: right;
}
.postCon {
  padding: 15px 0;
  clear: both;
}
.postDesc {
  clear: both;
  color: #bcbcbc;
  float: none;
  text-align: left;
  line-height: 200%;
  font-size: 12px;
}
.postDesc a {
  color: #999;
}
#topics {
  background: #fff;
  overflow: hidden;
  padding: 20px;
  border: 1px solid #dedede;
}
#topics .postTitle {
  font-size: 28px;
  font-weight: 400;
  margin-bottom: 20px;
  line-height: 1.8;
  color: #333;
}
#topics .postTitle a {
  color: #333;
}
.postTitle a:link {
  color: #7e8c8d;
}
.postTitle a:hover {
  color: #0e90d2;
  text-decoration: none;
}

#topics .postDesc {
  font-size: 14px;
  color: #777;
  line-height: 200%;
  margin: 10px 0;
}
#topics .postDesc a:hover {
  color: #9ab26b;
}
.c_b_p_desc {
  font-size: 14px;
  color: #333;
  line-height: 200%;
}
a.c_b_p_desc_readmore {
  color: #9ab26b;
}
#sideBar {
  flex: 0 0 300px;
  width: 300px;
  margin: 0 20px;
  float: left;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  overflow: visible;
  word-break: break-all;
}
@media only screen and (max-width: 767px) {
  #sideBar {
    display: none;
  }
}
#leftcontentcontainer {
  margin-top: 20px;
}
.catListTitle {
  font-size: 18px;
  padding: 10px 20px;
  background-color: #169fe6;
  color: #fff;
  font-weight: normal;
  border: 1px solid #169fe6;
}
.catListTag ul li:hover {
  background: #ff5e52;
  cursor: pointer;
  color: #fff;
}
.catListTag ul li:hover a {
  color: #fff;
}
.catListTag ul li a:hover {
  text-decoration: none;
  color: #fff;
}
.catListLink {
  display: none;
}
.sidebar-block {
  margin-bottom: 20px;
  background-color: #fff;
}
.sidebar-block h3 {
  background-color: #2b4450;
  border: 1px solid #169fe6;
  color: #fff;
  font-size: 18px;
  font-weight: normal;
  padding: 10px 20px;
}
.sidebar-block ul {
  border: 1px solid #dedede;
  border-top: none;
}
.sidebar-block ul li {
  line-height: 2;
  border-bottom: 1px solid #e9e9e9;
  padding: 15px 10px 15px 20px;
  font-size: 14px;
  color: #777;
}
#sidebar_toptags ul li {
  padding: 0;
}
.sidebar-block ul li a {
  color: #777;
  text-decoration: none;
}
#sidebar_toptags ul li a {
  padding: 15px 10px 15px 20px;
  display: inline-block;
}
#sidebar_toptags ul li a:hover {
  color: #fff;
  border-bottom: none;
}
.sidebar-block ul li a:hover {
  color: #ff5e52;
  border-bottom: 1px dotted #ff5e52;
}
#sidebar_c3 {
  margin-bottom: 5px;
}
</style>
