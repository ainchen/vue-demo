import {
	EXIT
} from './mutation-types'

import store from '@/store';

export default {
	isLogin: (state) => (k) => {
		if (typeof k === 'undefined') {
			return 0;
		} else {
			if (!k) {
				return true;
			} else if (state['x-token']) {
				const d = new Date();
				if (d.getTime() - state['active-time'] <= 1800000) {
					return 1;
				} else {
					store.commit(EXIT);
					return -1;
				}
	
			} else {
				return -1;
			}
		}
	}
}