import { BaseApi } from './Base/BaseApi';
import { IArticle } from './viewModel/Article/IArticle';

export default class ArticleApi extends BaseApi {
  static findAll() {
    const url = `/article`;
    return super.get<IArticle[]>(url);
  }
}
