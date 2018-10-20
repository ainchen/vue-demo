<template>
	<header v-if="show">
		<s-nav></s-nav>
		<div class="container-fluid">
			顶部
		</div>
	</header>
</template>

<script>
	import SNav from '@/components/part/SNav';
	export default {
		name: 'SHeader',
		props: {
			
		},
		components: {
			SNav
		},
		computed: {
			show: function () {
				return this.$route.name != 'login';
			}
		},
		methods: {
			c: function() {
				console.log(this.parem)
			},
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	header {
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
		z-index: 4;
		/*height: 100px;*/
		/*background: #2A3F54;*/
	}
</style>