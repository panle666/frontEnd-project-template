<template>
  <div>
    <n-dialog-provider>
      <n-message-provider>
        <NuxtPage />
      </n-message-provider>
    </n-dialog-provider>
  </div>
</template>

<script lang="ts" setup>
import { NMessageProvider, NDialogProvider } from "naive-ui";
</script>

<style lang="less">
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
  max-width: 100%;
}
@media only screen and (max-width: 767px) {
  img {
    max-width: 100vw;
  }
}
.language,
.language-language,
.language-javascript {
  background-color: #1e1e1e;
  border-radius: 8px;
  color: #8abeb7;
  display: block;
  font-size: 14px;
  overflow: auto;
  line-height: 28px;
  padding-left: 15px;
}
</style>
