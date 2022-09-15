import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import { DeployConfig } from '@/utils/config/DeployConfig';
import persistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const plugins = new Array<any>();

// 日志调试插件 logger 插件会生成状态快照，所以仅在开发环境使用
if (!DeployConfig.nodeEnv.isProduction) {
  plugins.push(createLogger({}));
}

let persistedModules = {};
plugins.push(
  persistedState({
    key: 'Web.Vuex.PersistedState',
    storage: window.sessionStorage,
    // 仅持久化以下Module
    // reducer(store) {
    //   return {
    //     CartModule: store.CartModule,
    //   };
    // },
    getState: (key, storage) => {
      if (key && storage && storage[key]) {
        persistedModules = JSON.parse(storage[key]); // 持久化读取相应modules
      }
    },
  })
);

const vuexModulePersistedPlugin = (store: { registerModule: () => void; state: { [key: string]: any } }) => {
  if (store.registerModule) {
    const rawRegisterModule = store.registerModule.bind(store);
    store.registerModule = (...args) => {
      rawRegisterModule(...args);
      Object.keys(store.state).forEach(moduleName => {
        if (persistedModules[moduleName]) {
          store.state[moduleName] = persistedModules[moduleName]; // 从持久化数据赋值modules
        }
      });
    };
  }
};
plugins.push(vuexModulePersistedPlugin);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  plugins,
});
