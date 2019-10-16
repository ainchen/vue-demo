<template>
	<div id="menu" :class="{'active': active}" @click="main($event)">
		<div class="bars">
			<div class="bar">
				<fa-icon :icon="['fas','bars']"></fa-icon>
			</div>
			<el-input v-model="searchKey" placeholder="搜索关键字" v-if="active" clearable>
				<i slot="prefix" class="el-input__icon el-icon-search"></i>
			</el-input>
		</div>
		<scroll-view class="menuList" scroll-y ref="menu">
			<menu-tree v-for="(item, index) in list" :key="index" :item='item' :level='item.level' v-on:menuClick="reset"></menu-tree>
			<div class="line"></div>
		</scroll-view>
	</div>
</template>

<script>
	import {
		MENU_STATE,
		MENU_GOTO
	} from '@/store/mutation-types'

	import {
		getHasKey
	} from '@/router/config';

	import ScrollView from '@/components/common/ScrollView'
	import MenuTree from './MenuTreeC'

	export default {
		name: "MenuUi",
		props: ["param"], // 注册父级传递的参数
		components: {
			ScrollView,
			MenuTree
		},
		data() {
			//数据
			return {
				searchKey: "",
				list: []
			};
		},
		computed: {
			active () {
				return this.$store.state['menu-active'];
			},
			menuIcon () {
				return this.active ? ['fas','search'] : ['fas','bars'];
			},
			menu () {
				return this.$store.state['menu'];
			}
		},
		methods: {
			stopPropagation (e) {
				e ? e.stopPropagation() : '';
			},
			main (e) {
				this.stopPropagation(e);
				this.$store.commit(MENU_STATE, true);
			},
			search () {
				if (this.searchKey.replace(/\s/g, '') == '') {
					this.list = this.menu;
				} else {
					this.list = [];
					getHasKey(this.menu, this.list, this.searchKey, 0);
				}
				console.log(this.list);
				this.reset();
			},
			reset () {
				setTimeout(()=>{
					this.$refs.menu.windowResize();
				}, 1000);
			}
		},
		watch: {
			'searchKey' (nv, ov) {
				if (nv == ov) {
					return;
				}
				this.search();
			}
		},
		beforeCreate() {
			//创建前，属性计算之前
		},
		created() {
			//属性已有，结构未渲染
			this.search();
		},
		beforeMount() {
			//模板挂载前
		},
		mounted() {
			//模板挂载后
		},
		beforeUpdate() {
			//组件更新前
		},
		updated() {
			//组件更新后
		},
		beforeDestory() {
			//组件销毁前
		},
		destoryed() {
			//组件销毁后
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	#menu {
		position: fixed;
		display: flex;
		flex-direction: column;
		z-index: 503;
		top: 0px;
		left: 0px;
		bottom: 0px;
		overflow: hidden;
		margin: 0px;
		width: 52px;
		background: linear-gradient(to left, rgb(39, 58, 91) , rgb(86, 75, 148));
		border-right: 1px solid #1E1E1E;
		transition: all 0.3s ease-in;
	}
	#menu.active {
		width: 24rem;
	}
	#menu .bars {
		padding: 10px;
		font-size: 2rem;
		color: #FFFFFF;
		display: flex;
	}
	#menu .bars>.bar {
		flex-grow: 0;
		flex-shrink: 0;
		margin-right: 10px;
	}
	#menu .bars>.el-input {
		flex-grow: 1;
		flex-shrink: 1;
	}
	#menu .menuList .line {
		height: 15px;
	}
</style>