<template>
	<div id="loginView">
		<div class="header">
			<div class="login_logo">

			</div>
		</div>
		<div class="bodyer">
			<div class="theme">
				{{title}}
			</div>
			<!-- <div class="welcome">
				WELCOME
			</div> -->
			<div class="chops">
				<form autocomplete="off" @submit.prevent="formSubmit">
					<div class="el-input">
						<input v-model="name" type="text" placeholder="用户名"
							required :class="{'err': nameErr}" class="el-input__inner"
							@focus="focus('nameErr')" autocomplete="off" />
					</div>
					<div class="el-input">
						<input v-model="pass" type="password" placeholder="密   码"
							required :class="{'err': passErr}" class="el-input__inner"
							@focus="focus('passErr')" autocomplete="off" />
					</div>
					<el-button native-type="submit" @click="check($event)" class="el-button el-col-24"
						:loading="loading">登录</el-button>
					<div class="message">{{message}}</div>
				</form>
			</div>
		</div>
		<div class="footer">
			<!-- <div class="link">
				<p>友情链接：
					<a href="http://192.168.90.191:9000/campus/#/index"><code>自主招生官网</code></a>
				</p>
			</div>
			<div class="copyright">
				<p>版权所有：广东新源股份有限公司 粤ICP备05005998号 </p>
			</div> -->
			<div class="order">

			</div>
		</div>
	</div>

</template>

<script>
	import {
		LOGIN,
		MENU_GOTO
	} from '@/store/mutation-types'

	import {
		login
	} from '@/config/getData'

	export default {
		name: 'Login',
		data: function() {
			return {
				name: '',
				pass: '',
				nameErr: false,
				passErr: false,
				loading: false,
				message: this.nameErr
			}
		},
		computed: { //计算属性
			title () {
				return this.$store.state['title'];
			}
		},
		methods: {
			check () {
				if (this.name && this.pass) {
					this.loading = true;
					login({
						'username': this.name,
						'password': this.pass
					}).then((res) => {
						this.loading = false;
						if (res.code == 200) {
							this.$store.commit(LOGIN, res);
							this.$store.state['menu-active'] = false;
							this.$store.dispatch('getMenu');
						} else {
							this.nameErr = true;
							this.passErr = true;
							this.message = res.msg;
						}
					}, (err) => {
						this.loading = false;
						this.message = "服务器异常";
					});
				}
			},
			focus (k) {
				this[k] = false;
				this.message = '';
			},
			formSubmit () {
				return false;
			}
		},
		mounted () {//模板挂载后
			console.log(this.message);
		}
	}
</script>

<style scoped>
	#loginView {
		height: 100%;
		overflow: hidden;
		background-image: url(../../images/login_bg.png);
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center center;
	}

	#loginView .header {
		position: relative;
		height: 10rem;
	}

	#loginView .header .login_logo {
		position: absolute;
		width: 6.5rem;
		height: 4.4rem;
		left: 3.8rem;
		top: 2.4rem;
		background-image: url(../../images/logo.png);
		background-repeat: no-repeat;
		background-size: 100%;
	}

	#loginView .bodyer {
		position: relative;
		height: calc(100% - 16.35rem);
	}

	#loginView .bodyer .theme {
		position: absolute;
		top: 6.1rem;
		left: 17.5rem;
		width: 20rem;
		height: 2rem;
		font-size: 1.9rem;
		text-align: left;
		line-height: 2rem;
		color: #F1EEEE;
	}

	#loginView .bodyer .welcome {
		position: absolute;
		top: 10.1rem;
		left: 23.6rem;
		width: 16.6rem;
		height: 2.3rem;
		font-size: 2.8rem;
		text-align: left;
		line-height: 2.3rem;
		color: #F1EEEE;
		background-image: url(../../images/login_icon_1.png);
		background-size: auto 100%;
		background-position: right;
		background-repeat: no-repeat;
	}

	#loginView .bodyer .chops {
		position: absolute;
		top: 5.8rem;
		left: 0rem;
		right: 0rem;
		bottom: 0rem;
		margin: auto;
		width: 17.2rem;
		height: 11rem;
		max-height: 100%;
	}

	#loginView .bodyer .chops .el-input>.el-input__inner {
		height: 2.4rem;
		padding: 0rem;
		margin-bottom: 2rem;
		text-align: center;
		color: #565E66;
		font-size: 0.9rem;
		/*background-color: #D9ECFE;*/
		transform-origin: center;
		transition: transform 0.1s linear 0s;
	}

	#loginView .bodyer .chops .el-input>.el-input__inner:focus,
	#loginView .bodyer .chops .el-input>.el-input__inner:active {
		transform: scaleX(1.1);
	}

	#loginView .bodyer .chops .el-input>.el-input__inner.err {
		border-color: #DB651D;
	}

	#loginView .bodyer .chops button.el-col-24 {
		height: 2.3rem;
		padding: 0.4rem 0.8rem;
		color: #565E66;
		font-size: 0.9rem;
		line-height: 1.5rem;
		background-color: #D9ECFE;
	}

	#loginView .bodyer .chops .message {
		color: #DB651D;
		text-align: center;
		font-size: 1.2rem;
	}

	#loginView .footer {
		position: relative;
		height: 6.35rem;
	}

	#loginView .footer .link {
		text-align: center;
	}

	#loginView .footer .copyright {
		text-align: center;
	}
</style>