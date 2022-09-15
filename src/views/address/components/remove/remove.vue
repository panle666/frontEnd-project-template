<template>
  <div class="layout" v-if="isShow">
    <div class="clear-wrapper">
      <div class="history-clear">
        <div class="clear-title">是否删除收货地址</div>
        <div class="clear-btn">
          <div class="btn-cancel">取消</div>
          <div class="btn-sure">确定</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
// import { LogHelper } from '@/helpers/LogHelper';

// 必须使用装饰器的方式来指定component
@Component({})
export default class Remove extends Vue {
  @Prop({ default: true })
  isShow!: boolean; // 传过来的数据
  // 传过来的数据

  mounted() {
    console.log();
  }
}
</script>

<style lang="less" scoped>
.layout {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}
.clear-wrapper {
  height: 4.78rem;
  position: relative;
  background: #f0f0f0;
}
.history-clear {
  width: 6rem;
  height: 2.41rem;
  background: #fff;
  border-radius: 0.26rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .clear-title {
    height: 1.44rem;
    line-height: 1.44rem;
    text-align: center;
    color: #141414;
    font-size: 0.34rem;
    border-bottom: 1px solid #f0f0f0;
  }
  .clear-btn {
    height: 0.96rem;
    line-height: 0.96rem;
    display: flex;
    justify-content: flex-start;
    text-align: center;
    font-size: 0.3rem;
    .btn-cancel {
      width: 50%;
      border-right: 1px solid #f0f0f0;
      color: #141414;
    }
    .btn-sure {
      width: 50%;
      color: #2f8ffd;
    }
  }
}
</style>


