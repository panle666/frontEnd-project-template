import { IAddressList } from './viewModel/Address/IAddressList';
import { IAddresResult } from './viewModel/Address/IAddresResult';
import { IAreasView } from './viewModel/Address/IAreasView';
import { IAddressViewArgs } from './viewModel/Address/IAddressViewArgs';
import { ICusAddress } from './viewModel/Address/ICusAddress';
import { BaseApi } from './Base/BaseApi';

export default class AddressApi extends BaseApi {
  /**
   * 获取收货地址列表
   */
  static GetList() {
    const uri = '/Address/GetList';
    return super.get<IAddressList[]>(uri);
  }

  /**
   * 获取单个地址信息
   */
  static  ressInfoById(addressId: string) {
    const uri = `/Address/GetAddressInfoById?addressId=${addressId}`;
    return super.get<IAddresResult>(uri);
  }

  /**
   * 获取所有地址数据
   */
  static GetAreas() {
    const uri = '/Address/GetAreas';
    return super.get<IAreasView>(uri);
  }

  /**
   * 获取该区下街道信息
   * @param {string} code 区编码或城市编码
   */
  static getStreets(code) {
    const url = '/Address/GetStreets';
    const data = {
      code,
    };
    return super.get(url, data);
  }

  /**
   * 添加新的收货地址
   * @param {IAddressViewArgs} view 收货地址信息
   */
  static addNew(view: IAddressViewArgs) {
    const url = '/Address/AddNew';
    const data = {
      view,
    };
    return super.post<ICusAddress>(url, data);
  }

  /**
   * 修改收货地址
   * @param {IAddressViewArgs} view 收货地址信息
   */
  static edit(view: IAddressViewArgs) {
    const url = '/Address/Edit';
    const data = {
      view,
    };
    return super.post(url, data);
  }

  /**
   * 删除收货地址
   * @param {string} view 收货地址信息
   */
  static DelById(addressId: string) {
    const url = `/Address/DelById?AddressId=${addressId}`;
    return super.get(url);
  }
}
