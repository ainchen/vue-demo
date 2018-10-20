<template>
	<footer v-if="show">
		
	</footer>
</template>

<script>
	export default {
		name: 'SFooter',
		data() {
			return {
				msg: 'Welcome to Your Vue.js App'
			}
		},
		computed: {
			show: function () {
				return this.$route.name != 'login';
			}
		},
		methods: {
			func: function() {
//				this.$route.name
			},
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	footer {
		position: absolute;
		bottom: 0px;
		left: 0px;
		width: 100%;
		height: 100px;
		background: #2A3F54;
	    z-index: 4;
	}
</style>