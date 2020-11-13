<template>
	<view>
		<view class="content">
			<u-field v-model="mobile" @blur='oldpassword' label="旧密码" placeholder="请填写旧密码" required>
			</u-field>
			<u-field v-model="code" label="新密码" placeholder="请填写新密码" required>
			</u-field>
			<u-field v-model="code" label="确认密码" placeholder="请再次输入新密码" required>
			</u-field>
		</view>

		<view class="button">
			<u-button class='btn' :plain="false" :hair-line='false'>确定</u-button>
				<view class="bottom">忘记旧密码？ 请联系平台管理员</view>
		</view>
		
	
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		// 计算属性
		computed: {},
		// 组件方法
		methods: {
			oldpassword() {
				
				this.$u.get('',{
					status:1
				}).then(res=>{
					this.to_money = res.data.money
					
				})
			}
		},
	}
</script>

<style scoped lang="scss">
	.content {
		margin-top: 28rpx;
		background-color: #fff;
	}
	.button {
		
		padding: 30rpx 24rpx 12rpx 24rpx;
		.btn {
			background-color: #c6c6c6;
			border: none;
			// margin-bottom: 16rpx;
		}	
			.bottom {
			color:  #9d9d9d;
			margin-top: 10rpx;
			text-align: center;
			}
	}
	
</style>
