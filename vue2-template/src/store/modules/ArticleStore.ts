import store from '@/store';
import { VuexModule, MutationAction, getModule, Module, Mutation, Action } from 'vuex-module-decorators';
import { ApiResultCode } from '@/api/viewModel/IApiResultCode';
import DialogHelper from '@/helpers/DialogHelper';
import { IArticle } from '@/api/viewModel/Article/IArticle';
import ArticleApi from '@/api/ArticleApi';
import FormatHelper from '@/helpers/FormatHelper';

export interface IArticleState {
  articleList: IArticle[] | null;
}

@Module({
  namespaced: true,
  name: 'AddressModule',
  store,
  dynamic: true,
})
class ArticleModule extends VuexModule implements IArticleState {
  // AreasView: IAreasView;
  articleList: IArticle[] | null = null;

  @MutationAction
  async findAll() {
    const apiResult = await ArticleApi.findAll();
    const result: Partial<IArticleState> = {};
    if (apiResult.Code === ApiResultCode.OK) {
      result.articleList = apiResult.Data;
      result.articleList?.forEach((item, index) => {
        item.createTimeFormat = FormatHelper.formatTimestamp(item.createTime!);
        item.lastEditTimeFormat = FormatHelper.formatTimestamp(item.lastEditTime!);
        return item;
      });
    } else {
      DialogHelper.toast(apiResult.Message);
      // LogHelper.error(JSON.stringify(apiResult), 'getList');
    }
    return result;
  }
}

const ArticleStore = getModule(ArticleModule);
export default ArticleStore;
