import router from "@/router/routes";

interface Dictionary<T> {
  [key: string]: T;
}

export class RouterHelper {
  static to(path: string, query?: Dictionary<string | string[]>) {
    router.push({
      path,
      query,
    });
  }
}
