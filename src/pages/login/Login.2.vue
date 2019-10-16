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
			<div class="welcome">
				WELCOME
			</div>
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
			<div class="link">
				<p>友情链接：
					<a href="http://192.168.90.191:9000/campus/#/index"><code>自主招生官网</code></a>
				</p>
			</div>
			<div class="copyright">
				<p>版权所有：广东新源股份有限公司 粤ICP备05005998号 </p>
			</div>
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
</style>