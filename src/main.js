// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill"
import Vue from 'vue';

// ElementUI
import ElementUI from 'element-ui';
Vue.use(ElementUI);
import 'element-ui/lib/theme-chalk/index.css';

//filters
import * as filters from './config/filters'
Object.keys(filters).forEach(k => {
  Vue.filter(k, filters[k]);
})

import "@/style/css"; // css
import '@/config/rem'; //rem
import App from '@/App';
import router from '@/router';
import store from '@/store';
import {
	LOGIN,
	LOAD_CREATE,
	LOAD_DESTORY
} from './store/mutation-types'
store.commit(LOAD_DESTORY, 0);
store.commit(LOAD_CREATE);


Vue.config.productionTip = false

/* eslint-disable no-new login_remove*/
new Vue({
	el: '#app',
	router,
	store,
	components: {
		App
	},
	template: '<App/>',
	created: function() {
		store.commit(LOGIN);
		store.dispatch('getMenu');
	},
	mounted: function() {
		this.$nextTick(()=>{
			store.commit(LOAD_DESTORY);
		});
	},
})
