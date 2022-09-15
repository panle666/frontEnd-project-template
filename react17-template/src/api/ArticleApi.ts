import { baseApi } from "./base/BaseApi";
import { IArticle } from "./viewModel/Article/IArticle";

export default class ArticleApi extends baseApi {

  static findAll() {
    const url = `/article`;
    return super.get<IArticle[]>(url);
  }
}
