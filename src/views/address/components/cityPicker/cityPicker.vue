<template>
  <transition name="popup-fade">
    <div class="popup" v-show="visible" @click="close">
      <transition name="popup-slide-bottom">
        <div class="popup__panel popup__bottom" v-show="visible" @click.stop>
          <div class="pickers-header">
            <div v-if="addressView && addressView.provinceName" @click="changeSelectNavIndex(0)" :class="{ actv: SelectNavIndex == 0 }" class="nav">
              {{ addressView.provinceName }}
            </div>
            <div v-if="addressView && addressView.cityName" @click="changeSelectNavIndex(1)" :class="{ actv: SelectNavIndex == 1 }" class="nav">{{ addressView.cityName }}</div>
            <div v-if="addressView && addressView.districtName" @click="changeSelectNavIndex(2)" :class="{ actv: SelectNavIndex == 2 }" class="nav">
              {{ addressView.districtName }}
            </div>
            <div v-if="addressView && addressView.streetName" @click="changeSelectNavIndex(3)" :class="{ actv: SelectNavIndex == 3 }" class="nav">{{ addressView.streetName }}</div>
          </div>
          <div class="pickers-list">
            <div
              class="item"
              v-for="(p, pIndex) in provinceList"
              :key="p.code + 1"
              v-show="SelectNavIndex == 0"
              v-if="provinceList && provinceList.length > 0"
              :class="pIndex === selectPIndex ? 'actv' : ''"
              @click="recordCodeName(0, pIndex, p.code, p.name)"
            >
              {{ p.name }}
            </div>
            <div
              class="item"
              v-for="(c, cIndex) in cityList"
              :key="c.code + 2"
              v-show="SelectNavIndex == 1"
              v-if="cityList && cityList.length > 0"
              :class="cIndex === selectCIndex ? 'actv' : ''"
              @click="recordCodeName(1, cIndex, c.code, c.name)"
            >
              {{ c.name }}
            </div>
            <div
              class="item"
              v-for="(d, dIndex) in districtList"
              :key="d.code + 3"
              v-show="SelectNavIndex == 2"
              v-if="districtList && districtList.length > 0"
              :class="dIndex === selectDIndex ? 'actv' : ''"
              @click="recordCodeName(2, dIndex, d.code, d.name)"
            >
              {{ d.name }}
            </div>
            <div
              class="item"
              v-for="(s, sIndex) in streetList"
              :key="s.code + 4"
              v-show="SelectNavIndex == 3"
              :class="sIndex === selectSIndex ? 'actv' : ''"
              v-if="streetList && streetList.length > 0"
              @click="recordCodeName(3, sIndex, s.code, s.name)"
            >
              {{ s.name }}
            </div>
          </div>
          <div @click="close" class="popup-footer pickers-btn">取消</div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { ICodeNameView } from '@/api/viewModel/Address/ICodeNameView';
import DialogHelper from '@/helpers/DialogHelper';
import AddressStore from '@/store/modules/AddressStore';
import { ISelectAddressView } from '@/api/viewModel/Address/ISelectAddressView';
// import Popup from '../../../detail/components/popup.vue';
@Component({
  components: {
    // Popup,
  },
})
export default class CityPicker extends Vue {
  @Prop({ default: true })
  visible!: boolean; // 显示隐藏
  // 显示隐藏

  // @Prop({ default: [] })
  // linkageAreas: ICodeNameView[]; // 省市区街道
  SelectNavIndex = 0;
  // provinceName = '';
  // provinceCode = '';
  provinceIndex = 0;
  // cityName = '';
  // cityCode = '';
  cityIndex = 0;
  // districtName = '';
  // districtCode = '';
  districtIndex = 0;
  // streetName = '';
  // streetCode = '';
  streetIndex = 0;
  selectAddressView: ISelectAddressView = {
    provinceCode: '',
    provinceName: '',
    cityCode: '',
    cityName: '',
    districtCode: '',
    districtName: '',
    streetCode: '',
    streetName: '',
  };
  nums = 100;

  get selectPIndex() {
    if (AddressStore.linkageResult && AddressStore.linkageResult.linkageSelectedVal && AddressStore.linkageResult.linkageSelectedVal[0]) {
      return AddressStore.linkageResult.linkageSelectedVal[0];
    }
    return 0;
  }

  get selectCIndex() {
    if (AddressStore.linkageResult && AddressStore.linkageResult.linkageSelectedVal && AddressStore.linkageResult.linkageSelectedVal[1]) {
      return AddressStore.linkageResult.linkageSelectedVal[1];
    }
    return 0;
  }

  get selectDIndex() {
    if (AddressStore.linkageResult && AddressStore.linkageResult.linkageSelectedVal && AddressStore.linkageResult.linkageSelectedVal[2]) {
      return AddressStore.linkageResult.linkageSelectedVal[2];
    }
    return 0;
  }

  get selectSIndex() {
    if (AddressStore.linkageResult && AddressStore.linkageResult.linkageSelectedVal && AddressStore.linkageResult.linkageSelectedVal[3]) {
      return AddressStore.linkageResult.linkageSelectedVal[3];
    }
    return 0;
  }

  get isVisible() {
    this.provinceIndex = this.selectPIndex;
    this.cityIndex = this.selectCIndex;
    this.districtIndex = this.selectDIndex;
    this.streetIndex = this.selectSIndex;
    return this.visible;
  }

  get provinceList() {
    if (AddressStore.linkageResult && AddressStore.linkageResult.linkageAreas[0] && AddressStore.linkageResult.linkageAreas[0].length > 0) {
      return AddressStore.linkageResult.linkageAreas[0];
    }
    return [];
  }

  get cityList() {
    if (AddressStore.linkageResult && AddressStore.linkageResult.linkageAreas[1] && AddressStore.linkageResult.linkageAreas[1].length > 0) {
      return AddressStore.linkageResult.linkageAreas[1];
    }
    return [];
  }

  get districtList() {
    if (AddressStore.linkageResult && AddressStore.linkageResult.linkageAreas[2] && AddressStore.linkageResult.linkageAreas[2].length > 0) {
      return AddressStore.linkageResult.linkageAreas[2];
    }
    return [];
  }

  get streetList() {
    if (AddressStore.linkageResult && AddressStore.linkageResult.linkageAreas[3] && AddressStore.linkageResult.linkageAreas[3].length > 0) {
      return AddressStore.linkageResult.linkageAreas[3];
    }
    return [];
  }

  get linkageAreas() {
    if (AddressStore.linkageResult) {
      return AddressStore.linkageResult.linkageAreas;
    }
    return [];
  }

  get addressView() {
    if (AddressStore.linkageResult) {
      return AddressStore.linkageResult.addressView;
    }
    return null;
  }

  changeSelectNavIndex(index: number) {
    this.SelectNavIndex = index;
  }

  /**
   * 点击修改坐标和记录编码名称
   * @param type 0-省 1-市 2-区 3-街道
   * @param sIndex 子列的下标
   * @param code
   * @param name
   */
  recordCodeName(type: number, sIndex: number, code: string, name: string) {
    const that = this;
    let isClose = false;
    switch (type) {
      case 0: // 省
        // this.provinceCode = code;
        // this.provinceName = name;
        this.provinceIndex = sIndex;
        this.cityIndex = 0;
        this.districtIndex = 0;
        this.streetIndex = 0;
        this.SelectNavIndex = 1;
        break;
      case 1: // 市
        this.cityIndex = sIndex;
        this.districtIndex = 0;
        this.streetIndex = 0;
        break;
      case 2: // 区
        this.districtIndex = sIndex;
        this.streetIndex = 0;
        break;
      case 3: // 街道
        this.streetIndex = sIndex;
        isClose = true;
        break;
    }

    AddressStore.linkageConfirm([this.provinceIndex, this.cityIndex, this.districtIndex, this.streetIndex]).then(c => {
      switch (type) {
        case 1: // 市
          if (this.addressView && !this.addressView.districtName && !this.addressView.streetName) {
            this.SelectNavIndex = 0;
            isClose = true; // 没有街道，关闭选择
          } else if (this.addressView && !this.addressView.districtName) {
            this.SelectNavIndex = 3; // 没有区，跳到街道
          } else {
            this.SelectNavIndex = 2; // 区
          }
          break;
        case 2: // 区
          if (this.addressView && !this.addressView.streetName) {
            this.SelectNavIndex = 0;
            isClose = true; // 没有街道，关闭选择
          } else {
            this.SelectNavIndex = 3; // 街道
          }
          break;
        case 3: // 街道
          isClose = true;
          break;
      }

      if (that.addressView && isClose) {
        that.selectAddressView.provinceName = that.addressView.provinceName;
        that.selectAddressView.provinceCode = that.addressView.provinceCode;
        that.selectAddressView.cityName = that.addressView.cityName;
        that.selectAddressView.cityCode = that.addressView.cityCode;
        that.selectAddressView.districtName = that.addressView.districtName;
        that.selectAddressView.districtCode = that.addressView.districtCode;
        that.selectAddressView.streetName = that.addressView.streetName;
        that.selectAddressView.streetCode = that.addressView.streetCode;
        that.close(that.selectAddressView);
      }
    });
  }

  // 关闭弹窗
  @Emit()
  close(selectAddressView: ISelectAddressView) {
    return selectAddressView;
  }

  onShow() {
    console.log();
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/less/mixin';
.popup {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  overflow: hidden;
  text-align: center;
  font-size: 0.28rem;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  &-body {
    padding: 0;
  }
  &__panel {
    position: absolute;
    background: white;
    overflow: hidden;
    box-sizing: border-box;
    -webkit-overflow-scrolling: touch;
  }
  &__bottom {
    bottom: 0;
    left: 0;
    right: 0;
    max-height: 100%;
  }
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}
@keyframes slideBottomIn {
  0% {
    transform: translateY(100%);
    opacity: 0;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
@keyframes slideBottomOut {
  0% {
    transform: translateY(0);
    opacity: 1;
  }

  100% {
    transform: translateY(100%);
    opacity: 0;
  }
}
.popup-fade {
  &-enter-active {
    animation: 0.3s fadeIn;
  }

  &-leave-active {
    animation: 0.3s fadeOut;
  }
}
.popup-slide-bottom {
  &-enter-active {
    animation: 0.3s slideBottomIn;
  }

  &-leave-active {
    animation: 0.3s slideBottomOut;
  }
}

.pickers-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 1rem;
  background: #f2f2f2;
  .nav {
    flex-shrink: 0;
    width: 25%;
    height: 1rem;
    line-height: 1rem;
    font-size: 0.28rem;
    color: #222222;
    text-align: center;
    .text-over(1);
    &.actv {
      color: #05a5f9;
      background: #fff;
    }
    &.selected {
      color: #05a5f9;
    }
  }
}
.pickers-list {
  padding: 0.36rem 0.26rem;
  overflow-x: hidden;
  overflow-y: auto;
  height: 7rem;
  text-align: left;
  font-size: 0;
  .item {
    display: inline-block;
    height: 0.78rem;
    line-height: 0.78rem;
    padding: 0 0.32rem;
    font-size: 0.24rem;
    color: #222222;
    &.actv {
      background: #05a5f9;
      color: #fff;
      border-radius: 0.03rem;
    }
  }
}
.pickers-btn {
  width: 100%;
  height: 0.95rem;
  line-height: 0.95rem;
  background: #f4f5f7;
  color: #222222;
  font-size: 0.32rem;
  text-align: center;
}
</style>
