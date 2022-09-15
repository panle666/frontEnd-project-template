export interface IArticle {
  id?: string;

  title: string;

  content: string;

  userId?: string;

  createTime?: number;

  createTimeFormat?: string;

  author: string;

  lastEditTime?: number;

  lastEditTimeFormat?: string;

  tag: string;

  isRemove?: boolean;

  pageView: number;
}
