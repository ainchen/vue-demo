<template>
	<div class="menu-item" :class="{'active': active,'now': menuHistory}" @click="click($event)">
		<div class="padd" v-if="!active"></div>
		<div class="content" :style="{'position': active ? 'relative' : 'absolute'}">
			<div class="menu-this">
				<div class="menu-icon">
					<fa-icon :icon="['fas', data.icon]"></fa-icon>
				</div>
				<div class="menu-title">{{data.name}}</div>
				<div class="menu-plus" :class="{'active': active}" v-if="data.children && data.children.length > 0">
					<fa-icon :icon="['fas', 'minus']" v-if="active"></fa-icon>
					<fa-icon :icon="['fas', 'plus']" v-else></fa-icon>
				</div>
			</div>
			<div  v-if="data.children && data.children.length > 0 && active">
				<menu-tree  v-for="(item, index) in data.children" :key="index" :item="item" :level="treelevel+1"></menu-tree>
			</div>
		</div>
	</div>
</template>

<script>
	// import x from '@/x'
	import {
		MENU_STATE,
		MENU_REDUCE,
		MENU_GOTO
	} from '@/store/mutation-types'

	import {
		ID
	} from '@/router/config';

	import ScrollView from '@/components/common/ScrollView'

	export default {
		name: 'MenuTree',
		props: ['item', 'level'], // 注册父级传递的参数
		components: { //组件
			ScrollView
		},
		data () { //数据
			return {
				active: false
			}
		},
		computed: { //计算属性
			data: {
				get () {
					return typeof this.item === 'undefined' ? {} : this.item;
				}
			},
			treelevel: {
				get () {
					return typeof this.level === 'undefined' ? 0 : Number(this.level);
				}
			},
			menuHistory () {
				return this.$store.state['menu-level'][this.treelevel] == this.data[ID];
			}
		},
		methods: { //方法
			click (e) {
				e ? e.stopPropagation() : '';
				this.$store.commit(MENU_REDUCE, {
					item: this.data,
					level: this.treelevel
				});
				if (this.data.children && this.data.children.length > 0) {
					this.active = !this.active;
				} else {
					//跳转
					this.$store.commit(MENU_STATE, false);
					this.$store.commit(MENU_GOTO, this.data);
				}
			}
		},
		watch: {
			'menuHistory' (nv, ov) {
				if (nv == ov) {
					return;
				}
				if (this.data.children && this.data.children.length > 0) {
					this.active = nv;
				}
			}
		},
		beforeCreate () {//创建前，属性计算之前
		},
		created () {//属性已有，结构未渲染
			if (this.data.children && this.data.children.length > 0) {
				this.active = this.$store.state['menu-level'][this.treelevel] == this.data[ID];
			}
		},
		beforeMount () {//模板挂载前
		},
		mounted () {//模板挂载后
		},
		beforeUpdate () {//组件更新前
		},
		updated () {//组件更新后
		},
		beforeDestory () {//组件销毁前
		},
		destoryed () {//组件销毁后
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	/*@import './x.css'*/
	.menu-item {
		position: relative;
		float: left;
		width: 20%;
		margin: 2.5%;
		cursor: pointer;
		color: #adbcbd;
		transition: all 0.1s ease-in;
	}
	.menu-item:hover {
		transform: scale(1.1);
	}
	.menu-item.active:hover {
		transform: scale(1);
	}
	.menu-item.active {
		width: 95%;
		cursor: default;
		min-height: 100px;
		height: auto;
		background: rgb(35, 52, 78);
	}
	.menu-item.now {
		color: rgb(143, 72, 6);
		background: rgb(35, 52, 78);
		transform: scale(1.1);
	}
	.menu-item.active.now {
		color: #adbcbd;
		background: none;
		transform: scale(1);
	}
	.menu-item>.padd {
		width: 100%;
		padding-top: 60%;
		height: 0px;
	}
	.menu-item>.content {
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
		border: 1px solid #758ebb;
		border-radius: 5px;
	}
	.menu-item>.content::after {
		content: '';
		display: block;
		clear: both;
	}
	.menu-item.active>.content {
		height: auto;
	}
	.menu-item>.content>.menu-this {
		position: relative;
		width: 100%;
		height: 100%;
	}
	.menu-item.active>.content>.menu-this {
		float: left;
		width: 20%;
		height: auto;
		margin: 2.5%;
		cursor: pointer;
	}
	.menu-item .menu-title {
		width: 100%;
		height: 4rem;
		font-size: 2rem;
		line-height: 4rem;
		text-align: center;
	}
	.menu-item .menu-icon {
		width: 100%;
		height: 6rem;
		font-size: 5rem;
		line-height: 6rem;
		text-align: center;
	}
	.menu-item .menu-plus{
		position: absolute;
		top: 0px;
		right: 0px;
		width: 3rem;
		height: 3rem;
		font-size: 2rem;
		text-align: center;
		line-height: 3rem;
	}

</style>