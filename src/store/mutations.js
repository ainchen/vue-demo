import {
	LOGIN,
	EXIT,
	ACTIVE_TIME,
	LOAD_CREATE,
	LOAD_DESTORY,
	MENU,
	MENU_STATE,
	MENU_REDUCE,
	MENU_GOTO
} from './mutation-types'

import { Loading } from 'element-ui';
import router from '@/router';
import {
	ID,
	NAME,
	strParse,
	getParents
} from '@/router/config';

const l = window.localStorage;

export default {
	[LOGIN] (state, data) {
		if (typeof data === 'undefined') {
			data = JSON.parse(l.getItem('login'));
			if (typeof data === 'undefined' || data == null) {
				return ;
			}
		} else {
			data.time = new Date().getTime();
		}

		state['x-token'] = data.token;
		state['userInfo'] = data.data;
		state['active-time'] = data.time;
		l.setItem('login', JSON.stringify(data));

		let menuHistory = JSON.parse(l.getItem('menuHistory'));
		menuHistory = typeof menuHistory === 'undefined' || menuHistory == null ? [] : menuHistory;
		state['menu-history'] = menuHistory;
		l.setItem('menuHistory', JSON.stringify(menuHistory));
	},

	[EXIT] (state) {
		l.removeItem('login');
		state['x-token'] = undefined;
		state['userInfo'] = {};
		state['active-time'] = 0;

		l.removeItem('menuHistory');
		state['menu-history'] = [];
		window.location.reload();
	},

	[ACTIVE_TIME] (state) {
		const data = JSON.parse(l.getItem('login'));
		if (data) {
			data.time = new Date().getTime();
			l.setItem('login', JSON.stringify(data));
			state['active-time'] = data.time;
		}
	},

	[LOAD_CREATE] (state) {
		if (!state['loadCount'] || state['loadCount'] <= 0) {
			state['loadCount'] = 1;
			state['loading'] = Loading.service({
				fullscreen: true,
				text: "加载中"
			});
		} else {
			state['loadCount'] += 1;
		}
	},

	[LOAD_DESTORY] (state, data) {
		state['loadCount'] -= 1;
		if (typeof data === 'number') {
			state['loadCount'] = data;
		}
		if (state['loadCount'] <= 0) {
			state['loadCount'] = 0;
			state['loading'] ? state['loading'].close() : "";
		}
	},

	[MENU] (state, data) {
		state['menu'] = data;
	},

	[MENU_STATE] (state, data) {
		state['menu-active'] = Boolean(data);
	},

	[MENU_REDUCE](state, { item,level}) {
		let r = [];
		let b = getParents(state['menu'], r, item, level);
		state['menu-level'] = [];
		for (let n=0; n<r.length; n+=1) {
			state['menu-level'].push(r[n][ID]);
		}
	},

	[MENU_GOTO] (state, data) {
		for (let n=0; n<state['menu-history'].length; n+=1) {
			if (state['menu-history'][n][NAME] === data[NAME]) {
				state['menu-history'].splice(n, 1);
				break;
			}
		}
		state['menu-history'].unshift(data);
		l.setItem('menuHistory', JSON.stringify(state['menu-history']));
		router.push({
			name: strParse(data[NAME])
		});
	},
}