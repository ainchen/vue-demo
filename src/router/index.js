import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

var router = new Router({
	routes: [
	{
		path: '/',
		name: 'HelloWorld',
		meta: {
			requireAuth: false,
		},
		component: HelloWorld
	}
	]
})

router.beforeEach(function(to, from, next) {
	if(to.meta.requireAuth) { // 判断该路由是否需要登录权限
		if(Vue.prototype.$getMyInfo()) { // 是否存在登录信息
			next();
		} else {
			next({
				name: 'login',
				params: {
					path: to.name == 'login' ? 'index' : to.name
				}
			})
		}
	} else {
		next();
	}
})

export default router;