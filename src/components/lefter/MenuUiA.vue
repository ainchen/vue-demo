<template>
	<div id="menu" :class="{'active': state}" @click="main($event)">
		<div class="el-row">
			<div class="el-col-24">
				<el-input v-model="searchKey" placeholder="请输入内容">
					<el-button class="search" slot="append" @click="search()">
						<fa-icon :icon="menuIcon"></fa-icon>
					</el-button>
				</el-input>
			</div>
		</div>
		<div class="el-row">
			<div class="collapse" @click="collapse_1 = !collapse_1">
				<el-button type="primary" icon="el-icon-arrow-down" circle v-show="collapse_1"></el-button>
				<el-button type="primary" icon="el-icon-arrow-right" circle v-show="!collapse_1"></el-button>
				快捷菜单
				<el-button class="el-pagination__rightwrapper" type="primary"
					icon="el-icon-setting" circle v-show="!optation"
					@click="setOptation($event)"></el-button>
				<el-button class="el-pagination__rightwrapper" type="primary"
					icon="el-icon-check" circle v-show="optation"
					@click="setOptation($event)"></el-button>
			</div>
		</div>
		<ul class="customs" v-show="collapse_1" @click="stopPropagation($event)">
			<draggable v-model="customs" animation="1500"
				:options="{disabled: !optation,ghostClass:'ghost',dragClass:'drag'}"
				@end="dragAfter" @start="dragBefore">
				<li class="item" v-for="x in customsList" @click="menuClick(x, -1)" :key="x.id">
					<div class="icon">
						<fa-icon :icon="['fas', x.icon]"></fa-icon>
					</div>
					<div class="text">
						{{x.name}}
					</div>
					<div class="optation top" v-show="optation && !drag">
						<fa-icon :icon="['fas', 'arrows-alt']"></fa-icon>
					</div>
					<div class="optation bottom" v-show="optation && !drag" @click="customsDel($event, x.customId)">
						<fa-icon :icon="['fas', 'trash-alt']"></fa-icon>
					</div>
				</li>
			</draggable>
			<li class="item-none" v-show="customs.length <= 0">
				暂无
			</li>
		</ul>
		<div class="el-row">
			<div class="collapse" @click="collapse_2 = !collapse_2">
				<el-button type="primary" icon="el-icon-arrow-down" circle v-show="collapse_2"></el-button>
				<el-button type="primary" icon="el-icon-arrow-right" circle v-show="!collapse_2"></el-button>
				主菜单
			</div>
		</div>
		<transition-group name="itemlist" tag="div" class="mainMenu" v-show="collapse_2">
			<ul :class="'list list_'+k" v-for="(i,k) in list" @click="stopPropagation($event)" :key="k">
				<li class="item" v-for="x in i" @click="menuClick(x, k)"
					:class="{'hasChild': x.children, 'active': active[k] && active[k].menuId == x.menuId}"
					:key="x.id">
					<div class="icon">
						<fa-icon :icon="['fas', x.icon]"></fa-icon>
					</div>
					<div class="text">
						{{x.name}}
					</div>
					<div class="optation" v-show="!x.children && optation" @click="customsPost($event, x)">
						<fa-icon :icon="['fas', 'external-link-alt']"></fa-icon>
					</div>
				</li>
			</ul>
		</transition-group>
	</div>
</template>

<script>
	import {
		menusAuth,
		customsGet,
		customsPost,
		customsPut,
		customsDel
	} from '@/config/getData'

	import {
		LOAD_CREATE,
		LOAD_DESTORY,
		MENU_STATE,
		MENU_GOTO
	} from '@/store/mutation-types'

	import draggable from 'vuedraggable'

	export default {
		name: 'MenuUi',
		components: { //组件
			draggable
		},
		data() { //数据
			return {
				icon: 'xxx',
				active: [],
				customs: [],
				searchKey: "",
				collapse_1: true,
				collapse_2: true,
				optation: false,
				drag: false
			}
		},
		computed: { //计算属性
			data () {
				return this.$store.state['menu'];
			},
			list () {
				let arr = [];
				this.getHasKeys(arr, 0, this.data, this.searchKey.replace(/\s*/g,"") !== '');
				return arr;
			},
			customsList () {
				let l = [], r = new RegExp(this.searchKey.replace(/\s*/g,""));
				for (let n=0; n<this.customs.length; n+=1) {
					if (this.customs[n].name.match(r)) {
						l.push(this.customs[n]);
					}
				}
				return l;
			},
			state () {
				return this.$store.state['menu-active'];
			},
			menuIcon () {
				return this.state ? ['fas','search'] : ['fas','bars'];
			},
			menuHistory () {
				return this.$store.state['menu-history'];
			}
		},
		methods: { //方法
			main (e) {
				this.stopPropagation(e);
				this.$store.commit(MENU_STATE, true);
			},
			init () {
				this.customsGet();
			},
			stopPropagation (e) {
				e.stopPropagation();
			},
			menuClick (item, index) {
				if (item) {
					if (index < 0) {
						this.searchKey = '';
						this.$store.commit(MENU_STATE, false);
						this.$store.commit(MENU_GOTO, item);
						this.active = [];
						this.listActiveInit(0, this.data);
					} else {
						while (this.active.length <= index){
							this.active.push(null);
						}
						this.active.splice(index, this.active.length, item);
						if (!item.children) {
							this.$store.commit(MENU_STATE, false);
							this.$store.commit(MENU_GOTO, item);
						}
					}
				}
				console.log(this.active);
			},
			search () {
				this.$store.commit(MENU_STATE, true);
				if (this.searchKey.replace(/\s*/g,"") === '') {
					this.listActiveInit(0, this.data);
				} else {
					this.active = [];
				}
			},
			getHasKeys (list, level, data, lock) {
				let r = new RegExp(this.searchKey.replace(/\s*/g,""));
				while (list.length <= level){
					list.push([]);
				}
				if (typeof list[level] !== 'object') {
					list[level] = [];
				}
				for (let n=0; n<data.length; n+=1) {
					if (lock) {
						if (data[n].name.match(r)) {
							list[level].push(data[n]);
						}
					} else {
						list[level].push(data[n]);
					}
				}
				lock = lock && !this.active[level];
				for (let n=0; n<data.length; n+=1) {
					if (lock) {
						if (data[n].children && typeof data[n].children === 'object') {
							this.getHasKeys(list, parseInt(level)+1, data[n].children, lock);
						}
					} else {
						if (data[n].children && typeof data[n].children === 'object' &&
							this.active[level] == data[n]) {
							this.getHasKeys(list, parseInt(level)+1, data[n].children, lock);
						}
					}
				}
			},
			listActiveInit (level, data) {
				if (this.menuHistory.length <= 0) {
					this.active = [];
					return false;
				}
				let id = this.menuHistory[0].menuId;
				while (this.active.length < level){
					this.active.push(null);
				}
				for (let n=0; n<data.length; n+=1) {
					if (data[n].menuId === id) {
						this.active[level] = data[n];
						return true;
					} else if (data[n].children && typeof data[n].children === 'object') {
						if (this.listActiveInit(parseInt(level)+1, data[n].children)) {
							this.active[level] = data[n];
							return true;
						}
					}
				}
				return false;
			},
			setOptation (e) {
				e.stopPropagation();
				this.optation = !this.optation;
			},
			customsGet () {
				this.$store.commit(LOAD_CREATE);
				customsGet().then((res) => {
					if (res.code == 200) {
						this.customs = res.data;
					}
					this.$nextTick(()=>{
						this.$store.commit(LOAD_DESTORY);
					});
				},(err) => {
					this.$nextTick(()=>{
						this.$store.commit(LOAD_DESTORY);
					});
					console.log(err);
				});
			},
			dragBefore (evt) {
				console.log(evt);
				this.drag = true;
			},
			dragAfter (evt) {
				console.log(this.customs);
				this.drag = false;
				this.$store.commit(LOAD_CREATE);
				for (let n=0; n<this.customs.length; n+=1) {
					this.customs[n].sort = n+1;
				}
				customsPut(this.customs).then((res) => {
					if (res.code == 200) {
						this.$message({
							type: 'success',
							message: '操作成功！！',
							center: true,
							showClose: true
						});
					}
					this.$nextTick(()=>{
						this.$store.commit(LOAD_DESTORY);
					});
					this.customsGet();
				}, () => {
					this.$nextTick(()=>{
						this.$store.commit(LOAD_DESTORY);
					});
					console.log(err);
				});
			},
			customsPost (e, item) {
				e.stopPropagation();
				this.$store.commit(LOAD_CREATE);
				customsPost({
					menuId: item.menuId,
					userId: this.$store.state['userInfo'].userId
				}).then((res) => {
					if (res.code == 200) {
						this.$message({
							type: 'success',
							message: '添加成功！！',
							center: true,
							showClose: true
						});
					}
					this.$nextTick(()=>{
						this.$store.commit(LOAD_DESTORY);
					});
					this.customsGet();
				},(err) => {
					this.$nextTick(()=>{
						this.$store.commit(LOAD_DESTORY);
					});
					console.log(err);
				})
			},
			customsDel (e, id) {
				e.stopPropagation();
				this.$store.commit(LOAD_CREATE);
				customsDel(id).then((res) => {
					if (res.code == 200) {
						this.$message({
							type: 'success',
							message: '删除成功！！',
							center: true,
							showClose: true
						});
					}
					this.$nextTick(()=>{
						this.$store.commit(LOAD_DESTORY);
					});
					this.customsGet();
				},(err) => {
					this.$nextTick(()=>{
						this.$store.commit(LOAD_DESTORY);
					});
					console.log(err);
				})
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
			this.$store.commit(LOAD_CREATE);
		},
		created: function() {//属性已有，结构未渲染
			this.init();
		},
		beforeMount: function() {//模板挂载前
		},
		mounted: function() {//模板挂载后
			this.$nextTick(()=>{
				this.$store.commit(LOAD_DESTORY);
			});
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
	#menu {
		position: fixed;
		z-index: 503;
		top: 0px;
		left: 0px;
		bottom: 0px;
		overflow: auto;
		margin: 0px;
		width: 48.6rem;
		background: #273A5B;
		border-right: 1px solid #1E1E1E;
		transform: translateX(-100%) translateX(3rem);
		transition: transform 1s cubic-bezier(.55, 0, .1, 1);
	}
	#menu.active {
		transform: translateX(0%);
	}

	.search {
		font-size: 1.2rem;
		font-weight: 100;
		padding-left: 0.7rem;
		padding-right: 0.7rem;
	}

	.itemlist-enter-active,
	.itemlist-leave-active {
		transition: all 1s;
	}

	.itemlist-enter {
		opacity: 0;
		transform: scale(0.9)
	}
	.itemlist-leave-active {
		opacity: 0;
		transform: scale(1.1)
	}

	.collapse {
		width: auto;
		padding: 0.5rem 3rem 0.5rem 1rem;
		/*padding: 0.5rem 1rem 0.5rem 1rem;*/
		/*margin-right: 3rem;*/
		font-size: 1.2rem;
		line-height: 2rem;
		border-bottom: 1px solid #000000;
		background: rgba(255,255,255,0.05);
	}
	.collapse>.el-button {
		padding: 0.5rem;
		margin: 0px;
		color: #d0cccc;
		background-color: #1564b7;
		border-color: #0d3967;
	}
	.customs {
		margin: 0.5rem 2.3rem 0.5rem 1rem;
		padding: 0px;
	}
	.customs .item-none {
		font-size: 1.5rem;
	}
	.customs::after {
		display: block;
		content: '';
		clear: both;
	}
	.mainMenu {
		position: relative;
		height: 100px;
	}
	.list {
		position: absolute;
		top: 0px;
		width: 10.4rem;
		margin: 0.5rem;
		padding: 0px;
	}
	.list.list_0 {
		left: 0.5rem;
	}
	.list.list_1 {
		left: 11.9rem;
	}
	.list.list_2 {
		left: 23.3rem;
	}
	.list.list_3 {
		left: 34.7rem;
	}
	.customs .item,
	.list .item {
		position: relative;
		float: left;
		width: 4rem;
		height: 4.5rem;
		background: #34504e;
		margin-bottom: 0.5rem;
		margin-right: 1rem;
		border: 1px solid transparent;
		border-radius: 0.25rem;
		cursor: pointer;
		overflow: hidden;
		box-shadow: 0px 15px 30px rgb(0,0,0,0.5);
	}
	.customs .item:hover,
	.list .item:hover {
		transform: translateY(-0.2rem);
		box-shadow: 0px 15px 30px rgb(0,0,0,1);
	}
	.list .item.hasChild {
		background: #4b4065;
		border-radius: 0.5rem;
	}
	.list .item.active {
		border-color: #CF9236;
		background: #ab4141;
	}
	.customs .item .icon,
	.list .item .icon {
		width: 4rem;
		height: 2.5rem;
		text-align: center;
		font-size: 2rem;
		color: #a0a09e;
	}
	.customs .item .text,
	.list .item .text {
		text-align: center;
		font-size: 1rem;
		line-height: 1;
		color: #a0a09e;
	}
	.customs .item .optation,
	.list .item .optation {
		position: absolute;
		top: 0px;
		left: 0px;
		right: 0px;
		bottom: 0px;
		background: rgba(0,0,0,0.4);
		color: #cac2c2;
		text-align: center;
		line-height: 3rem;
		font-size: 1.5rem;
		box-shadow: 0px 15px 30px rgb(0,0,0,0.4) inset;
	}
	.customs .item .optation.top {
		bottom: 51%;
		line-height: 2.25rem;
		font-size: 1.2rem;
	}
	.customs .item .optation.bottom {
		top: 51%;
		line-height: 2.25rem;
		font-size: 1.2rem;
	}
	.customs .item .optation:hover,
	.list .item .optation:hover {
		color: #FF4D51;
		background: rgba(0,0,0,0.2);
		box-shadow: 0px 15px 30px rgb(0,0,0,0.2) inset;
	}
	.customs .item.ghost {
		opacity: 0;
	}
	.customs .item.drag .optation.bottom {
		opacity: 0;
	}
</style>