<template>
	<transition name="fade">
		<div class="modal" v-if="show" @click="close()">
			<div class="model-box" :style="modal.style" @click="stopPropagation($event)">
				<!--头部-->
                <div class="modal-header" v-if="modal.haveHeader">
                    <slot name="header">
                        <span class="title">{{modal.title}}</span>
                    </slot>
                </div>
                <!--内容区域-->
                <div class="modal-body">
                    <slot name="body">
                        <p class="notice">{{modal.text}}</p>
                    </slot>
                </div>
                <!--尾部,操作按钮-->
                <div class="modal-footer" v-if="modal.haveFooter">
                    <slot name="button">
                    	<a v-if="modal.showConfirmButton" href="javascript:void(0)"
                    		class="btn" :class="modal.confirmButtonClass" @click="submit()">
                    		{{modal.confirmButtonText}}
                    	</a>
                        <a v-if="modal.showCancelButton" href="javascript:void(0)"
                        	class="btn" :class="modal.cancelButtonClass" @click="close()">
                        	{{modal.cancelButtonText}}
                        </a>
                    </slot>
                </div>
			</div>
		</div>
	</transition>
</template>

<script>
	export default {
		name: 'Modal',
		props: ['options'],
		data() {
			return {
				show: false,
				resolve: '',
		        reject: '',
		        promise: '',  // 保存promise对象
			}
		},
		computed: {
			modal: {
				get: function () {
					var m = this. options;
					var s = {
						width: '600px',
						height: 'auto',
						margin: '30px auto'
					};
					if (m.style) {
						for (var item in m.style) {
							s[item] = m.style[item];
						}
					}
					m = {
						haveHeader: typeof m.haveHeader === 'undefined' ? true : m.haveHeader,
						haveFooter: typeof m.haveFooter === 'undefined' ? true : m.haveFooter,
						title: m.title || '提示',
						text: m.text,
						style: s,
						showCancelButton: typeof m.showCancelButton === 'undefined' ? true : m.showCancelButton,
		                cancelButtonClass: m.cancelButtonClass ? m.showCancelButton : 'btn-default',
		                cancelButtonText: m.cancelButtonText ? m.cancelButtonText : '取消',
		                showConfirmButton: typeof m.showConfirmButton === 'undefined' ? true : m.cancelButtonClass,
		                confirmButtonClass: m.confirmButtonClass ? m.confirmButtonClass : 'btn-primary',
		                confirmButtonText: m.confirmButtonText ? m.confirmButtonText : '确定',
					}
					return m;
				}
			}
		},
		methods: {
			stopPropagation: function (e) {
				e.stopPropagation();
			},
			close: function () {
				this.show = false;
				this.reject('close');
			},
			confirm: function () {
		        this.show = true;
		        var that = this;
		        this.promise = new Promise(function(resolve, reject){
		            that.resolve = resolve;
		            that.reject = reject;
		        });
		        return this.promise;   //返回promise对象,给父级组件调用
		    },
		    submit: function () {
		        this.resolve('submit');
		    },
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.fade-enter-active,
	.fade-leave-active {
		transition: all 0.5s
	}
	
	.fade-enter,
	.fade-leave-active {
		opacity: 0
	}
	
	.modal {
		display: block;
		background: rgba(0, 0, 0, 0.5);
		color: #222222;
	}
	
	.modal .model-box {
		background: #F1F1F1;
		border-radius: 5px;
	}
</style>