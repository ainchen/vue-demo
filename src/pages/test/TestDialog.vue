<template>
	<el-dialog :title="form.title" :visible.sync="display" width="30%" :before-close="handleClose">
		<span>{{form.msg}}</span>
		<input type="text" v-model="form.msg">
		<span slot="footer" class="dialog-footer">
			<el-button @click="canal()">取 消</el-button>
			<el-button type="primary" @click="ok()">确 定</el-button>
		</span>
	</el-dialog>
</template>

<script>
	// import x from '@/x'

	export default {
		name: 'TestDialog',
		props: ['show', 'param'], // 注册父级传递的参数
		components: { //组件
		},
		data () { //数据
			return {
			}
		},
		computed: { //计算属性
			display: {
				get () {
					return this.show;
				},
				set (val) {
					this.$emit("display", val);
				}
			},
			form: {
				get () {
					return this.param;
				},
				set (val) {
					this.$emit("form", val);
				}
			}
		},
		methods: { //方法
			handleClose(close) {
				close();
			},
			ok () {
				this.display = false;
			},
			canal () {
				this.display = false;
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