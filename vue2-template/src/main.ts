import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'Kpublic/js/adp.js';
import '@/assets/less/reset.less';
import { Lazyload } from 'vant';

Vue.use(Lazyload);

// 发送统计事件
Vue.prototype.$sendEvent = (action: string) => {}; // AnalysisHelper.sendEvent('BD', action, '', 0, true);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
