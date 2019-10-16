<template>
	<div id="app">
		<transition :name="transitionName">
			<router-view class="child-view"/>
		</transition>
	</div>
</template>

<script>
	import {
	} from '@/store/mutation-types'

	import {
		login
	} from '@/config/getData'

	export default {
		name: 'App',
		data: function() {
			return {
				transitionName: 'slide-left'
			}
		},
		computed: {
			u: function() {
//				return this.$store.getters[X_TOKE];
			}
		},
		watch: {
			'$route' (to, from) {
				if (to.path == '/') {
					this.transitionName = 'slide-right';
				} else {
					this.transitionName = 'slide-left';
				}
			}
		},
		methods: {
		}
	}
</script>
<style>
	#app {
		height: 100%;
		width: 100%;
		background: #FFFFFF;
	}

	.child-view {
		position: absolute;
		left: 0px;
		right: 0px;
		top: 0px;
		bottom: 0px;
		width: auto;
		height: auto;
		transition: transform 1s cubic-bezier(.55, 0, .1, 1);
	}

	.slide-left-enter,
	.slide-right-leave-active {
		opacity: 0;
		transform: translate(100%, 0);
	}

	.slide-left-leave-active,
	.slide-right-enter {
		opacity: 0;
		transform: translate(-100%, 0);
	}
	.opacity-enter-active,
	.opacity-leave-active {
		transition: opacity .5s ease-in;
	}
	.opacity-enter,
	.opacity-leave-active {
		opacity: 0;
	}
	.height-enter-active,
	.height-leave-active {
		transition: height .5s ease-in;
	}
	.height-enter,
	.height-leave-active {
		height: 0px;
	}
</style>