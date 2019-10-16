<template>
	<div class="header">
		<div class="logo" :style="{'backgroundImage': 'url('+logo+')'}"></div>
		<div class="theme">
			{{title}}
		</div>
		<div class="user" :class="{active: active}">
			<el-dropdown trigger="click" @visible-change="userClick($event)" @command="userCommand">
				<div class="el-dropdown-link">
					<div class="name">{{name}}</div>
					<fa-icon :icon="['fas', 'angle-down']"></fa-icon>
				</div>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item command="history">
						<el-popover placement="right-start" trigger="hover" v-model="historyStore">
							<span slot="reference">
								历史记录
								<fa-icon :icon="['fas', 'clock']"></fa-icon>
							</span>
							<ul class="el-menu">
								<li class="el-dropdown-menu__item" v-for="(item, index) in menuHistory"
									@click="menuClick(item)" :key="index">
									{{item.name}}
								</li>
								<li class="el-dropdown-menu__item" v-if="menuHistory.length <= 0"
									@click="historyStore = false">
									无记录
								</li>
								<li class="el-dropdown-menu__item el-dropdown-menu__item--divided"
									@click="historyMore()">
									更多记录
								</li>
							</ul>
						</el-popover>
					</el-dropdown-item>
					<el-dropdown-item divided command="updatePass">
						修改密码
						<fa-icon :icon="['fas', 'key']"></fa-icon>
					</el-dropdown-item>
					<el-dropdown-item divided command="exit">
						安全退出
						<fa-icon :icon="['fas', 'sign-out-alt']"></fa-icon>
					</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>



		<!--modal-->
		<el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="32rem">
			<!--修改密码-->
			<el-form :model="dialogPass" label-width="9rem" label-position="right" v-if="dialogType == 'updatePass'"
				:rules="rulesPass" ref="dialogPass" status-icon>
				<el-form-item label="原密码：" prop="oldPass">
					<el-input v-model="dialogPass.oldPass" type="password" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="再输一次：" prop="againPass">
					<el-input v-model="dialogPass.againPass" type="password" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="新密码：" prop="newPass">
					<el-input v-model="dialogPass.newPass" type="password" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<!--更多历史记录-->
			<el-form :model="dialogPass" label-width="9rem" label-position="right" v-if="dialogType == 'historyMore'">
				<ul class="el-menu handle">
					<li class="el-dropdown-menu__item" v-for="(item, index) in menuHistory"
						@click="menuClick(item)" :key="index">
						{{index+1}}、{{item.name}}
					</li>
					<li class="el-dropdown-menu__item" v-if="menuHistory.length <= 0">
						无记录
					</li>
				</ul>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogCancel()">取 消</el-button>
				<el-button type="primary" @click="dialogConfirm()">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>

	import {
		exit,
		setPassword
	} from '@/config/getData'

	import {
		EXIT,
		MENU_STATE,
		MENU_GOTO
	} from '@/store/mutation-types'

	export default {
		name: 'Test',
		props: ['param'], // 注册父级传递的参数
		components: { //组件
		},
		data() { //数据
			return {
				active: false,
				historyStore: false,
				dialogVisible: false,
				dialogTitle: "",
				dialogType: "",
				dialogPass: {
					errPass: false,
					oldPass: "",
					againPass: "",
					newPass: ""
				},
				rulesPass: {
					oldPass: [{
						required: true,
						validator: (rule, value, callback) => {
							if (value.replace(/\s*/g,"") === '') {
								callback(new Error('请输入密码！'));
							} else if (this.dialogPass.errPass) {
								this.dialogPass.errPass = false;
								callback(new Error('密码错误！'));
							} else {
								if (this.dialogPass.againPass.replace(/\s*/g,"") !== '') {
									this.$refs.dialogPass.validateField('againPass');
								}
								if (this.dialogPass.newPass.replace(/\s*/g,"") !== '') {
									this.$refs.dialogPass.validateField('newPass');
								}
								callback();
							}
						},
						trigger: 'blur'
					}],
					againPass: [{
						required: true,
						validator: (rule, value, callback) => {
							if (value.replace(/\s*/g,"") === '') {
								callback(new Error('请再次输入密码！'));
							} else if (value.replace(/\s*/g,"") !== this.dialogPass.oldPass.replace(/\s*/g,"")) {
								callback(new Error('两次密码不一致！'));
							} else {
								callback();
							}
						},
						trigger: 'blur'
					}],
					newPass: [{
						required: true,
						validator: (rule, value, callback) => {
							if (value.replace(/\s*/g,"") === '') {
								callback(new Error('请输入新密码！'));
							} else if (value.replace(/\s*/g,"") === this.dialogPass.oldPass.replace(/\s*/g,"")) {
								callback(new Error('新密码与原密码一样！'));
							} else {
								callback();
							}
						},
						trigger: 'blur'
					}]
				}
			}
		},
		computed: {//计算属性
			logo () {
				return this.$store.state['logo'];
			},
			title () {
				return this.$store.state['title'];
			},
			name () {
				return this.$store.state['userInfo'].name;
			},
			menuHistory () {
				return this.$store.state['menu-history'];
			}
		},
		methods: { //方法
			userCommand (command) {
				switch (command){
					case "history":
						this.historyMore();
						break;
					case "updatePass":
						this.dialogVisible = true;
						this.dialogType = "updatePass";
						this.dialogTitle = "修改密码";
						break;
					case "exit":
						exit().then((res) => {
							this.$store.commit(EXIT);
						}, (err) => {
						});
						break;
					default:
						break;
				}
			},
			userClick (k) {
				this.active = k;
			},
			menuClick (item) {
				this.historyStore = false;
				this.dialogVisible = false;
				this.$store.commit(MENU_GOTO, item);
			},
			historyMore () {
				this.dialogVisible = true;
				this.dialogType = "historyMore";
				this.dialogTitle = "更多记录";
			},
			dialogCancel () {
				this.dialogVisible = false;
			},
			dialogConfirm () {
				switch (this.dialogType){
					case "updatePass":
						setPassword({
							oldPassword: this.dialogPass.oldPass,
							password: this.dialogPass.newPass,
							userId: this.$store.state['userInfo'].userId
						}).then((res) => {
							if (res.code == 200) {
								this.dialogVisible = false;
								this.$message({
									type: 'success',
									message: '修改成功！！',
									center: true,
									showClose: true
								});
							} else {
								this.dialogPass.errPass = true;
								this.$refs.dialogPass.validateField('oldPass');
							}
						}, (err) => {
						});
						break;
					default:
						this.dialogVisible = false;
						break;
				}
			}
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
	.header {
		position: absolute;
		top: 0px;
		left: 52px;
		right: 0px;
		height: 6rem;
		overflow: hidden;
		padding: 0.25rem;
		background: linear-gradient(45deg, #273A5B , #1E1E1E);
	}
	.header:before {
		display: block;
		content: "";
		position: absolute;
		bottom: 3rem;
		right: 13.5rem;
		width: 52.5rem;
		height: 12.5rem;
		border-radius: 50%;
		pointer-events: none;
		background: linear-gradient(0deg, rgba(0,0,0,0.06) , rgba(0,0,0,0));
		/*background: red;*/
	}
	.header:after {
		display: block;
		content: "";
		position: absolute;
		bottom: 3rem;
		right: -14.5rem;
		width: 40rem;
		height: 11rem;
		border-radius: 50%;
		pointer-events: none;
		background: linear-gradient(0deg, rgba(0,0,0,0.06) , rgba(0,0,0,0));
		/*background: red;*/
	}
	.header .logo {
		float: left;
		width: 3.5rem;
		height: 3.5rem;
		margin: 0.5rem;
		overflow: hidden;
		border-radius: 50%;
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
	.header .theme {
		float: left;
		height: 3.5rem;
		margin: 0.5rem;
		line-height: 3.5rem;
		font-size: 2rem;
		color: #B2B2B2;
	}
	.header .user {
		float: right;
		height: 3rem;
		margin-top: 0.5rem;
		padding-right: 1rem;
		line-height: 3rem;
		font-size: 1.5rem;
		color: #B2B2B2;
		border-radius: 0.25rem;
		border-left: 1px solid rgba(255,255,255,0.2);
	}
	.header .user.active,
	.header .user:hover {
		background-color: rgba(255,255,255,0.1);
		box-shadow: 0px 0px 30px rgba(255,255,255,0.2);
	}
	.header .user>.el-dropdown,
	.header .user>.el-dropdown>.el-dropdown-link {
		float: right;
		height: 100%;
		text-align: right;
	}
	.header .user>.el-dropdown>.el-dropdown-link>.name {
		float: left;
		min-width: 4rem;
		height: 100%;
		margin-left: 1rem;
		margin-right: 1rem;
		text-align: center;
		display: block;
		color: #FFFFFF;
	}
	.header .handle {
		max-height: 27rem;
		padding-left: 2rem;
		overflow-y: auto;
	}
</style>