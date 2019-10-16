<template>
	<div id="workspace" @click="warp()">
		<menu-ui ref="menu"></menu-ui>
		<header-ui></header-ui>
		<transition :name="transitionName">
			<router-view class="child-view"/>
		</transition>
	</div>
</template>

<script>

	import {
		LOAD_CREATE,
		LOAD_DESTORY,
		MENU_STATE,
		MENU_REDUCE
	} from '@/store/mutation-types'

	import MenuUi from '@/components/lefter/MenuUiC'
	import HeaderUi from '@/components/header/HeaderUi'

	export default {
		name: 'Workspace',
		components: { //组件
			MenuUi,
			HeaderUi
		},
		data: function () {
			return {
				transitionName: 'slide-left'
			}
		},
		methods: {
			warp () {
				this.$store.commit(MENU_STATE, false);
				if (this.$store.state['menu-history'].length > 0) {
					this.$store.commit(MENU_REDUCE, {
						item: this.$store.state['menu-history'][0],
						level: -1
					});
				}
				this.$refs.menu.reset();
			}
		},
		beforeCreate: function() {//创建前，属性计算之前
			this.$store.commit(LOAD_CREATE);
		},
		mounted: function() {//模板挂载后
			this.$nextTick(()=>{
				this.$store.commit(LOAD_DESTORY);
			});
		},
	}
</script>

<style scoped>
	#workspace {
		overflow: hidden;
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center center;
	}
	#workspace .child-view {
		top: 70px;
		bottom: 10px;
		left: 62px;
		right: 10px;
		padding: 5px;
		overflow: hidden;
		border-radius: 10px;
		border: 1px solid #D9D9D9;
		background: #FFFFFF;
		box-shadow: 0px 15px 30px rgb(0,0,0,0.5);
	}
</style>