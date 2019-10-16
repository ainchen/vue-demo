export const PATH = 'url';
export const NAME = 'url';
export const ID = 'id';
export const SHOWNAME = 'name';

const META = (key) => {
	return {
		requireAuth: true
	}
}

export const strParse = (str) => {
	return typeof str === 'undefined' ? '' : 'XY_'+str.replace(/[^0-9A-Za-z_]/g, '');
}

const pages = (url) => {
	return () => {
		try {
			// return Promise.resolve(require('../pages/workspace/' + url));
			return () => import('@/pages/workspace/' + url)
		} catch (error) {
			return import('@/pages/404/Error');
		}
	};
}

export const treeToRoute = (treeList, routes, isRoot) => {
	for (var n = 0; n < treeList.length; n += 1) {
		routes.push({
			"path": (isRoot ? '/' : '') + treeList[n][PATH],
			"name": strParse(treeList[n][NAME]),
			"meta": META(treeList[n][PATH]),
			"component": pages(strParse(treeList[n][PATH]))
		});
		if (typeof treeList[n].children !== 'undefined' && treeList[n].children.length > 0) {
			routes[n].children = [];
			treeToRoute(treeList[n].children, routes[n].children, false);
		}
	}
}

export const getNochildren = (treeList, result) => {
	for (var n = 0; n < treeList.length; n += 1) {
		if (typeof treeList[n].children !== 'undefined' && treeList[n].children.length > 0) {
			getNochildren(treeList[n].children, result);
		} else {
			result.push(treeList[n]);
		}
	}
}

export const getParents = (treeList, result, item, level) => {
	for (var n = 0; n < treeList.length; n += 1) {
		if (parseInt(level) > 0) {
			if (typeof treeList[n].children !== 'undefined' && treeList[n].children.length > 0) {
				if (getParents(treeList[n].children, result, item, parseInt(level) - 1)) {
					result.unshift(treeList[n]);
					return true;
				}
			}
		} else if (parseInt(level) == 0){
			if (treeList[n][ID] == item[ID]) {
				result.unshift(treeList[n]);
				return true;
			}
		} else {
			if (typeof treeList[n].children !== 'undefined' && treeList[n].children.length > 0) {
				if (getParents(treeList[n].children, result, item, parseInt(level))) {
					result.unshift(treeList[n]);
					return true;
				}
			} else {
				if (treeList[n][ID] == item[ID]) {
					result.unshift(treeList[n]);
					return true;
				}
			}
		}
	}
	return false;
}

export const getChildCount = (ids, level, item) => {
	let count = 1;
	if (!ids[level] || ids[level] != item[ID] || !item.children) {
		return count;
	}
	for (var n = 0; n < item.children.length; n += 1) {
		count += getChildCount(ids, level + 1, item.children[n]);
	}
	return count;
}

export const getHasKey = (list, res, key, level) => {
	if (typeof list === 'undefined' || typeof res === 'undefined') {
		return false;
	}
	for (var n = 0; n < list.length; n += 1) {
		if (list[n][SHOWNAME].indexOf(key) >= 0) {
			list[n].level = level;
			res.push(list[n]);
			// res.push({
			// 	'children': list[n]['children'],
			// 	'code': list[n]['code'],
			// 	'icon': list[n]['icon'],
			// 	'menuId': list[n]['menuId'],
			// 	'name': list[n]['name'],
			// 	'operations': list[n]['operations'],
			// 	'sortNo': list[n]['sortNo'],
			// 	'status': list[n]['status'],
			// 	'type': list[n]['type'],
			// 	'url': list[n]['url'],
			// 	'level': level
			// });
		}
		if (list[n].children && list[n].children.length > 0) {
			getHasKey(list[n].children, res, key, level+1);
		}
	}
}