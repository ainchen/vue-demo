import Axios from 'axios';
import store from '@/store';
import router from '@/router';
import {
	BASE_PATH
} from './getData';

import {
	EXIT,
	ACTIVE_TIME
} from '@/store/mutation-types'

const axios = (path, type, data) => {
	return Axios({
		baseURL: BASE_PATH,
		method: type,
		url: path,
		data: type === 'get' ? undefined : data,
		params: type === 'get' ? data : undefined,
		transformResponse: [(data) => { // 对返回结果进行系列处理
			// 对 data 进行任意转换处理
			typeof data !== 'object' ? data = JSON.parse(data) : "";
			return data;
		}],
		headers: {
			'x-token': store.state['x-token']
		},
		onUploadProgress: (progressEvent) => {},
		onDownloadProgress: (progressEvent) => {},
	});
}

// 添加响应拦截器
Axios.interceptors.request.use((config) => {
	// 在发送请求之前做些什么
//	config.headers['O-TAKEN'] = "xxxxxxx";
//	console.log(config);
	return config;
}, (error) => {
	// 对请求错误做些什么
	return Promise.reject(error);
});

// 添加响应拦截器
Axios.interceptors.response.use((response) => {
	// 对响应数据做点什么
//	console.log(response)
	switch(response.data.code) {
		case 401: // 请求未授权
			break;
		case 200: // 正常
			store.commit(ACTIVE_TIME);
			break;
		case 500: // 服务器异常
			break;
		case 999: // token过期
			store.commit(EXIT);
			router.push('/');
			break;
		default:
			break;
	}
	return response.data;
}, (error) => {
	// 对响应错误做点什么
	return Promise.reject(error);
});

export default axios