<template>
	<div>
		hello,hello<br/>hello,hello<br/> hello,hello
		<br/>hello,hello<br/> hello,hello
		<br/>hello,hello<br/> hello,hello
		<br/>hello,hello<br/> hello,hello
		<div>
			<div v-for="item in menuHistory" :key="item.name">
				<span @click="menuClick(item)">{{item.name}}</span>
			</div>
		</div>
		<button @click="dialogVisible = true">dialogVisible</button>

		<button @click="test()">test1</button>
		<div id="myChart" :style="{width: '300px', height: '300px'}"></div>

		<!--modal-->
		<el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
			<span>这是一段信息</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>

	import {
		menusAuth
	} from '@/config/getData'

	import {
		MENU_STATE,
		MENU_GOTO
	} from '@/store/mutation-types'

	export default {
		name: 'HelloWorld',
		components: { //组件
		},
		data() { //数据
			return {
				msg: 'Welcome to Your Vue.js App',
				dialogVisible: false,
				option: 'exit',
			}
		},
		computed: { //计算属性
			menuHistory () {
				return this.$store.state['menu-history'];
			}
		},
		methods: { //方法
			menuClick (item) {
				this.$store.commit(MENU_STATE, false);
				this.$store.commit(MENU_GOTO, item);
			},
			test() {
				this.$message({
					type: 'error', //success/warning/info/error
					message: '这是一段信息',
					center: true,
					showClose: true,
					customClass: 'rfdty',
					onClose: (r) => {
						console.log(r);
					}
				});
			},
			handleClose(close) {
				console.log('s');
				close();
			},
			drawLine() {
				// 基于准备好的dom，初始化echarts实例
				let myChart = this.$echarts.init(document.getElementById('myChart'))
				// 绘制图表
				myChart.setOption({
					title: {
						text: '在Vue中使用echarts'
					},
					tooltip: {},
					xAxis: {
						data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
					},
					yAxis: {},
					series: [{
						name: '销量',
						type: 'bar',
						data: [5, 20, 36, 10, 10, 20]
					}]
				});
			}
		},
		mounted: function() {
			this.drawLine();
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>