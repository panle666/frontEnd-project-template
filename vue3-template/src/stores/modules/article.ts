import ArticleApi from "@/api/articleApi";
import { IArticle } from "@/api/viewModel/article/IArticle";
import { IArticleTagView } from "@/api/viewModel/article/IArticleTagView";
import FormatHelper from "@/helpers/formatHelper";
import PathHelper from "@/helpers/pathHelper";
import { defineStore } from "pinia";

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
      state.articles?.forEach((item, index) => {
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
    async findAll() {
      const result = await ArticleApi.findAll();
      this.articles = result.Data;
    },
    async findTop10Tag() {
      const result = await ArticleApi.findTop10Tag();
      this.articleTagView = result.Data;
    },
  },
});
