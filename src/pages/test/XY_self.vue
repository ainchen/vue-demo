<template>
	<div>
		123XY_self
	</div>
</template>

<script>

	import {
		campusesTree
	} from '@/config/getData'

	import Composition from '@/components/common/Composition'
	import ScrollView from '@/components/common/ScrollView'
	// import TestDialog from './TestDialog'

	for (let n=0; n<100; n+=1) {
		console.log(n);
	}

	export default {
		name: 'XY_self',
		props: ['param'], // 注册父级传递的参数1534759990103
		components: { //组件
			Composition,
			ScrollView,
			// TestDialog
		},
		data() { //数据
			return {
				d: new Date(),
				e: {
//					'proportion': ["100% - 90px", "40px", "50px"]
//					'proportion': [1, 2, 3, 4]
					'proportion': ["20rem", "100% - 20rem"]
				},
				tree: [],
				TestDialogShow: false,
				form: {
					title: "测试123",
					msg: "zzzzzxxsxsac"
				}
			}
		},
		computed: { //计算属性
		},
		methods: { //方法
			append (e, n, d) {
				e.stopPropagation();
				console.log(n, d);
			},
			remove (e, n, d) {
				e.stopPropagation();
				console.log(n, d);
			},
			DialogShow (val) {
				this.TestDialogShow = val;
			},
			setParam (val) {
				this.form = val;
			}
		},
		filters: {
			str (val) {
				try{
					return JSON.stringify(val);
				}catch(e){
					return val + "";
				}
			}
		},
		beforeCreate: function() {//创建前，属性计算之前
		},
		created: function() {//属性已有，结构未渲染
			campusesTree().then((res) => {
				if (res.code == 200) {
					this.tree = res.data;
				}
			}, (err) => {
				console.log(err);
			});
		},
		beforeMount: function() {//模板挂载前
		},
		mounted: function() {//模板挂载后
		},
		beforeUpdate: function() {//组件更新前
		},
		updated: function() {//组件更新后
		},
		beforeDestory: function() {//组件销毁前
		},
		destoryed: function() {//组件销毁后
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	/*@import './x.css'*/
	.custom-tree-node {
		width: 100%;
		height: 100%;
		line-height: 26px;
	}
	.custom-tree-node .optation {
		opacity: 0;
	}
	.custom-tree-node:hover .optation {
		opacity: 1;
	}
	.custom-tree-node .optation .s:hover {
		color: #ce882f
	}
	.tree-wrap {
		height: 100%;
	}
	.main {
		height: 100%;
	}
</style>