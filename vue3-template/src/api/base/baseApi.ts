import { APP_Status } from "@/constant/status.constant";
import axios, { AxiosRequestConfig } from "axios";
import { IApiResult } from "../viewModel/IApiResult";
import { jsonp } from "./jsonp";
import { ElMessage } from "element-plus";
import PathHelper from "@/helpers/pathHelper";

interface RequestConfig extends AxiosRequestConfig {
  params?: object;
}

// 添加请求拦截器
axios.interceptors.request.use((request: RequestConfig) => {
  // 默认请求头
  request.headers!["X-Requested-With"] = "XMLHttpRequest";
  // 类似 jquery cache false
  if ((request.method || "").toLowerCase() === "get") {
    Object.assign(request.params!, { _t: Date.now() });
  }
  request.url = "/api" + request.url;
  return request;
});

// 添加响应拦截器，响应拦截器会在then/catch处理之前执行
axios.interceptors.response.use(
  (response) => {
    if (response.data.Code == APP_Status.UN_AUTH) {
      ElMessage.error("未登录!");
      PathHelper.toLogin(location.href);
    }
    return Promise.resolve(response);
  },
  async (err) => {
    debugger;
    return Promise.reject(err);
  }
);

// axios.interceptors.response.use((res) => {
//   console.log("响应:", res.config.url, res);
//   return res.data;
// });
export class baseApi {
  /**
   * 标准响应(IApiResult)的get请求用这个
   * @param uri 请求链接
   * @param params 参数
   */
  protected static async get<T>(
    uri: string,
    params: object = {},
    config?: object
  ): Promise<IApiResult<T>> {
    return axios
      .get<IApiResult<T>>(uri, { params, ...config })
      .then((res) => res.data)
      .catch((err) => {
        const errResult: IApiResult<T> = {
          Code: (err.response && err.response.status) || 0,
          Result: false,
          Message: err.message,
          Data: {} as T,
        };
        return errResult;
      });
  }

  /**
   * 标准响应(IApiResult)的post请求用这个
   * @param uri 请求链接
   * @param data 参数
   */
  protected static async post<T>(
    uri: string,
    data: object = {},
    config?: object
  ): Promise<IApiResult<T>> {
    return axios
      .post<IApiResult<T>>(uri, data, config)
      .then((res) => res.data)
      .catch((err) => {
        const errResult: IApiResult<T> = {
          Code: (err.response && err.response.status) || 0,
          Result: false,
          Message: err.message,
          Data: {} as T,
        };
        return errResult;
      });
  }

  /**
   * 特殊响应的get请求用这个
   * @param uri 请求链接
   * @param params 参数
   */
  protected static async specialGet<T>(
    uri: string,
    params: object = {},
    config?: object
  ): Promise<T> {
    return axios.get<T>(uri, { params, ...config }).then((res) => res.data);
  }

  /**
   * 特殊响应的post请求用这个
   * @param uri 请求链接
   * @param data 参数
   */
  protected static async specialPost<T>(
    uri: string,
    data: object = {},
    config?: object
  ): Promise<T> {
    return axios.post<T>(uri, data, config).then((res) => res.data);
  }

  /**
   * jsonp
   * @param url 完整url
   * @param params 参数
   */
  protected static async jsonp<T>(
    url: string,
    optional: object = {}
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      jsonp(url, optional, (err: any, data: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}
