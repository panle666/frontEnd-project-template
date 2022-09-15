import store from '@/store';
import { VuexModule, MutationAction, getModule, Module, Mutation, Action } from 'vuex-module-decorators';
import AddressApi from '@/api/AddressApi';
import { ApiResultCode } from '@/api/viewModel/IApiResultCode';
import { IAddressList } from '@/api/viewModel/Address/IAddressList';
import { IAddresResult } from '@/api/viewModel/Address/IAddresResult';
import { IAreasView } from '@/api/viewModel/Address/IAreasView';
import DialogHelper from '@/helpers/DialogHelper';
import { ICodeNameView } from '@/api/viewModel/Address/ICodeNameView';
import PathsHelper from '@/helpers/PathsHelper';
import { IAddressViewArgs } from '@/api/viewModel/Address/IAddressViewArgs';
import { ILinkageAreas } from '@/api/viewModel/Address/ILinkageAreas';
import { ISelectAddress, IaddressView } from '@/api/viewModel/Address/ISelectAddress';

export interface IAddressState {
  addressList: IAddressList[];
  addressResult: IAddresResult | null;
  allAreas: IAreasView | null;
}

@Module({
  namespaced: true,
  name: 'AddressModule',
  store,
  dynamic: true,
})
class AddressModule extends VuexModule implements IAddressState {
  addressList: IAddressList[] = [];
  addressResult: IAddresResult | null = null;

  // AreasView: IAreasView;

  linkageResult: ISelectAddress | null = {
    linkageAreas: [],
    linkageSelectedVal: [0, 0, 0, 0],
    addressView: null,
    linkageLen: 4,
  };
  defaultAddress: string[] = [];
  allAreas: IAreasView | null = null;
  allStreets: any = {};
  ceshi: any = {};
  selectAddressId = '';

  @MutationAction
  async getList() {
    const apiResult = await AddressApi.GetList();
    const result: Partial<IAddressState> = {};
    if (apiResult.Code === ApiResultCode.OK) {
      result.addressList = apiResult.Data;
    } else {
      DialogHelper.toast(apiResult.Message);
      // LogHelper.error(JSON.stringify(apiResult), 'getList');
    }
    return result;
  }

  // @MutationAction
  // async getAddressInfoById(addressId: string) {
  //   const apiResult = await AddressApi.GetAddressInfoById(addressId);
  //   const result: Partial<IAddressState> = {};
  //   if (apiResult.Code === ApiResultCode.OK) {
  //     result.addressResult = apiResult.Data;
  //   } else {
  //     DialogHelper.toast(apiResult.Message);
  //     // LogHelper.error(JSON.stringify(apiResult), 'getAddressInfoById');
  //   }
  //   return result;
  // }

  @MutationAction
  async getAreas() {
    const apiResult = await AddressApi.GetAreas();
    const result: Partial<IAddressState> = {};
    if (apiResult.Code === ApiResultCode.OK) {
      result.allAreas = apiResult.Data;
    } else {
      DialogHelper.toast(apiResult.Message);
      // LogHelper.error(JSON.stringify(apiResult), 'getAreas');
    }
    return result;
  }

  @Mutation
  setLinkageResult(linkageResult: ISelectAddress | null) {
    if (this.linkageResult) {
      this.linkageResult = {
        ...this.linkageResult,
        ...linkageResult,
      };
    }
    return;
  }

  @Mutation
  setSelectAddressId(selectAddressId: string) {
    this.selectAddressId = selectAddressId;
    return;
  }

  @Mutation
  resetLinkageAreas(linkageResult: ISelectAddress | null) {
    this.linkageResult = linkageResult;
    return;
  }

  @Mutation
  resetAddressView() {
    if (this.linkageResult) {
      this.linkageResult.addressView = null;
    }
    return;
  }

  /**
   * 新增地址
   * @param addressView
   */
  @Action
  async addNew(addressView: IAddressViewArgs) {
    const apiResult = await AddressApi.addNew(addressView);
    if (apiResult.Code === ApiResultCode.OK) {
      DialogHelper.toast(apiResult.Message);
      this.setSelectAddressId(apiResult.Data.ID);
      PathsHelper.goBack();
    } else {
      if (apiResult.Message.length > 12) {
        DialogHelper.alert(apiResult.Message);
      } else {
        await DialogHelper.toast(apiResult.Message);
      }
      // LogHelper.error(JSON.stringify(apiResult), 'addNew');
    }
  }

  /**
   * 修改地址
   * @param addressView
   */
  @Action
  async edit(addressView: IAddressViewArgs) {
    const apiResult = await AddressApi.edit(addressView);
    if (apiResult.Code === ApiResultCode.OK) {
      // DialogHelper.toast(apiResult.Message);
      this.setSelectAddressId(addressView.AddressId);
      PathsHelper.goBack();
    } else {
      if (apiResult.Message.length > 12) {
        DialogHelper.alert(apiResult.Message);
      } else {
        await DialogHelper.toast(apiResult.Message);
      }
      // LogHelper.error(JSON.stringify(apiResult), 'edit');
    }
  }

  /**
   * 删除地址
   * @param addressId
   */
  @Action
  async delById(addressId: string) {
    const apiResult = await AddressApi.DelById(addressId);
    if (apiResult.Code === ApiResultCode.OK) {
      DialogHelper.toast('删除成功');
      this.setSelectAddressId('');
      this.getList(); // 重现请求地址列表，不跳转新的页面
      // PathsHelper.goAddressList();
    } else {
      DialogHelper.toast(apiResult.Message);
      // LogHelper.error(JSON.stringify(apiResult), 'delById');
    }
  }

  // 初始所有省市区数据
  @Action
  async initAllAreas() {
    if (this.allAreas) {
      return;
    }
    this.getAreas();
  }

  // 初始省市区联动数据
  @Action
  async initLinkageAreas(linkageAreas: ILinkageAreas) {
    if (!this.allAreas) {
      DialogHelper.toast('未加载完全部区域数据');
      await this.initAllAreas();
    }
    const linkageResult = await this.getLinkageResult(linkageAreas);
    this.setLinkageResult(linkageResult);
  }

  @Action
  async linkageConfirm(linkageSelectedVal) {
    const linkageAreas: ILinkageAreas = { linkageSelectedVal, defaultAddress: [], isDefault: false };
    const linkageResult = await this.getLinkageResult(linkageAreas);
    this.setLinkageResult(linkageResult);
  }

  @Action
  async getStreets(code) {
    try {
      if (this.allStreets[code]) {
        return this.allStreets[code];
      }
      const streetResult = await AddressApi.getStreets(code);
      if (streetResult.Code === ApiResultCode.OK) {
        const streets = streetResult.Data;
        this.allStreets[code] = streets as any;
        return streets;
      }
      return null;
    } catch (error) {
      // LogHelper.error(error);
      return null;
    }
  }

  @Action
  async getLinkageResult(linkageAreas: ILinkageAreas) {
    const [provinceIndex, cityIndex, districtIndex, streetIndex] = linkageAreas.linkageSelectedVal;
    const [provinceCode = '', cityCode = '', districtCode = '', streetCode = ''] = linkageAreas.defaultAddress || this.defaultAddress;

    // let areasView: IAreasView | null;
    const thatLinkageAreas: ICodeNameView[][] = [];
    const thatAddressView = {
      provinceCode: '',
      provinceName: '',
      cityCode: '',
      cityName: '',
      districtCode: '',
      districtName: '',
      streetCode: '',
      streetName: '',
    };
    const linkageSelectedVal: number[] = [];

    const linkageResult: ISelectAddress | null = {
      linkageLen: 4,
      linkageAreas: thatLinkageAreas,
      addressView: thatAddressView,
      linkageSelectedVal,
    };
    const allAreas = this.allAreas;
    // 省
    const provinces = this.allAreas['0'].map(arr => {
      const codeNameView: ICodeNameView = {
        code: arr[0],
        name: arr[1],
      };
      return codeNameView;
    });
    if (thatLinkageAreas) {
      thatLinkageAreas.push(provinces);
    }

    const thatProvince = linkageAreas.defaultAddress && linkageAreas.defaultAddress.length > 0 ? provinces.find(p => p.code === provinceCode) : provinces[provinceIndex || 0];
    linkageSelectedVal.push(provinces.findIndex(p => p.code === thatProvince.code));
    thatAddressView.provinceCode = thatProvince.code;
    thatAddressView.provinceName = thatProvince.name;

    // 市
    const citys = allAreas[thatProvince.code].map(arr => {
      const codeNameView: ICodeNameView = {
        code: arr[0],
        name: arr[1],
      };
      return codeNameView;
    });
    thatLinkageAreas.push(citys);
    const thatCity = linkageAreas.defaultAddress && linkageAreas.defaultAddress.length > 0 ? citys.find(c => c.code === cityCode) : citys[cityIndex || 0];
    linkageSelectedVal.push(citys.findIndex(c => c.code === thatCity.code));
    thatAddressView.cityCode = thatCity.code;
    thatAddressView.cityName = thatCity.name;
    // 区
    const districts =
      allAreas[thatCity.code] &&
      allAreas[thatCity.code].map(arr => {
        const codeNameView: ICodeNameView = {
          code: arr[0],
          name: arr[1],
        };
        return codeNameView;
      });

    let hasDistrict = true;
    let streetParentCode;
    if (districts && districts.length > 0) {
      thatLinkageAreas.push(districts);
      const thatDistrict = linkageAreas.defaultAddress && linkageAreas.defaultAddress.length > 0 ? districts.find(d => d.code === districtCode) : districts[districtIndex || 0];
      linkageSelectedVal.push(districts.findIndex(d => d.code === thatDistrict.code));
      thatAddressView.districtCode = thatDistrict.code;
      thatAddressView.districtName = thatDistrict.name;
      streetParentCode = thatDistrict.code;
    } else {
      thatLinkageAreas.push([]);
      linkageSelectedVal.push(0);
      hasDistrict = false;
      streetParentCode = thatCity.code;
    }
    // 街道
    const apiStreets = await this.getStreets(streetParentCode);
    if (apiStreets && apiStreets.length > 0) {
      const streets = apiStreets.map(arr => ({
        code: arr[0],
        name: arr[1],
      }));
      thatLinkageAreas.push(streets);

      const thatStreetIndex = hasDistrict ? streetIndex : streetIndex;
      const thatStreetCode = hasDistrict ? streetCode : streetCode;
      const thatStreet =
        (linkageAreas.defaultAddress && linkageAreas.defaultAddress.length > 0 ? streets.find(s => s.code === thatStreetCode) : streets[thatStreetIndex || 0]) || streets[0];
      linkageSelectedVal.push(streets.findIndex(s => s.code === thatStreet.code));
      thatAddressView.streetCode = thatStreet.code;
      thatAddressView.streetName = thatStreet.name;
    }
    if (thatLinkageAreas.length < linkageResult.linkageLen) {
      thatLinkageAreas.push(...new Array(linkageResult.linkageLen - thatLinkageAreas.length).fill([]));
    }
    return linkageResult;
  }
}

const AddressStore = getModule(AddressModule);
export default AddressStore;
