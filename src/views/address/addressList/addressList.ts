import { Vue, Component } from 'vue-property-decorator';
import AddressStore from '@/store/modules/AddressStore';
import PathsHelper from '@/helpers/PathsHelper';

// 必须使用装饰器的方式来指定component
@Component({
  components: {},
})
export default class AddressList extends Vue {
  // 初始化数据
  index = ''; // 初始状态的index
  clientX1 = 0; // 滑动开始位置
  clientX2 = 0;
  del = 0; // 内容初始的right距离
  btnWidth = 120; // 删除按钮宽度
  inx = 0;
  selectIndex = 0;
  isSelect = true;

  get addressList() {
    return AddressStore.addressList;
  }

  // 自定义函数
  goEditAddress(addressId) {
    PathsHelper.goAddAddress(addressId);
  }

  setActive(index) {
    this.selectIndex = index;
  }
  touchS(e) {
    this.clientX1 = e.touches[0].clientX;
    // console.log(this.clientX1);
  }
  touchM(event, aIndex) {
    this.inx = aIndex;
    this.clientX2 = event.touches[0].clientX;
    const disX = this.clientX1 - this.clientX2;
    // console.log(disX);
    if (disX === 0 || disX < 0) {
      // 如果移动距离小于等于0，说明向右滑动，文本层位置不变
      this.del = 0;
    }
    if (disX >= this.btnWidth) {
      // 控制手指移动距离最大值为删除按钮的宽度
      this.del = this.btnWidth;
    }
  }
  async delById(addressId: string) {
    this.$sendEvent('user_deleteAddress');
    await AddressStore.delById(addressId);
  }

  goAddAddress() {
    PathsHelper.goAddAddress();
  }

  // 选择地址，保存地址ID 跳回上一页
  selectAddressGoback(selectAaddressId: string) {
    if (!this.isSelect) {
      return;
    }
    console.log(`选择了:${selectAaddressId}`);
    AddressStore.setSelectAddressId(selectAaddressId);
    PathsHelper.goBack();
  }

  // 小程序生命周期
  async created() {
    const that = this;
    const isSelect = this.$route.query.isSelect;
    if (isSelect) {
      that.isSelect = isSelect === 'false' ? false : true;
    }
    if (that.isSelect) {
      document.title = '选择收货地址';
    } else {
      document.title = '地址列表';
    }
    await AddressStore.getList();

    if (!AddressStore.allAreas) {
      AddressStore.getAreas();
    }
  }
}
