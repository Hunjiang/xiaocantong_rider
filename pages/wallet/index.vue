<template>
	<view class="content">
		<view class="nav">
			<view>
				<u-image :src="base + userInfo.avatar" width="105rpx" height="105rpx" border-radius="55rpx"></u-image>
				<view>
					<view>
						{{userInfo.nickname}}
						<u-icon :name="userInfo.gender==1?'man':'woman'"></u-icon>
					</view>
					<view>{{userInfo.phone}}</view>
				</view>
			</view>
			<u-icon name="setting" size="55"></u-icon>
		</view>
		<view class="state">
			<view>{{userInfo.online_status==1?'工作中':'已下线'}}</view>
			<u-button type="default" size="mini" class="button" @click="switchStatus">{{userInfo.online_status==1?'下线':'上线'}}</u-button>
		</view>
		<view class="wallet">
			<view>
				<view>我的钱包</view>
				<navigator url='/pages/wallet/more'>更多</navigator>
			</view>
			<view>
				<view>今日收益：￥{{userInfo.today_money}}</view>
				<view>今日接单：{{userInfo.today_order}}</view>
			</view>
			<u-row gutter="16" justify="center">
				<u-col span="6">
					<view style="display: flex;flex-direction: column;align-items: center;justify-content: flex-start;">
						<view>余额：￥{{userInfo.money}}</view>
						<view>已提现：￥{{userInfo.to_money}}</view>
					</view>
				</u-col>
				<u-col span="6">
					<view>
						<u-button type="default" size="medium" ripple @click="onPageJump('/pages/wallet/getCash')">提现</u-button>
					</view>
				</u-col>
			</u-row>
			
		</view>
		<view class="bottom" @click="exit">退出登陆</view>
		<u-tabbar  :list="list" :mid-button="true" active-color="#ffc84e"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:this.$store.state.vuex_tabbar,
				userInfo:'',
				base:this.$base
			}
		},
		onLoad() {
			console.log(this.$store.state)
		},
		onShow() {
			this.$u.get('/api/rider_wallet/index').then(res=>{
				this.userInfo = res.data[0]
			})
		},
		methods: {
			onPageJump(url){
				uni.navigateTo({
					url
				})
			},
			switchStatus(){
				this.$u.get('/api/rider_wallet/online').then(res=>{
					if(res.code==1){
						uni.showToast({
							title:res.msg,
							icon:'success'
						})
						if(this.userInfo.online_status==1){
							this.userInfo.online_status = 2
						}else{
							this.userInfo.online_status = 1
						}
					}
				})
			},
			exit(){
				uni.showModal({
					title:'提示',
					content:'退出登陆？',
					success: (res) => {
						if(res.confirm){
							this.$u.get('/api/rider_wallet/logout').then(res=>{
								if(res.code==1){
									uni.showToast({
										title:res.msg,
										icon:'success',
										success: () => {
											setTimeout(()=>{
												uni.removeStorageSync('ridertoken')
												uni.navigateTo({
													url:'/pages/login/index'
												})
											},1500)
											
										}
									})
								}
								
								
								
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.content{
		background-image: url(../../static/images/card.png);
		background-size: 100%;
		background-repeat: no-repeat;
	}
	.bottom{
		width: 690rpx;
			height: 93rpx;
			background-color: #ffffff;
			box-shadow: 1rpx 1rpx 6rpx 0rpx 
				rgba(160, 160, 160, 0.55);
			border-radius: 10rpx;
			margin: 0 auto;
				font-size: 36rpx;
				font-weight: bold;
				text-align: center;
				line-height: 93rpx;
				letter-spacing: 1rpx;
				color: #333333;
	}
	.wallet{
		width: 690rpx;
			box-shadow: 1rpx 1rpx 6rpx 0rpx 
				rgba(160, 160, 160, 0.55);
			border-radius: 10rpx;
			background-color: #FFFFFF;
			margin:20rpx auto ;
			padding-bottom: 40rpx;
		>view:first-child{
			display: flex;
			justify-content: space-between;
			align-items: flex-end;
			padding:0 16rpx ;
			padding-top: 26rpx;
			padding-bottom: 10rpx;
			border-bottom: 2rpx solid #ececec;
			>view:first-child{
				font-size: 36rpx;
				font-weight: bold;
				letter-spacing: 1rpx;
				color: #333333;
			}
			>view:last-child{
					font-size: 28rpx;
					letter-spacing: 1rpx;
					color: #999999;
			}
				
			
		}
		>view:nth-child(2){
			width: 100%;
			margin: 20rpx 0 ;
			display: flex;
			align-items: center;
			>view{
					font-size: 30rpx;
					letter-spacing: 1rpx;
					color: #333333;
				width: 50%;
			}
			>view:first-child{
				text-align: right;
				padding-right:31rpx ;
				border-right: 2rpx solid #b7dff4;
			}
			>view:last-child{
				text-align: left;
				padding-left: 31rpx;
			}
			
		}
		// >view:nth-child(3){
		// 	text-align: center;
			
			
		// }
	}
	.state{
			border-radius: 10rpx;
		position: relative;
		margin: 0 auto;
		width: 690rpx;
		height: 170rpx;
		background-image: url(../../static/images/state.png);
		background-size: 100%;
		background-repeat: no-repeat;
		>view:first-child{
			font-family: FZCHSJW--GB1-0;
				font-size: 70rpx;
				position: absolute;
				top:34rpx;
				left: 50%;
				transform: translateX(-50%);
		}
		.button{
			position: absolute;
			bottom:10rpx;
			right: 23rpx;
		}
	}
	.nav{
		
		padding: 0 30rpx;
		padding-top: 75rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		>view{
			display: flex;
			align-items: center;
		}
		>view>view{
			margin-left: 25rpx;
			>view:first-child{
					font-size: 36rpx;
					font-weight: bold;
					letter-spacing: 1rpx;
					color: #333333;
				
				
			}
			>view:last-child{
					font-size: 28rpx;
					letter-spacing: 1rpx;
					color: #666666;
				
			}
		}
	}

</style>
