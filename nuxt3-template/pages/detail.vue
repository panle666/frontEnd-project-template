<template>
  <div>
    <!-- <Head>
      <Title>{{title}}</Title>
    </Head> -->
    <BlogHead></BlogHead>
    <div class="content" v-html="content"></div>
  </div>
</template>

<script lang="ts" setup>
import { marked } from "marked";
import { onMounted, ref } from "vue";
import { useArticleStore } from "~~/store/modules/article";

let title = ref("Inlife.ink");
const route = useRoute();
const articleStore = useArticleStore();

let content = ref("");

const id = route.query.id as string;

const getData = async () => {
  await articleStore.findOne(id);
  content.value = marked(articleStore.article?.content ?? "");
  console.log("content", content.value);
  console.log(id);
};

getData();

useHead({
  title: articleStore.article?.title,
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
});
</script>

<style lang="less" scoped>
.content {
  width: 1200px;
  margin: 0 auto;
  margin-top: 50px;
}

@media only screen and (max-width: 767px) {
  .content {
    width: 100vw;
  }
}
</style>
