import { baseApi } from "./base/baseApi";
import { IArticle } from "./viewModel/article/IArticle";
import { IArticleTagView } from "./viewModel/article/IArticleTagView";

export default class ArticleApi extends baseApi {
  static findAll() {
    const uri = `/article`;
    return super.get<IArticle[]>(uri);
  }

  static findTop10Tag() {
    const uri = `/article/findTop10Tag`;
    return super.get<IArticleTagView[]>(uri);
  }
}
