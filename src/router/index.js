import "babel-polyfill"
import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store';
import {
	LOAD_DESTORY
} from '@/store/mutation-types'

import Login from '@/pages/login/Login'

Vue.use(Router)

let routes = [
	{
		path: '/',
		redirect: {
			name: 'login'
		}
	},
	{
		path: '/login',
		name: 'login',
		meta: {
			requireAuth: false,
		},
		component: Login
	}
];
const router = new Router({
	// mode: 'history',
	routes: routes
})

router.beforeEach(function(to, from, next) {
	let p = store.getters.isLogin(to.meta.requireAuth);
	if(p > 0) { // 是否存在登录信息
		next();
	} else if(p < 0) {
		store.commit(LOAD_DESTORY, 0);
		next('/');
	}
})

export default router;