<template>
	<view>
		<view class="content">
			<view class="userName content_item">
				<text>用户名</text>
				<text>{{mobile}}</text>
			</view>
			<view class="userPassWord content_item">
				<text>登录密码</text>
				<navigator url="/pages/wallet/changePassword">
					<text class="word">{{password}}</text>
					<u-icon name="arrow-right" color="#2979ff" size="28"></u-icon>
				</navigator>


			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				mobile: '',
				password: '**********',
			}
		},
		// 加载
		onLoad() {
			this.myAccount();
		},
		// 计算属性
		computed: {},
		// 组件方法
		methods: {
			myAccount() {
				this.$u.get('/api/rider_login/riderInfo').then(res => {
					const {
						data
					} = res
					this.mobile = data.username



				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {

		margin-top: 28rpx;
		background-color: #FFFFFF;

		.content_item {
			display: flex;
			justify-content: space-between;
			height: 120rpx;
			line-height: 60rpx;
			padding: 32rpx;
			font-size: 34rpx;
		}
		.userPassWord {
			border-top: 1rpx solid #ccc;
			.word {
			padding-right: 12rpx;
			vertical-align: middle;
			}
		}
	}
</style>
