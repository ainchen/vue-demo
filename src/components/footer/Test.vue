<template>
</template>

<script>
	// import x from '@/x'

	export default {
		name: 'Test',
		props: ['param'], // 注册父级传递的参数
		components: { //组件
		},
		data () { //数据
			return {
				msg: 'Welcome to Your Vue.js App'
			}
		},
		computed: { //计算属性
		},
		methods: { //方法
			func () {
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
	/*@import './x.css'*/
</style>