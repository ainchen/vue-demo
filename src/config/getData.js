import axios from './axios';
//服务器地址
export const BASE_PATH = 'http://192.168.80.16:3003';
// export const BASE_PATH = 'http://17bc388113.iok.la:53211';
//版本
const version = '/v1';
//登录
export const login = ({username, password}) => axios('/login', 'post', {
	'username': username,
	'password': password
});
//退出
export const exit = () => axios('/exit', 'get');
//获取菜单
export const menusAuth = () => axios(version + '/menus/auth', 'get');
//自定义菜单的获取，新增，修改，删除
export const customsGet = () => axios(version + '/customs', 'get');
export const customsPost = ({
	menuId,
	sort = 0,
	userId		
}) => axios(version + '/customs', 'post', {
	menuId,
	sort,
	userId
});
export const customsPut = (customs) => axios(version + '/customs/23', 'put', customs);
export const customsDel = (customId) => axios(version + '/customs/' + customId, 'delete');
//修改密码
export const setPassword = ({
	oldPassword,
	password,
	userId
}) => axios(version + '/password', 'put', {
	oldPassword,
	password,
	userId
});
//获取教室树 campuses/tree
export const campusesTree = () => axios(version + '/campuses/tree', 'get');