import { IAreasView } from './IAreasView';
import { ICodeNameView } from './ICodeNameView';

export interface ISelectAddress {
  /**
   * 注释:4
   */
  linkageLen: number;

  /**
   * 注释:IlinkageAreas集合
   */
  linkageAreas: ICodeNameView[][];

  /**
   * 注释:[object Object]
   */
  addressView: IaddressView | null;

  /**
   * 注释:9
   */
  linkageSelectedVal: number[];
}

export interface IaddressView {
  /**
   * 注释:320000
   */
  provinceCode: string;

  /**
   * 注释:江苏省
   */
  provinceName: string;

  /**
   * 注释:320100
   */
  cityCode: string;

  /**
   * 注释:南京市
   */
  cityName: string;

  /**
   * 注释:320102
   */
  districtCode: string;

  /**
   * 注释:玄武区
   */
  districtName: string;

  /**
   * 注释:320102002
   */
  streetCode: string;

  /**
   * 注释:梅园新村街道
   */
  streetName: string;
}

export interface IlinkageAreas {
  /**
   * 注释:110000
   */
  code: string;

  /**
   * 注释:北京
   */
  name: string;
}
