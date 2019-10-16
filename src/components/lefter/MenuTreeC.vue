<template>
	<div class="menuTree" @click="menuClick($event)" :class="{'active': active}">
		<div class="menuItem">
			<div class="icon">
				<template v-if="menuActive">
					<fa-icon :icon="['fas', data.icon]"></fa-icon>
				</template>
				<el-tooltip effect="dark" :content="data.name" placement="right" v-else>
					<fa-icon :icon="['fas', data.icon]"></fa-icon>
				</el-tooltip>
			</div>
			<div class="text" v-show="menuActive">
				{{data.name}}
			</div>
			<div class="next" v-show="menuActive" v-if="data.children && data.children.length > 0"></div>
		</div>
		<div class="children" v-if="data.children && data.children.length > 0" :style="{'height': childrenHeight}" v-show="menuActive">
			<menu-tree v-for="(item, index) in data.children" :key="index" :item='item' :level="treelevel+1"
				:ref="'item_'+index" v-on:menuClick="menuClickThen"></menu-tree>
		</div>
	</div>
</template>

<script>
	import {
		MENU_STATE,
		MENU_REDUCE,
		MENU_GOTO
	} from '@/store/mutation-types'

	import {
		ID,
		getChildCount
	} from '@/router/config';

	export default {
		name: 'MenuTree',
		props: ['item', 'level'], // 注册父级传递的参数
		components: { //组件
		},
		data () { //数据
			return {
			}
		},
		computed: { //计算属性
			menuActive () {
				return this.$store.state['menu-active'];
			},
			active () {
				return this.$store.state['menu-level'][this.treelevel] == this.data[ID];
			},
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
			childrenHeight () {
				let len = this.getLenght();
				if (this.menuActive) {
					return 'calc(10px * ' + (len > 1 ? 1 : 0) + ' + (2rem + 23px) * ' + (len - 1) + ')';
				} else {
					return '0px';
				}
			}
		},
		methods: { //方法
			menuClick (e) {
				e.stopPropagation();
				if (!this.menuActive || !this.active) {
					this.$store.commit(MENU_REDUCE, {
						item: this.data,
						level: this.treelevel
					});
				} else {
					this.$store.state['menu-level'].splice(this.treelevel, this.$store.state['menu-level'].length);
				}
				if (this.data.children && this.data.children.length > 0) {
					this.$store.commit(MENU_STATE, true);
				} else {
					//跳转
					this.$store.commit(MENU_STATE, false);
					this.$store.commit(MENU_GOTO, this.data);
				}
				this.menuClickThen();
			},
			menuClickThen () {
				this.$nextTick(()=>{
					this.$emit("menuClick");
				});

			},
			getLenght () {
				let len = 1;
				if (this.data.children && this.active) {
					for (let n=0; n<this.data.children.length; n+=1) {
						len += this.$refs['item_' + n] ? this.$refs['item_' + n][0].getLenght() : 0;
					}
				}
				return len;
			}
		},
		beforeCreate () {//创建前，属性计算之前
		},
		created () {//属性已有，结构未渲染
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
	.menuTree {
		width: 100%;
		margin-top: 3px;
		background: linear-gradient(to left, rgb(39, 58, 91) , rgb(86, 75, 148));
	}
	.menuTree>.menuItem {
		padding: 10px 15px;
		font-size: 1.5rem;
		display: flex;
		box-sizing: border-box;
		box-shadow: 0px 0px 30px 3px #00000021;
		cursor: pointer;
	}
	.menuTree.active>.menuItem,
	.menuTree>.menuItem:hover {
		background: #00000060;
	}
	.menuTree>.menuItem>.icon {
		width: 2rem;
		height: 2rem;
		color: #c2bcf0;
	}
	.menuTree>.menuItem>.text {
		width: 4rem;
		height: 2rem;
		overflow: hidden;
		flex-grow: 1;
		flex-shrink: 1;
		margin: 0px 10px;
		color: #7d89ce;
	}
	.menuTree>.menuItem>.next {
		position: relative;
		width: 2rem;
		height: 2rem;
		background: #727fc5;
		box-shadow: 0px 0px 30px 3px #00000021;
		border-radius: 5px;
		opacity: 0.2;
	}
	.menuTree>.menuItem:hover>.next {
		opacity: 1;
	}
	.menuTree>.menuItem>.next::before,
	.menuTree>.menuItem>.next::after {
		position: absolute;
		top: 0px;
		left: 0px;
		right: 0px;
		bottom: 0px;
		margin: auto;
		display: block;
		content: '';
		width: 60%;
		height: 2px;
		background: #000;
		transition: all 0.3s ease-in;
	}
	.menuTree>.menuItem>.next::before {
		transform: rotate(-360deg);
	}
	.menuTree>.menuItem>.next::after {
		transform: rotate(-450deg);
	}
	.menuTree.active>.menuItem>.next::before,
	.menuTree.active>.menuItem>.next::after {
		transform: rotate(0deg);
	}
	.menuTree>.children {
		padding-left: 15px;
		overflow: hidden;
		transition: all 0.3s ease-in;
	}

</style>