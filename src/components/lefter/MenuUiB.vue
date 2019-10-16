<template>
	<div id="menu" :class="{'active': active}" @click="main($event)">
		<div class="el-col-24" @click="stopPropagation($event)">
			<el-input v-model="searchKey" placeholder="搜索关键字">
				<el-button class="search" slot="append" @click="search()">
					<fa-icon :icon="menuIcon"></fa-icon>
				</el-button>
			</el-input>
		</div>
		<scroll-view scroll-y class="menu-main">
			<div class="el-row">
				<menu-tree v-for="(item, index) in menu" :key="index" :item="item" :index="index"></menu-tree>
			</div>
		</scroll-view>
		<div class="back" @click="back($event)">
			<div class="icon" v-if="active">
				<fa-icon :icon="['fas', 'chevron-left']" class="twinkle"></fa-icon>
				<fa-icon :icon="['fas', 'chevron-left']"></fa-icon>
			</div>
			<div class="icon" v-else>
				<fa-icon :icon="['fas', 'chevron-right']"></fa-icon>
				<fa-icon :icon="['fas', 'chevron-right']" class="twinkle"></fa-icon>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		MENU_STATE,
		MENU_GOTO
	} from '@/store/mutation-types'

	import ScrollView from '@/components/common/ScrollView'
	import MenuTree from './MenuTreeB'

	export default {
		name: 'MenuUi',
		components: { //组件
			ScrollView,
			MenuTree
		},
		data() { //数据
			return {
				searchKey: ""
			}
		},
		computed: { //计算属性
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
		methods: { //方法
			main (e) {
				this.stopPropagation(e);
				this.$store.commit(MENU_STATE, true);
			},
			back (e) {
				this.stopPropagation(e);
				this.$store.commit(MENU_STATE, !this.active);
			},
			stopPropagation (e) {
				e ? e.stopPropagation() : '';
			},
			search () {
				this.main();
				console.log(this.searchKey);
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
		beforeCreate: function() {//创建前，属性计算之前
			this.$store.commit('LOAD_CREATE');
		},
		created: function() {//属性已有，结构未渲染
		},
		beforeMount: function() {//模板挂载前
		},
		mounted: function() {//模板挂载后
			this.$store.commit('LOAD_DESTORY');
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
	#menu {
		position: fixed;
		z-index: 503;
		top: 0px;
		left: 0px;
		bottom: 0px;
		overflow: auto;
		margin: 0px;
		/* width: 48.6rem; */
		width: 100%;
		background: linear-gradient(to left, rgb(39, 58, 91) , rgb(86, 75, 148));
		border-right: 1px solid #1E1E1E;
		transform: translateX(-100%) translateX(52px);
		transition: transform 0.5s ease-in;
	}
	#menu.active {
		transform: translateX(0%);
	}

	#menu .search {
		font-size: 24px;
		font-weight: 100;
		padding-left: 14px;
		padding-right: 14px;
	}

	#menu .menu-main {
		position: relative;
		float: left;
		width: calc(100% - 57px);
		height: calc(100% - 40px);
	}


	#menu .back {
		float: left;
		position: relative;
		width: 57px;
		height: calc(100% - 40px);
		text-align: center;
		background: linear-gradient(to right, rgba(255, 255, 255, 0.1) , rgb(255, 255, 255, 0.01));
	}
	#menu .back .icon {
		width: 100%;
		height: 100px;
		line-height: 100px;
		position: absolute;
		top: 0px;
		bottom: 0px;
		margin: auto;
		color: rgb(153, 127, 214);
	}
	.twinkle {
		animation: twinkle 1s ease-in-out infinite;
	}


	@keyframes twinkle {
		0% {opacity: 0.3;}
		50% {opacity: 1;}
		100% {opacity: 0.3;}
	}
</style>