<template>
	<div class="page-list">
		<ul class="pagination" v-if="conf.totalItems > 0">
			<li v-bind:class="{disabled: conf.currentPage == 1}" @click="prevPage()"><span>&laquo;</span></li>
			<li v-for="item in pageList" v-bind:class="{active: item == conf.currentPage, separate: item == '...'}" @click="changeCurrentPage(item)">
				<span>{{ item }}</span>
			</li>
			<li v-bind:class="{disabled: conf.currentPage == numberOfPages}" @click="nextPage()"><span>&raquo;</span></li>
		</ul>
		<div class="page-total" v-if="conf.totalItems > 0">
			每页
			<select v-model="conf.itemsPerPage" @change="changeItemsPerPage()">
				<option v-for="option in conf.perPageOptions" v-bind:value="option">{{option}}</option>
			</select>
			条/总共 <strong>{{conf.totalItems}}</strong> 条记录/前往
			<input type="text" v-model="jumpPageNum" @keyup="jumpPageKeyUp($event)" />页
			<button type="submit" class="btn btn-default" @click="jumpToPage()">确定</button>
		</div>
		<div class="no-items" v-if="conf.totalItems <= 0">暂无数据</div>
	</div>
</template>

<script>
	export default {
		name: 'Pagination',
		props: {
			conf: {
				currentPage: 1,
				pagesLength: 5,
				totalItems: 5,
				itemsPerPage: 10,
				perPageOptions: [5, 10, 25, 50, 100]
			}
		},
		data() {
			return {
				msg: 'Welcome to Your Vue.js Appconf',
				jumpPageNum: 1
			}
		},
		computed: {
			numberOfPages: function() {
				return Math.ceil(this.conf.totalItems / this.conf.itemsPerPage);
			},
			pageList: function() {
				var list = [];
				if(this.numberOfPages <= this.conf.pagesLength) {
					// 判断总页数如果小于等于分页的长度，若小于则直接显示
					for(var i=1; i<=this.numberOfPages; i+=1) {
						list.push(i);
					}
				} else {
					// 总页数大于分页长度（此时分为三种情况：1.左边没有...2.右边没有...3.左右都有...）
                    // 计算中心偏移量
                    var offset = (this.conf.pagesLength - 1) / 2;
                    if(this.conf.currentPage <= offset){
                        // 左边没有...
                        for(i = 1; i <= offset + 1; i++){
                            list.push(i);
                        }
                        list.push('...');
                        list.push(this.numberOfPages);
                    }else if(this.conf.currentPage > this.numberOfPages - offset){
                        list.push(1);
                        list.push('...');
                        for(var i=offset + 1; i>=1; i-=1){
                            list.push(this.numberOfPages - i);
                        }
                        list.push(this.numberOfPages);
                    }else{
                        // 最后一种情况，两边都有...
                        list.push(1);
                        list.push('...');

                        for(var i=Math.ceil(offset / 2); i>=1; i-=1){
                            list.push(this.conf.currentPage - i);
                        }
                        list.push(this.conf.currentPage);
                        for(var i=1; i<=offset / 2; i+=1){
                            list.push(this.conf.currentPage + i);
                        }

                        list.push('...');
                        list.push(this.numberOfPages);
                    }
				}

				return list;
			}
		},
		methods: {
			setConf: function () {
				this.$emit('config', this.conf);
			},
			// prevPage
			prevPage: function() {
				if(this.conf.currentPage > 1) {
					this.conf.currentPage -= 1;
				}
				this.jumpPageNum = this.conf.currentPage;
				this.setConf();
				this.onChange();
			},
			// nextPage
			nextPage: function() {
				if(this.conf.currentPage < this.numberOfPages) {
					this.conf.currentPage += 1;
				}
				this.jumpPageNum = this.conf.currentPage;
				this.setConf();
				this.onChange();
			},
			// 变更当前页
            changeCurrentPage: function(item) {
            	console.log(item);
                if(item == '...'){
                    return;
                }else{
                    this.conf.currentPage = item;
                    this.jumpPageNum = item;
                    this.setConf();
                    this.onChange();
                }
            },
            // 修改每页展示的条数
            changeItemsPerPage: function() {

                // 一发展示条数变更，当前页将重置为1
                this.conf.currentPage = 1;
                this.jumpPageNum = 1;
                this.setConf();
                this.onChange();
            },
            // 跳转页
            jumpToPage: function() {
                var num = this.jumpPageNum;
                if(num.match(/\d+/)) {
                    num = parseInt(num, 10);
                
                    if(num && num != this.conf.currentPage) {
                        if(num > this.conf.numberOfPages) {
                            num = this.conf.numberOfPages;
                        }

                        // 跳转
                        this.conf.currentPage = num;
                        this.setConf();
                        this.onChange();
                        this.jumpPageNum = num;
                    }
                }
                
            },
            jumpPageKeyUp: function(e) {
                var keycode = window.event ? e.keyCode :e.which;
                
                if(keycode == 13) {
                    this.jumpToPage();
                }
            },
            onChange: function () {
				this.$emit('onChange', 'onChange');
			},
		},
		mounted: function () {
			this.onChange();
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.page-list .pagination {
		float: left;
	}
	
	.page-list .pagination span {
		cursor: pointer;
	}
	
	.page-list .pagination .separate span {
		cursor: default;
		border-top: none;
		border-bottom: none;
	}
	
	.page-list .pagination .separate span:hover {
		background: none;
	}
	
	.page-list .page-total {
		float: left;
		margin: 21px 20px;
	}
	
	.page-list .page-total input,
	.page-list .page-total select {
		height: 26px;
		border: 1px solid #ddd;
	}
	
	.page-list .page-total input {
		width: 40px;
		padding-left: 3px;
	}
	
	.page-list .page-total select {
		width: 50px;
	}
</style>