const path = require('path');

const isProd = process.env.NODE_ENV === 'production';
const baseUrl = (() => {
  switch (process.env.VUE_APP_DEPLOY_ENV) {
    case 'tst':
      return '//tstres.XXX.com/mscript/vue/vue_common_bd/';
    case 'rc':
      return '//rcres.XXX.com/mscript/vue/vue_common_bd/';
    case 'prod':
      return '//res.XXX.com/mscript/vue/vue_common_bd/';
    default:
      return '/';
  }
})();

function resolve(dir) {
  const fullPath = path.join(__dirname, dir);
  return fullPath;
}

module.exports = {
  publicPath: baseUrl,
  devServer: {
    open: true,
    // host: 'http://127.0.0.1:3000',
    // port: '8080',
    proxy: 'http://api.inlife.ink',
  },
  lintOnSave: true,
  filenameHashing: false,
  // webpack目录别名alias
  // https://cli.vuejs.org/zh/guide/css.html#引用静态资源
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src')).set('Kpublic', resolve('public'));
  },
  // 需编译的模块
  transpileDependencies: [
    // 'vuex-module-decorators'
  ],
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  configureWebpack: {
    // 不打包的外部扩展
    // key值是：'vue' (这个值是import from 'vue'时用的名称）
    // value值是：'Vue' (这个值是通过script方式引入js库后它的全局变量 ，这时vue库的全局变量是首字母大写的 'Vue'
    externals: {
      // vue: 'Vue',
      // vuex: 'Vuex',
      // axios: 'axios',
      // 'vue-router': 'VueRouter',
    },
  },
};
