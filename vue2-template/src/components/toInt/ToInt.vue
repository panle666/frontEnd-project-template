<template>
  <div>{{text}}</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

// 必须使用装饰器的方式来指定component
@Component({})
export default class ToInt extends Vue {
  /**
   * 原始数字
   */
  @Prop({ default: 0 })
  num!: number;

  get text() {
    return parseInt(this.num.toString(), 10).toFixed(0);
  }
}
</script>