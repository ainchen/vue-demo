// 日期格式化
export const dateFormat = (value, format) => {
	format = format || 'YYYY-MM-DD HH:mm';
	if (typeof format !== 'string') {
		return value;
	}
	let f = format;
	const r = /yyyy|YYYY|MM|dd|DD|hh|HH|mm|ss|SS/g;
	const d = new Date(value);
	let temp;
	while (temp = r.exec(format)) {
		switch (temp[0]){
			case 'yyyy':
			case 'YYYY':
				f = f.replace(/yyyy|YYYY/, d.getFullYear());
				break;
			case 'MM':
				f = f.replace(/MM/, d.getMonth() < 9 ? '0'+(d.getMonth()+1) : d.getMonth()+1);
				break;
			case 'dd':
			case 'DD':
				f = f.replace(/dd|DD/, d.getDate() < 10 ? '0' + d.getDate() : d.getDate());
				break;
			case 'hh':
				f = f.replace(/hh/, d.getHours() < 10 ? 'A0'+d.getHours()
				: (d.getHours() < 12 ? 'A'+d.getHours() : 'P'+(d.getHours()-12)));
				break;
			case 'HH':
				f = f.replace(/HH/, d.getHours() < 10 ? '0'+d.getHours() : d.getHours());
				break;
			case 'mm':
				f = f.replace(/mm/, d.getMinutes() < 10 ? '0'+d.getMinutes() : d.getMinutes());
				break;
			case 'ss':
			case 'SS':
				f = f.replace(/ss|SS/, d.getSeconds() < 10 ? '0'+d.getSeconds() : d.getSeconds());
				break;
		}
	}
	return f;
}
// 树图标
export const treeIcon = (value, condition) => {
	condition = condition || [{
			limit: [{
				nodeType: 1
			}],
			iconStyle: ['fas', 'school']
		},{
			limit: [{
				attributes: {
					treeLevel: 1
				}
			}],
			iconStyle: ['fas', 'map']
		},{
			limit: [{
				attributes: {
					treeLevel: 2
				}
			}],
			iconStyle: ['fab', 'delicious']
		},{
			limit: [{
				attributes: {
					treeLevel: 3
				}
			}],
			iconStyle: ['fas', 'building']
		},{
			limit: [{
				attributes: {
					treeLevel: 4
				}
			}],
			iconStyle: ['fas', 'location-arrow']
		}];

	for (let n=0; n<condition.length; n+=1) {
		let iconStyle = condition[n].iconStyle;
		for (let m=0; m<condition[n].limit.length; m+=1) {
			let limit = condition[n].limit[m];
			if (compare(limit, value)) {
				return iconStyle;
			}
		}
	}
	return [];
}
const compare = (l, k) => {
	let res = true;
	if (typeof l === 'object' && typeof k === 'object') {
		for (let n in l) {
			res = res && compare(l[n], k[n]);
		}
	} else {
		if (l !== k) {
			res = false;
		}
	}
	return res;
}
