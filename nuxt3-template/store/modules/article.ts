import { defineStore } from "pinia";
import ArticleApi from "~~/api/articleApi";
import { IArticle } from "~~/api/viewModel/article/IArticle";
import { IArticleTagView } from "~~/api/viewModel/article/IArticleTagView";
import FormatHelper from "~~/helper/formatHelper";
import PathHelper from "~~/helper/pathHelper";

interface IArticleState {
  articles: IArticle[] | null;
  article: IArticle | null;
  articleTagView: IArticleTagView[] | null;
}

export const useArticleStore = defineStore("article", {
  state: (): IArticleState => ({
    articles: null,
    article: null,
    articleTagView: null,
  }),
  getters: {
    articleList: (state) => {
      state.articles?.map((item, index) => {
        item.createTimeFormat = FormatHelper.formatTimestamp(item.createTime!);
        item.lastEditTimeFormat = FormatHelper.formatTimestamp(
          item.lastEditTime!
        );
        return item;
      });
      return state.articles;
    },
  },
  actions: {
    async findOne(id: string) {
      const result = await ArticleApi.findOne(id);
      this.article = result?.Data;
    },
    async ajaxFindOne(id: string) {
      const result = await ArticleApi.ajaxFindOne(id);
      this.article = result?.Data;
    },
    async findAll() {
      const result = await ArticleApi.findAll();
      this.articles = result?.Data;
    },
    async ajaxFindAll() {
      const result = await ArticleApi.ajaxFindAll();
      this.articles = result?.Data;
    },
    async findTop10Tag() {
      const result = await ArticleApi.findTop10Tag();
      this.articleTagView = result?.Data;
    }
  },
});
