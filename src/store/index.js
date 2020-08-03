import "babel-polyfill";
import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import getters from './getters';
import modules from './modules';
import mutations from './mutations';

import logo from '@/images/logo03.png';
import favicon from '@/images/favicon.png';

Vue.use(Vuex)

const state = {
	'title': 'AINCHEN',
	'logo': logo,

	'x-token': undefined, // x-token
	'userInfo': undefined, // 用户信息
	'active-time': 0, // 最后一次操作时间

	'loading': undefined, // loading实例
	'loadCount': 0, // loading数量

	'menu': [],//菜单
	'menu-level': [],//菜单层级路径
	'menu-active': false, // 菜单状态
	'menu-history': [], // 菜单历史记录

	'x': 1
}

const store = new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
	modules
});

document.querySelector('title').innerHTML = state.title;
document.querySelector('link#favicon').href = favicon;

if (module.hot) {
	// 使 action 和 mutation 成为可热重载模块
	module.hot.accept(['./mutations', './modules'], () => {
		// 获取更新后的模块
		// 因为 babel 6 的模块编译格式问题，这里需要加上 `.default`
		const newMutations = require('./mutations').default
		const newModule = require('./modules').default
		// 加载新模块
		store.hotUpdate({
			mutations: newMutations,
			modules: newModule
		})
	})
}


export default store;