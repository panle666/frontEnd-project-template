// import { baseApi } from "./base/baseApi";
import { API_CONFIG } from "~~/constant/app.constant";
import { baseApi } from "./base/baseApi";
import { IArticle } from "./viewModel/article/IArticle";
import { IArticleTagView } from "./viewModel/article/IArticleTagView";
import { IApiResult } from "./viewModel/IApiResult";

export default class ArticleApi extends baseApi {
  static findOne(id: string) {
    const url = `${API_CONFIG.BASE_URL}/article/${id}`;
    const res = useFetch<IApiResult<IArticle>>(url);
    return res.data.value;
  }

  static ajaxFindOne(id: string) {
    const url = `${API_CONFIG.BASE_URL}/article/${id}`;
    const res = $fetch<IApiResult<IArticle>>(url);
    return res;
  }

  static async findAll() {
    const url = `${API_CONFIG.BASE_URL}/article`;
    const res = useFetch<IApiResult<IArticle[]>>(url);
    return res?.data?.value;
    // return $fetch<IApiResult<IArticle[]>>(`${super.baseUrl}/article`);
  }

  static async ajaxFindAll() {
    const url = `${API_CONFIG.BASE_URL}/article`;
    const res = $fetch<IApiResult<IArticle[]>>(url);
    return res;
    // return $fetch<IApiResult<IArticle[]>>(`${super.baseUrl}/article`);
  }

  static async findTop10Tag() {
    const url = `${API_CONFIG.BASE_URL}/article/findTop10Tag`;
    const res = await useFetch<IApiResult<IArticleTagView[]>>(url);
    return res?.data?.value;
  }
}
