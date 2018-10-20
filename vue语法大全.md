#一级标题
##二级标题
1. 列表标记
```代码区```
`高亮`
**加粗**
>注意

#vue的语法大全

##安装方法
- 独立版本
	直接页面引入vue.js，主要应用于单页面增强

- 命令行安装
	适用于多页面的中小型应用
	```
		npm install webpack -g//全局安装vue
		npm install vue-cli -g
//		npm install --global vue-cli
		cd //到具体开发目录				//打开到具体项目的位置
		vue init webpack //项目名字	//初始化一个项目
		/* project name
		 * project description
		 * author
		 * vue huild
		 * use ESLint				//代码检测
		 * setup unit				//单元测试
		 * setup e2e
		 *
		 *
		 */
		npm install
		//npm install vue-router --save
		//npm install vue-resource --save
		npm install axios --save
		npm install vuex --save
		npm run dev
		npm run build
	```


##模板语法
1. 单向绑定（纯文本插入）

	使用{{}}双大括号标记变量，表示输入该变量的值到模板中

	```html
	<div> {{content}} </div>
	```

	如果变量只显示一次，之后不改变，可以用`v-once`
	```html
	<div v-once> {{content}} </div>
	```
2. 单向绑定（带标签的html）
	可以解析变量中的合法html标签

	```html
	<div v-html = "htmlcontent"></div>
	```
	尽量不用，易导致xss攻击
3. v-bind(标签属性的单向绑定)
	因为{{}}无法在标签属性中使用，所以要用v-bind指令
	单属性有效

	```html
	<div v-bind:id="divid">我是div</div>

	<!--bool为true，disabled生效-->
	<input type='text' v-bind:disabled="bool"/>
	```

	缩写：
	```html
	<div :id="divid">我是div</div>
	```
4. 对于class和style的优化写法——

	```html
	<!--json对象绑定多个类-->
	<!--键名代表类名-->
	<!--值代表是否使用该类-->
	<div :class="{
		"a":isA
		<!---->
		<!--"类名":bool-->
	}">我是div</div>

	<!--数组也可以绑定多个类-->
	```
	```javascript
	data:{
		isA:false
	}
	```
	```html
	<!--json对象绑定多个css属性-->
	<!--键名代表属性名-->
	<!--值代表属性值-->
	<div :style="{
		color:'yellow',
		width:x
		<!---->
		<!--属性名:属性值-->
	}">我是div</div>
	```
	```javascript
	data:{
		x:"50px"
	}
	```
5. 计算属性--对现有属性加工处理
	{{}}或指令里面可以直接写表达式,一条
	```html
	<div :id="er+de">我是div</div>
	<!--id变为er和de的和-->
	```
	或者
	```html
	<div>{{content.split("")}}</div>
	```

	使用**计算属性**
	```javascript
	computed{
		comid:function(){
		//计算表达式
			return result;
		}
	}
	```
	```html
	<div :id="comid"></div>
	```
	>计算属性会根据元数据改变而改变

	可以从计算属性返回到元数据
	```javascript
	computed{
		comid:{
			set: function(value){
				//comid改变触发
				//('元数据') = comid;
			},
			get: function(value){
				//元数据改变触发
				return value;//返回的结果赋给comid
			}
		}
	}
	```

6. 监听者
	很多时候，要监听数据的变化，这时可以使用监听者模式
	```javascript
	var vm = new Vue({
		data: {
			num: 0,
			q: ""
		},
		watch: {
		//监听num属性变化
			num:function(newV){
				//newV是num的最新数据
			}
		}
	});

	//取消监听
	var unwatch = vm.$watch("q",function(){
		//xxxxxxxxxxxxxxx
	});
	unwatch();
	```
7. 判断指令(v-if,v-show)
	```html
	<!--判断isHave，true则添加-->
	<!--每次切换都删除添加，耗性能-->
	<div v-if="isHave"> 插入的content</div>

	<!--判断isShow，true则显示-->
	<!--改变样式display-->
	<div v-show="isShow"> 显示的content</div>
	```
8. 循环指令(v-for)
	用来循环数组，对象，数字
	可以定义最多三个循环相关变量，代表值，键，索引
	```html
	<ul>
		<li v-for="(item,keys,index) in this.list">
			{{keys}},{{index}}
			<p>{{item.name}}</p>
		</li>
	</ul>
	```
9. 对数组更新会触发视图更新的方法
	-push()

	-pop()

	-shift()

	-unshift()

	-splice()

	-sort()

	-reverse()
	对每个元素做相同操作
	-map(function(){
		//操作
	})
10.路由
```route/index.js
	mode: 'history',
```
11.resource
```main.js
import VueResource from 'vue-resource';
Vue.use(VueResource);
```
	=/static


12.vuex
```javascript
	//state
	store.state.count
	//在跟组件注入store
	this.$store.state.count

	//getter
	getters: {
		tool: (state, getters) => {
			return state.count;
		}
	}
	//使用
	this.$store.getters.tool === this.$store.state.count

	//mutation
	//更改状态
	//必须同步操作
	mutations: {
		fp (state, param) {
			state.count ++;
		}
	}

	this.$store.commit('fp', param);
	~or~
	param.type = 'fp';
	this.$store.commit(param);

	//action
	//可添加异步操作
	actions: {
		tp (context, param) {
			context.commit('fp', param);

			setTimeout(()=>{
				context.commit('fp', param);
			},3000)
		}
	}

	this.$store.dispatch('tp', param);
	~or~
	param.type = 'tp';
	this.$store.dispatch(param);

	//热重载
	if (module.hot) {
	// 使 action 和 mutation 成为可热重载模块
		module.hot.accept(['./mutations', './modules/a'], () => {
			// 获取更新后的模块
			// 因为 babel 6 的模块编译格式问题，这里需要加上 `.default`
			const newMutations = require('./mutations').default
			const newModuleA = require('./modules/a').default
			// 加载新模块
			store.hotUpdate({
				mutations: newMutations,
				modules: {
					a: newModuleA
				}
			})
		})
	}
```

