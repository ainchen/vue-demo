<template>
	<div ref="view" class="scroll-view" @mousewheel="mousewheel($event)">
		<div ref="content" class="scroll-content" :style="{'transform': 'translate(-'+SL+'px,-'+ST+'px)'}">
			<slot></slot>
		</div>
		<div class="scroll-bar scroll-bar-x" v-if="SX && VW() < CW()" :style="{'height': thickness+'px'}" :class="{'active': scrollActive}">
			<div class="scroll-tip" :style="{'width': proportion('x') + '%','transform': 'translateX('+tipScroll('x')+'px)'}"
				@mousedown="scrollStart($event, 'x')"></div>
		</div>
		<div class="scroll-bar scroll-bar-y" v-if="SY && VH() < CH()" :style="{'width': thickness+'px'}" :class="{'active': scrollActive}">
			<div class="scroll-tip" :style="{'height': proportion('y') + '%','transform': 'translateY('+tipScroll('y')+'px)'}"
				@mousedown="scrollStart($event, 'y')"></div>
		</div>
	</div>
</template>

<script>
	// import x from '@/x'

	export default {
		name: 'ScrollView',
		props: ['scrollX','scrollY','scrollTop','scrollLeft', 'scrollWidth'], // 注册父级传递的参数
		components: { //组件
		},
		data () { //数据
			return {
				ST: 0,
				SL: 0,
				scrollActive: false
			}
		},
		computed: { //计算属性
			thickness: {
				get () {
					return typeof this.scrollWidth === 'undefined' ? 10 : this.scrollWidth;
				}
			},
			SX: {
				get () {
					return typeof this.scrollX !== 'undefined' && this.scrollX != 'false';
				}
			},
			SY: {
				get () {
					return typeof this.scrollY !== 'undefined' && this.scrollY != 'false';
				}
			},
			
		},
		methods: { //方法
			VW () {
				return this.$refs.view ? this.$refs.view.offsetWidth : 0;
			},
			VH () {
				return this.$refs.view ? this.$refs.view.offsetHeight : 0;
			},
			CW () {
				return this.$refs.content ? this.$refs.content.offsetWidth : 0;
			},
			CH () {
				return this.$refs.content ? this.$refs.content.offsetHeight : 0;
			},
			proportion (type) {
				switch(type) {
					case 'x': return (this.VW() / this.CW()) * 100;
					case 'y': return (this.VH() / this.CH()) * 100;
					default: return 0;
				}
			},
			tipScroll (type) {
				switch(type) {
					case 'x': return (this.SL / this.CW()) * this.VW();
					case 'y': return (this.ST / this.CH()) * this.VH();
					default: return 0;
				}
			},
			scrollStart (e, type) {
				e.stopPropagation();
				let x = e.clientX, y = e.clientY;
				let that = this;
				const scrollMove = function (e) {
					that.$nextTick(()=>{
						switch(type) {
							case 'x': 
								that.SL += (e.clientX - x) / (that.VW() / that.CW());
								break;
							case 'y': 
								that.ST += (e.clientY - y) / (that.VH() / that.CH());
								break;
							default: break;
						}
						that.windowResize();
						x = e.clientX;
						y = e.clientY;
					});
				}
				const scrollStop = function () {
					document.removeEventListener('mousemove', scrollMove);
					document.removeEventListener('mouseup', scrollStop);
					that.scrollActive = false;
				};
				document.addEventListener('mousemove', scrollMove);
				document.addEventListener('mouseup', scrollStop);
				this.scrollActive = true;
			},
			mousewheel (e) {
				this.$nextTick(()=>{
					if (e.wheelDelta < 0) {
						if (this.SY) {
							this.ST += 100;
						} else if (this.SX) {
							this.SL += 100;
						}
					} else {
						if (this.SY) {
							this.ST -= 100;
						} else if (this.SX) {
							this.SL -= 100;
						}
					}
				});
				this.windowResize();
			},
			windowResize () {
				this.$nextTick(()=>{
					this.SL > (this.CW() - this.VW()) ? this.SL = (this.CW() - this.VW()) : "";
					this.SL < 0 ? this.SL = 0 : "";
					this.ST > (this.CH() - this.VH()) ? this.ST = (this.CH() - this.VH()) : "";
					this.ST < 0 ? this.ST = 0 : "";
				});
			}
		},
		watch: {
			'distance': "windowResize"
		},
		beforeCreate () {//创建前，属性计算之前
		},
		created () {//属性已有，结构未渲染
			if (this.SX && typeof this.scrollLeft !== 'undefined') {
				this.SL = Number(this.scrollLeft);
			}
			if (this.SY && typeof this.scrollTop !== 'undefined') {
				this.ST = Number(this.scrollTop);
			}
		},
		beforeMount () {//模板挂载前
			window.addEventListener('resize', this.windowResize);
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
			window.removeEventListener('resize', this.windowResize);
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	/*@import './x.css'*/
	.scroll-view {
		position: relative;
		padding: 0px !important;
		overflow: hidden !important;
		width: 100%;
		height: 100%;
		scroll-behavior:smooth;
	}
	.scroll-content {
		z-index: 0;
		margin: 0px;
		min-width: 100%;
		min-height: 100%;
		padding: 0px;
		transform: translateZ(0);
	}
	.scroll-bar {
		display: none;
		position: absolute;
		background: rgba(0,0,0,0.2);
	}
	.scroll-bar-x {
		left: 0px;
		bottom: 0px;
		width: 100%;
	}
	.scroll-bar-y {
		top: 0px;
		right: 0px;
		height: 100%;
	}
	.scroll-view:hover .scroll-bar,
	.scroll-bar.active {
		display: block;
	}
	.scroll-tip {
		opacity: 0.7;
		width: 100%;
		height: 100%;
		border-radius: 0.5rem;
		background: linear-gradient(to left, rgb(39, 58, 91) , rgb(86, 75, 148));
		transform: translateZ(0);
	}
	.scroll-bar:hover .scroll-tip,
	.scroll-bar.active .scroll-tip {
		opacity: 1;
	}
</style>