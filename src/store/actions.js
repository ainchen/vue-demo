import {
	LOAD_CREATE,
	LOAD_DESTORY,
	MENU,
	MENU_REDUCE,
	MENU_GOTO
} from './mutation-types'

import {
	menusAuth
} from '@/config/getData'

import router from '@/router';
import {
	treeToRoute,
	getNochildren
} from '@/router/config';

export default {
	getMenu(context) {
		if (context.getters.isLogin(true) > 0) {
			context.commit(LOAD_CREATE);
			menusAuth().then((res) => {
				if (res.code == 200) {
					context.commit(MENU, res.data);
					// 加载workspace路由
					let routers = [{
						path: '/workspace',
						name: 'workspace',
						meta: {
							requireAuth: true,
						},
						component: () => import ('@/pages/workspace/Workspace'),
						children: []
					}, {
						path: '*',
						meta: {
							requireAuth: false,
						},
						component: () => import ('@/pages/404/Error')
					}]
					let menuList = [];
					getNochildren(context.state['menu'], menuList);
					treeToRoute(menuList, routers[0].children);
					router.addRoutes(routers);
					setTimeout(()=>{
						if (context.state['menu-history'].length > 0) {
							context.commit(MENU_REDUCE, {
								item: context.state['menu-history'][0],
								level: -1
							});
							context.commit(MENU_GOTO, context.state['menu-history'][0]);
						} else {
							router.push({
								name: 'workspace'
							})
						}
						context.commit(LOAD_DESTORY);
					}, 500);
				} else {
					context.commit(MENU, []);
					router.push('/');
					context.commit(LOAD_DESTORY);
				}
			}, (err) => {
				context.commit(MENU, []);
				context.commit(LOAD_DESTORY);
				router.push('/');
			})
		} else {
			context.commit(MENU, []);
			router.push('/');
			context.commit(LOAD_DESTORY);
		}
	}
}