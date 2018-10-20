import Vue from 'vue';

import VueResource from 'vue-resource';
Vue.use(VueResource);

//请求过滤
Vue.http.options.emulateHTTP = true;
Vue.http.interceptors.push(function(request, next) {
	//	request.headers.set('X-CSRF-TOKEN', 'TOKEN');
	//	request.headers.set('Authorization', 'Bearer TOKEN');
	request.credentials = true;
	console.log(request);
	
	next(function(response) {
		if(request.url == this.path.login) { //登录
			switch(response.body.code) {
				case 200:
					this.$setMyInfo(response.body.data);
					break;
				case 999:
					this.$setMyInfo(null);
					break;
				default:
					this.$setMyInfo(null);
					break;
			}
		} else if(request.url == this.path.exit) { //退出
			switch(response.body.code) {
				case 200:
					this.$setMyInfo(null);
					break;
				default:
					break;
			}
		} else { //其他
			switch(response.body.code) {
				case 200:
					break;
				case 999:
					this.$setMyInfo(null);
					break;
				default:
					break;
			}
		}
	});
});

export default {};