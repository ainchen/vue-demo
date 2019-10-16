<template>
	<div>
		<composition :options="e">
			<scroll-view scroll-y slot="0" class="tree-wrap">
				<el-tree
					show-checkbox
					highlight-current
					:expand-on-click-node="false"
					:default-expand-all="true"
					:default-expanded-keys="[]"
					:data="tree"
					node-key="id">
					<div class="custom-tree-node" slot-scope="{ node, data }">
						<fa-icon :icon="data | treeIcon" class="s"></fa-icon>
						<span>{{data.name}}</span>
						<span class="optation">
							<fa-icon :icon="['fas', 'plus']" class="s" @click="($event) => append($event,data)"></fa-icon>
							<fa-icon :icon="['fas', 'edit']" class="s" @click="($event) => append($event,data)"></fa-icon>
							<fa-icon :icon="['fas', 'trash-alt']" class="s" @click="($event) => remove($event,node, data)"></fa-icon>
						</span>
					</div>
				</el-tree>
			</scroll-view>
			<scroll-view scroll-y slot="1">
				{{d}}
				{{d | dateFormat}}
				map
				laravel
				building
				layer-group
				location-arrow
				<button @click="DialogShow(true)">test1</button>
				{{form.msg}}
				<div style="height: 4000px;"></div>

				<!-- <scroll-view scroll-y>
					<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="currentPage4"
					:page-sizes="[100, 200, 300, 400]"
					:page-size="100"
					layout="total, sizes, prev, pager, next, jumper"
					:total="400">
					</el-pagination>
				</scroll-view> -->
			</scroll-view>
		</composition>
		<test-dialog :param="form" :show="TestDialogShow" @display="DialogShow" @form="setParam"></test-dialog>
	</div>
</template>

<script>

	import {
		campusesTree
	} from '@/config/getData'

	import Composition from '@/components/common/Composition'
	import ScrollView from '@/components/common/ScrollView'
	import TestDialog from './TestDialog'

	export default {
		name: 'Test',
		props: ['param'], // 注册父级传递的参数1534759990103
		components: { //组件
			Composition,
			ScrollView,
			TestDialog
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