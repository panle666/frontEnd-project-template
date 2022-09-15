import { Vue, Component } from 'vue-property-decorator';
import AddressStore from '@/store/modules/AddressStore';
import { IAddressViewArgs } from '@/api/viewModel/Address/IAddressViewArgs';
import { ILinkageAreas } from '@/api/viewModel/Address/ILinkageAreas';
import cityPicker from '../components/cityPicker/cityPicker.vue';
import { ISelectAddressView } from '@/api/viewModel/Address/ISelectAddressView';
import DialogHelper from '@/helpers/DialogHelper';

// 必须使用装饰器的方式来指定component
@Component({
  components: {
    cityPicker,
  },
})
export default class OperateAddress extends Vue {
  adddressViewArgs: IAddressViewArgs = {
    IsDefault: false,
    Consignee: '',
    MobilePhone: '',
    ProvinceId: '',
    CityId: '',
    AreaId: '',
    StreetCode: '',
    Address: '',
    ProvinceName: '',
    CityName: '',
    AreaName: '',
    Street: '',
    AddressId: '',
  };

  isDefault: boolean = false;
  linkageAddressResult: string = '';
  /**
   * 0新增 1修改
   */
  operateType: number = 0;

  isShowCityPicker = false;

  isAddLoading = false;

  // selectAddressView: ISelectAddressView = {
  //   provinceCode: '',
  //   provinceName: '',
  //   cityCode: '',
  //   cityName: '',
  //   districtCode: '',
  //   districtName: '',
  //   streetCode: '',
  //   streetName: ''
  // };

  get addressResult() {
    if (AddressStore.addressResult) {
      return AddressStore.addressResult;
    }
    return null;
  }

  get linkageResult() {
    if (AddressStore.linkageResult) {
      return AddressStore.linkageResult;
    }
    return null;
  }

  get addressView() {
    if (AddressStore.linkageResult && AddressStore.linkageResult.addressView) {
      return AddressStore.linkageResult.addressView;
    }
    return null;
  }

  get pcdsText() {
    if (this.adddressViewArgs) {
      return this.adddressViewArgs.ProvinceName + this.adddressViewArgs.CityName + this.adddressViewArgs.AreaName + this.adddressViewArgs.Street;
    }
    return null;
  }

  areaConfrim(e) {
    if (AddressStore.linkageResult && this.addressView) {
      this.linkageAddressResult = `${this.addressView!.provinceName} ${this.addressView.cityName} ${this.addressView.districtName} ${this.addressView.streetName}`;
      console.log(`this.addressView`, this.addressView);
      this.adddressViewArgs.CityId = this.addressView.cityCode;
      this.adddressViewArgs.CityName = this.addressView.cityName;
      this.adddressViewArgs.AreaId = this.addressView.districtCode;
      this.adddressViewArgs.AreaName = this.addressView.districtName;
      this.adddressViewArgs.ProvinceId = this.addressView.provinceCode;
      this.adddressViewArgs.ProvinceName = this.addressView.provinceName;
      this.adddressViewArgs.StreetCode = this.addressView.streetCode;
      this.adddressViewArgs.Street = this.addressView.streetName;
    }
    AddressStore.linkageConfirm(e.mp.detail.value);
  }

  areaChange(e) {
    let thatSelectedVal;
    if (AddressStore.linkageResult) {
      thatSelectedVal = AddressStore.linkageResult.linkageSelectedVal;
    }
    const thatColumn = e.mp.detail.column;
    thatSelectedVal[thatColumn] = e.mp.detail.value;
    if (thatColumn + 1 < thatSelectedVal.length) {
      for (let i = thatColumn + 1, len = thatSelectedVal.length; i < len; i++) {
        thatSelectedVal[i] = 0;
      }
    }
    const linkageAreas: ILinkageAreas = {
      linkageSelectedVal: thatSelectedVal,
      defaultAddress: [],
      isDefault: false,
    };
    AddressStore.initLinkageAreas(linkageAreas);
  }

  async editOrAddAddress() {
    const that = this;
    if (that.isAddLoading) {
      return;
    }
    const reg = /^1[0-9]{10}$/;
    if (!this.adddressViewArgs.Consignee) {
      DialogHelper.toast(`请输入收货人姓名`);
      return;
    } else if (!reg.test(this.adddressViewArgs.MobilePhone)) {
      DialogHelper.toast(`请输入正确的手机号码`);
      return;
    } else if (!this.adddressViewArgs.ProvinceId || !this.adddressViewArgs.CityId) {
      DialogHelper.toast(`请选择地址`);
      return;
    } else if (!this.adddressViewArgs.Address) {
      DialogHelper.toast(`请填写详细地址`);
      return;
    }
    this.isAddLoading = true;
    // DialogHelper.loadingStart();
    if (this.adddressViewArgs.IsDefault) {
      this.$sendEvent('user_defaultAddress');
    }
    if (this.operateType === 0) {
      // 新增
      this.$sendEvent('user_addAddress');
      await AddressStore.addNew(this.adddressViewArgs);
    } else {
      // 修改
      this.$sendEvent('user_updateAddress');
      await AddressStore.edit(this.adddressViewArgs);
    }
    // DialogHelper.loadingEnd();
    this.isAddLoading = false;
  }

  changeSelect() {
    this.adddressViewArgs.IsDefault = !this.adddressViewArgs.IsDefault;
  }

  emitCloseCityPicker(selectAddressView: ISelectAddressView) {
    if (selectAddressView && selectAddressView.provinceCode) {
      this.adddressViewArgs.ProvinceId = selectAddressView.provinceCode;
      this.adddressViewArgs.ProvinceName = selectAddressView.provinceName;
      this.adddressViewArgs.CityId = selectAddressView.cityCode;
      this.adddressViewArgs.CityName = selectAddressView.cityName;
      this.adddressViewArgs.AreaId = selectAddressView.districtCode;
      this.adddressViewArgs.AreaName = selectAddressView.districtName;
      this.adddressViewArgs.StreetCode = selectAddressView.streetCode;
      this.adddressViewArgs.Street = selectAddressView.streetName;
    }
    this.isShowCityPicker = false;
  }

  async created() {
    const that = this;
    if (!AddressStore.allAreas) {
      await AddressStore.getAreas();
    }

    let defaultAddress = ['', '', '', ''];
    // 清除默认值
    // const oldData = this.$options.data as Function;
    // Object.assign(this.$data, oldData());
    // Object.assign(this, this.$options.computed);
    AddressStore.resetAddressView();

    const addressId = that.$route.query.addressId;
    if (addressId) {
      // 有地址ID：修改 无：新增
      this.operateType = 1; // 0新增 1修改
      // await AddressStore.getAddressInfoById(addressId as string);
      if (this.addressResult) {
        document.title = '修改收货地址';
        this.adddressViewArgs.CityId = this.addressResult.CityCode;
        this.adddressViewArgs.CityName = this.addressResult.City;
        this.adddressViewArgs.AreaId = this.addressResult.DistrictCode;
        this.adddressViewArgs.AreaName = this.addressResult.District;
        this.adddressViewArgs.ProvinceId = this.addressResult.ProvinceCode;
        this.adddressViewArgs.ProvinceName = this.addressResult.Province;
        this.adddressViewArgs.StreetCode = this.addressResult.StreetCode;
        this.adddressViewArgs.Street = this.addressResult.Street;
        this.adddressViewArgs.AddressId = this.addressResult.ID;

        this.adddressViewArgs.Consignee = this.addressResult.Accepter; // 收货人
        this.adddressViewArgs.MobilePhone = this.addressResult.MobilePhone; // 手机号码
        this.adddressViewArgs.Address = this.addressResult.Address; // 详细地址
        this.adddressViewArgs.IsDefault = this.addressResult.IsDefault; // 是否默认地址
        defaultAddress = [this.addressResult.ProvinceCode, this.addressResult.CityCode, this.addressResult.DistrictCode, this.addressResult.StreetCode];

        AddressStore.initLinkageAreas({ linkageSelectedVal: [], defaultAddress, isDefault: false });
        this.linkageAddressResult = `${this.addressResult.Province} ${this.addressResult.City} ${this.addressResult.District} ${this.addressResult.Street}`;
      }
    } else {
      document.title = '新增收货地址';
      this.operateType = 0; // 0新增 1修改
      // 初始联动数据
      AddressStore.initLinkageAreas({ linkageSelectedVal: [], defaultAddress: [], isDefault: true });
    }
  }
}
