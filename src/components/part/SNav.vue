<template>
	<nav class="navbar navbar-inverse">
		<div class="container-fluid">
			<!-- Brand and toggle get grouped for better mobile display -->
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
			        <span class="sr-only">Toggle navigation</span>
			        <span class="icon-bar"></span>
			        <span class="icon-bar"></span>
			        <span class="icon-bar"></span>
			     </button>
				<a class="navbar-brand" @click="gotoNext('index')">导航</a>
			</div>

			<!-- Collect the nav links, forms, and other content for toggling -->
			<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
				<ul class="nav navbar-nav">
					<li>
						<a>文件上传</a>
					</li>
					<li>
						<a>文件下载</a>
					</li>
					<li>
						<a>课件共享</a>
					</li>
					<li>
						<a>作业上传</a>
					</li>
					<li>
						<a>课程总结</a>
					</li>
				</ul>
				<ul class="nav navbar-nav navbar-right">
					<li class="dropdown">
						<a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
							xxxx <span class="caret"></span>
						</a>
						<ul class="dropdown-menu">
							<li>
								<a @click="gotoNext('information')">个人信息</a>
							</li>
							<li>
								<a @click="gotoNext('share')">本人分享</a>
							</li>
							<li>
								<a @click="updatePasswd()">修改密码</a>
							</li>
							<li role="separator" class="divider"></li>
							<li>
								<a @click="logout()">退出登录</a>
							</li>
						</ul>
					</li>
				</ul>
			</div>
			<!-- /.navbar-collapse -->
		</div>
		<!-- /.container-fluid -->
		<modal ref="modal" :options="modal">
			<div slot="body">
				<!--修改密码-->
				<form name="form" class="form-vertical" v-if="modal.option == 'updatePassword'">
					<div class="row">
						<div class="col-sm-2 text-right">
							<span class="title">原密码:</span>
						</div>
						<div class="col-sm-10">
							<input class="form-control" v-model="oPassword" type="password" placeholder="原密码">
						</div>
					</div>
					<div class="row">
						<div class="col-sm-2 text-right">
							<span class="title">新密码:</span>
						</div>
						<div class="col-sm-10">
							<input class="form-control" v-model="nPassword" type="password" placeholder="新密码">
						</div>
					</div>
					<div class="row">
						<div class="col-sm-2 text-right">
							<span class="title">再次输入:</span>
						</div>
						<div class="col-sm-10">
							<input class="form-control" v-model="dPassword" type="password" placeholder="再次输入">
						</div>
					</div>
				</form>
				<!--info-->
				<p v-if="modal.option == 'info'">{{msg}}</p>
			</div>
		</modal>
	</nav>
</template>

<script>
	import Modal from '@/components/common/Modal';
	export default {
		name: 'SNav',
		components: {
			Modal
		},
		data() {
			return {
				modal: {
					option: 'updatePassword'
				},
				oPassword: "",
				nPassword: "",
				dPassword: "",
				msg: ""
			}
		},
		computed: {
			
		},
		methods: {
			getData: function() {
//				this.$root.updateMenu();
			},
			gotoNext: function(name, path) {
				if(!name) {
					return;
				}
				this.$router.push({
					name: name,
					params: {
						path: path ? path : undefined
					}
				});
			},
			logout: function() {
				this.$http.get(this.path.exit).then(function(response) {
					if(response.body) {
						if(response.body.code == 200) {
							this.$router.push({
								name: 'login',
								params: {
									path: this.$route.name
								}
							});
						}
					}
				}, function(response) {

				});
			},
			active: function(name) {
				return this.$route.name == name;
			},
			updatePasswd: function () {
				this.modal.option = 'updatePassword';
				var that = this;
				var id = that.$getMyInfo() ? that.$getMyInfo().id : 0;
				var username = that.$getMyInfo() ? that.$getMyInfo().account.username : "";
				this.$refs.modal.confirm().then(function(res){
					if (that.nPassword != that.dPassword) {
						that.modal.option = 'info';
						that.msg = "两次密码不一致";
						that.$refs.modal.confirm().then(function(){
							that.modal.option = 'updatePassword';
						},function(){
							that.modal.option = 'updatePassword';
						});
					}
					that.$http.post(that.path.account,{
						id: id,
						username: username,
						password: that.oPassword
					}).then(function(response) {
						if(response.body) {
							if (response.body.code == 200) {
							    that.$http.put(that.path.account,{
							    	id: id,
									username: username,
									password: that.nPassword
							    }).then(function(response) {
									if(response.body) {
										that.modal.option = 'info';
										that.msg = response.body.data;
										that.$refs.modal.confirm().then(function(){
											that.$refs.modal.show = false;
										},function(){});
									}
								}, function(response) {
									that.$refs.modal.show = false;
								});
							} else {
								that.modal.option = 'info';
								that.msg = "密码错误";
								that.$refs.modal.confirm().then(function(){
									that.$refs.modal.show = false;
								},function(){});
							}
						}
					}, function(response) {
						that.$refs.modal.show = false;
					});
				}).catch(function(res){
				    // 点击取消按钮的回调处理
				    console.log("modal n" + res);
				});
			}
		},
		mounted: function() {
//			this.$getMyInfo() ? this.getData() : '';
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.navbar {
		opacity: 1;
		font-weight: bolder;
		font-size: 16px;
	}
	.navbar .container-fluid {
		margin: 0px 50px;
	}
	.navbar .navbar-brand {
		font-size: 28px;
	}
</style>