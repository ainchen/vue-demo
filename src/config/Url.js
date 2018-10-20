export default {
	install(Vue, options) {
		
		var baseUrl = 'http://localhost:1019/';
		var basePath = baseUrl + 'v1/'
		Vue.prototype.path = {
			'baseUrl': baseUrl,
			
			'login': baseUrl + 'login',
			'exit': baseUrl + 'exit',
			
			'account': basePath + 'account',
			'accountPage': basePath + 'account/page',
			
			'course': basePath + 'course',
			'coursePage': basePath + 'course/page',
			
			'download': basePath + 'download',
			'downloadPage': basePath + 'download/page',
			
			'file': basePath + 'file',
			'filePage': basePath + 'file/page',
			'fileUpload': basePath + 'file/upload',
			'fileDownload': basePath + '/file/download/',
			'fileReUpload': basePath + 'file/reUpload',
			
			'fileType': basePath + 'fileType',
			'fileTypePage': basePath + 'fileType/page',
			
			'role': basePath + 'role',
			'rolePage': basePath + 'role/page',
			
			'user': basePath + 'user',
			'userPage': basePath + 'user/page',
			
			'scope': basePath + 'scope/',
			'statistic': basePath + 'statistic/',
			
			'test': basePath + 'test'
		}
	}
}