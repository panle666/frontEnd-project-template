<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
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
