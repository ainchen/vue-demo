<template>
	<div :class="{'column': !comp.line,'line': comp.line}">
		<template v-for="(item, index) in itemStyle">
			<div v-if="index != 0" class="interval" @mousedown="interval($event, index-1)" :key="index+'A'"></div>
			<div :style="{'width': 'calc(' + item + ')'}" class="item" :ref="'item_'+index"  :key="index+'B'">
				<slot :name="index">
					<div class="template">
						{{deviation}} <br /> {{itemStyle}}
					</div>
				</slot>
			</div>
		</template>
	</div>
</template>

<script>
	export default {
		name: 'Composition',
		props: ['options'],
		data() {
			return {
				deviation: []
			}
		},
		computed: {
			comp: {
				get() {
					let c = this.options;
					if(typeof c === 'undefined') {
						return {
							line: false,
							proportion: [1, 2]
						}
					}
					c = {
						line: c.line,
						proportion: typeof c.proportion === 'undefined' ? [1, 2] : c.proportion
					};
					let sum = 0;
					if(typeof c.proportion[0] === 'number') {
						for(let n = 0; n < c.proportion.length; n += 1) {
							sum += c.proportion[n];
						}
					}
					for(let n = 0; n < c.proportion.length; n += 1) {
						if(sum == 0) {
							c.proportion[n] = c.proportion[n];
						} else {
							c.proportion[n] = (c.proportion[n] * 100 / sum) + "%";
						}
					}
					return c;
				}
			},
			itemStyle() {
				let res = [];
				for(let n = 0; n < this.comp.proportion.length; n += 1) {
					let p = this.comp.proportion[n] + " - 0.5rem";
					if(typeof this.deviation[n - 1] !== 'undefined' && this.deviation[n - 1] != 0) {
						if(this.deviation[n - 1] < 0) {
							p += " + " + Math.abs(this.deviation[n - 1]) + "px";
						} else {
							p += " - " + Math.abs(this.deviation[n - 1]) + "px";
						}
					}
					if(typeof this.deviation[n] !== 'undefined' && this.deviation[n] != 0) {
						if(this.deviation[n] < 0) {
							p += " - " + Math.abs(this.deviation[n]) + "px";
						} else {
							p += " + " + Math.abs(this.deviation[n]) + "px";
						}
					}
					res.push(p);
				}
				return res;
			}
		},
		methods: {
			interval: function(e, index) {
				e.preventDefault();
				e.stopPropagation();
				let s = 0;
				while(this.deviation.length <= index) {
					this.deviation.push(0);
				}

				if(this.comp.line) {
					s = e.clientY;
				} else {
					s = e.clientX;
				}

				const move = (e) => {
					e.preventDefault();
					e.stopPropagation();
					let d;
					if(this.comp.line) {
						d = parseInt(e.clientY - s);
						this.$nextTick(() => {
							let w1, w2;
							if(this.$refs['item_' + index]) {
								w1 = this.$refs['item_' + index][0].clientHeight;
							}
							if(this.$refs['item_' + (index + 1)]) {
								w2 = this.$refs['item_' + (index + 1)][0].clientHeight;
							}
							if((!w1 || w1 + d > 0) && (!w2 || w2 - d > 0)) {
								this.deviation.splice(index, 1, this.deviation[index] + d);
							}
						})
						s = e.clientY;
					} else {
						d = parseInt(e.clientX - s);
						this.$nextTick(() => {
							let w1, w2;
							if(this.$refs['item_' + index]) {
								w1 = this.$refs['item_' + index][0].clientWidth;
							}
							if(this.$refs['item_' + (index + 1)]) {
								w2 = this.$refs['item_' + (index + 1)][0].clientWidth;
							}
							if((!w1 || w1 + d > 0) && (!w2 || w2 - d > 0)) {
								this.deviation.splice(index, 1, this.deviation[index] + d);
							}
						})
						s = e.clientX;
					}
				}

				const up = (e) => {
					e.preventDefault();
					e.stopPropagation();
					if(document.removeEventListener) {
						document.removeEventListener('mousemove', move);
						document.removeEventListener('mouseup', up);
					} else {
						document.deachEvent('mousemove', move);
						document.deachEvent('mouseup', up);
					}
				}

				if(document.addEventListener) {
					document.addEventListener('mousemove', move);
					document.addEventListener('mouseup', up);
				} else {
					document.attachEvent('mousemove', move);
					document.attachEvent('mouseup', up);
				}
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.column,
	.line {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.column>.item {
		height: 100%;
		float: left;
		overflow: hidden;
	}

	.column>.item:first-of-type {
		margin-left: 0.25rem;
	}

	.column>.item:last-of-type {
		margin-right: 0.25rem;
	}

	.line>.item {
		width: 100%;
		overflow: hidden;
	}

	.line>.item:first-of-type {
		margin-top: 0.25rem;
	}

	.line>.item:last-of-type {
		margin-bottom: 0.25rem;
	}

	.column>.interval {
		width: 0.5rem;
		height: 100%;
		float: left;
		cursor: e-resize;
		border-radius: 0.5rem;
		box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3) inset;
	}

	.line>.interval {
		width: 100%;
		height: 0.5rem;
		cursor: n-resize;
		border-radius: 0.5rem;
		box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3) inset;
	}

	.template {
		width: calc(100% - 10px);
		height: calc(100% - 10px);
		margin: 5px;
		border-radius: 0.5rem;
		background: #00FFFF;
	}
</style>