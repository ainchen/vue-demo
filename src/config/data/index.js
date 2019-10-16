import axios from './axios';
//服务器地址
export const BASE_PATH = 'http://192.168.80.16:3003';
// export const BASE_PATH = 'http://17bc388113.iok.la:53211';
//版本
const version = '/v1';
//登录
export const login = ({ username, password }) => axios('/login', 'post', {
	'username': username,
	'password': password
});
//退出
export const exit = () => axios('/exit', 'get');