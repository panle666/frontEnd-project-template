export interface IAddressViewArgs {
  /**
   * 是否默认地址
   */
  IsDefault: boolean;

  /**
   * 收货人
   */
  Consignee: string;

  /**
   * 手机号码
   */
  MobilePhone: string;

  /**
   * 省编码
   */
  ProvinceId: string;

  /**
   * 市编码
   */
  CityId: string;

  /**
   * 区编码
   */
  AreaId: string;

  /**
   * 街道编码
   */
  StreetCode: string;

  /**
   * 详细地址
   */
  Address: string;

  /**
   * 省名称
   */
  ProvinceName: string;

  /**
   * 市名称
   */
  CityName: string;
  /**
   * 区名称
   */
  AreaName: string;
  /**
   * 街道名称
   */
  Street: string;

  /**
   * 地址ID
   */
  AddressId: string;
}
