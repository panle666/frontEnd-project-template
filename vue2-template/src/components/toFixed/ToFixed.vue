<template>
  <span>{{fixedText}}</span>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

// 必须使用装饰器的方式来指定component
@Component({})
export default class ToFixed extends Vue {
  /**
   * 原始价格
   */
  @Prop({ default: 0 })
  price!: number;

  /**
   * 保留小数位
   */
  @Prop({ default: 2 })
  saveNum!: number;

  /**
   * 前置符号 ￥ $ 等
   */
  @Prop({ default: '' })
  prepSymbol!: string;

  get fixedText() {
    const that = this;
    const priceText = (Math.round(that.price * 100) / 100).toFixed(that.saveNum);
    return `${that.prepSymbol}${priceText}`;
  }
}
</script>