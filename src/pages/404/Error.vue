<template>
	<div>
		出错了<br />
		{{d}}<br/>
		{{d | dateFormat}}<br/>
		{{msg}}<br/>
		<el-button @click="back()">返回首页</el-button>
	</div>
</template>

<script>

	export default {
		name: 'Error',
		components: { //组件
		},
		data() { //数据
			return {
				msg: '',
				d: 12343232434
			}
		},
		computed: { //计算属性
		},
		methods: { //方法
			back: function() {
				this.$router.push({
					name: 'workspace'
				});
			}
		},
		watch: { //监听
			'msg' (to, from) {
			}
		},
		filters: { // 定于过滤器
		},
		beforeCreate: function() {//创建前，属性计算之前
		},
		created: function() {//属性已有，结构未渲染
		},
		beforeMount: function() {//模板挂载前
		},
		mounted: function() {//模板挂载后
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
</style>