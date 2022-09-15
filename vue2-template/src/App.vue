<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

// 必须使用装饰器的方式来指定component
@Component({})
export default class App extends Vue {
  async created() {
  }
}
</script>
<style lang="less">
/** DialogHelper toast */
.k2-toast {
  padding-left: 0.48rem;
  height: 0.36rem;
  line-height: 0.36rem;
  font-size: 0.28rem;
  &.k2-toast-warning {
    background: url('~@/static/dialog/warning.png') no-repeat left center;
    background-size: 0.34rem 0.34rem;
  }
  &.k2-toast-error {
    background: url('~@/static/dialog/error.png') no-repeat left center;
    background-size: 0.34rem 0.34rem;
  }
  &.k2-toast-success {
    background: url('~@/static/dialog/success.png') no-repeat left center;
    background-size: 0.34rem 0.34rem;
  }
}
</style>
