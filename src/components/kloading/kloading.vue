<template>
  <div v-if="loading">
    <div class="kloading">
      <img :src="imgUrl.loading" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({})
export default class Kloading extends Vue {
  @Prop({ default: true })
  loading!: boolean;

  imgUrl = {
    loading: require('@/static/images/loading-new.gif')
  };
}
</script>

<style lang="less" scoped>
.kloading {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 999;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    display: block;
    width: 2.48rem;
    height: 1.84rem;
  }
}
</style>

