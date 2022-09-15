<template>
  <div>{{text}}</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

// 必须使用装饰器的方式来指定component
@Component({})
export default class ToRemoveInt extends Vue {
  /**
   * 原始数字
   */
  /**
   * 原始数字
   */
  @Prop({ default: 0 })
  num!: number;

  /**
   * 保留多少位小数
   */
  /**
   * 保留多少位小数
   */
  @Prop({ default: 2 })
  saveNum!: number;

  /**
   * 前置符号 ￥ $ . 等
   */
  /**
   * 前置符号 ￥ $ . 等
   */
  @Prop({ default: '' })
  prepSymbol!: string;

  get text() {
    const numStr = (this.num - parseInt(this.num.toString(), 10)).toFixed(this.saveNum).replace('0.', '');
    return `${this.prepSymbol}${numStr}`;
  }
}
</script>