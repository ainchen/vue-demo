<template>
	<div id="app" :style="appStyle">
		<s-header></s-header>
		<router-view/>
		<s-footer></s-footer>
	</div>
</template>

<script>
	import Logo from '@/assets/logo.png';
	import bg from '@/assets/bg.jpg';
	
	import SHeader from '@/components/part/SHeader';
	import SFooter from '@/components/part/SFooter';

	export default {
		name: 'App',
		components: {
			SHeader,
			SFooter
		},
		data: function () {
			return {
				Logo,
				appStyle: {
					width: '100%',
					height: '100%',
					background: 'url('+bg+')'
				},
				test: ''
			}
		},
		methods: {
			test1: function () {
				this.$myInfo.test = this.test;
				this.$setMyInfo(this.$myInfo);
			},
			test2: function () {
				console.log(this.$myInfo);
				console.log(window.localStorage.getItem('myInfo'))
			}
		}
	}
</script>

<style>
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
	    -webkit-appearance: none;
	}
	input[type="number"]{
	    -moz-appearance: textfield;
	}
	html,body {
		width: 100%;
		height: 100%;
		overflow: hidden;
		-moz-user-select:none;
		-webkit-user-select: none;
		-ms-user-select: none;
		-khtml-user-select:none;
		-webkit-tap-highlight-color:rgba(0, 0, 0, 0);
	}
	#app {
		padding: 60px 0px 100px;
		color: #A5A5A5;
		overflow-y: auto;
	}
	img {
		width: 100%;
		height: auto;
	}
	.btn {
		border-radius: 5px;
	}
	.form-vertical .row {
		margin-bottom: 10px;
	}
	.form-vertical .title {
		font-size: 16px;
		line-height: 34px;
	}
	table *{
		text-align: center;
	}
	table th {
		font-size: 18px;
	}
	table td {
		font-size: 22px;
	}
	a {
		cursor: pointer;
	}
	.check {
		display: inline-block;
		width: 23px;
		height: 23px;
		margin-bottom: -4px;
		margin-left: 10px;
		border-radius: 50%;
		border: 1px solid #DDDDDD;
		color: #A5A5A5;
	}
	.check_text {
		display: inline-block;
	}
</style>