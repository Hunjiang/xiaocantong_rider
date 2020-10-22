<template>
	<view>
		<view class="select">
			<view class="time" @click="show=true">{{startTime}}</view>
			<view class="mid">至</view>
			<view class="time" @click="show=true">{{endTime}}</view>
			<u-icon name="search" color="#333333" size="32" @click="search"></u-icon>
		</view>
		<view class="title">
			<view>接单数量</view>
			<view>收入</view>


		</view>
		<view class="title" style="background-color: #FFFFFF;">
			<view>{{orderNum}}</view>
			<view>￥{{charges}}</view>

		</view>
		<view>
			<view v-for="item,index of list" class="card">
				<view>￥{{item.rider_charges}}</view>
				<view class="item">
					<view>
						<view>商家</view>
						<view>{{item.shop[0].name}} {{item.shop[0].campus_name}}</view>
					</view>
					<image @click="makePhone(item.shop[0].phone)" src="../../static/images/phone.png" style="height: 45rpx;width: 45rpx;"></image>
				</view>
				<view class="item" style="border-bottom: 2rpx solid #d2d2d2;">
					<view>
						<view>客户</view>
						<view>{{item.user_address[0].name}} {{item.user_address[0].address}} {{item.user_address[0].campus_name}}</view>
					</view>
					<image @click="makePhone(item.user_address[0].phone)" src="../../static/images/phone.png" style="height: 45rpx;width: 45rpx;"></image>
				</view>
				<view class="item" style="border-bottom: 2rpx solid #d2d2d2;">
					<view>
						<view>备注</view>
						<view style="color: #999999;font-weight: normal;">{{item.buyer_remark.length!=0?item.buyer_remark:'无'}}</view>
					</view>
				</view>
				<view class="button">
					<view class="text">
						{{item.delivery_time_text}}完成配送
						
					</view>
				</view>
				
				
			</view>

		</view>
		<u-loadmore :status="status" />
		<u-calendar v-model="show" mode='range' @change="change" btn-type="info"></u-calendar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: true,
				startTime: '',
				endTime: '',
				status:'loadmore',
				list:[],
				page:1,
				orderNum:'',
				charges:''
			}
		},
		methods: {
			makePhone(num){
				uni.makePhoneCall({
					phoneNumber:num
				})
			},
			search(){
				this.page = 1
				this.getList()
			},
			change(e) {
				this.startTime = e.startDate
				this.endTime = e.endDate
				console.log(e)
				this.page = 1
				this.list = []
				this.getList()
			},
			getList(){
				this.status = "loading"
				this.$u.get('/api/rider_wallet/more',{
					start_time:this.startTime,
					end_time:this.endTime,
					page:this.page,
					limit:20
				}).then(res=>{
					this.page++
					if(res.data[0].list.length==0){
						this.status = 'nomore'
					}else{
						this.status = "loadmore"
						this.orderNum = res.data[0].order_num
						this.charges = res.data[0].charges
						if(this.list.length==0){
							this.list = res.data[0].list
						}else{
							this.list = this.list.concat(res.data[0].list)
						}
					}
				})
			},
		},
		onReachBottom() {
			this.getList()
		}
	}
</script>

<style lang="scss">
	.select {
		width: 750rpx;
		height: 84rpx;
		display: flex;
		align-items: center;
		background-color: #FFFFFF;
		padding-left: 90rpx;

		.time {
			width: 255rpx;
			height: 51rpx;
			background-color: #f0f0f0;
			border-radius: 10rpx;
			font-size: 30rpx;
			line-height: 51rpx;
			text-align: center;
			letter-spacing: 1rpx;
			color: #333333;
			margin: 0 10rpx;
		}
	}

	.title {
		width: 750rpx;
		height: 65rpx;
		padding: 20rpx 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 28rpx;
		font-weight: bold;
		letter-spacing: 1rpx;
		color: #333333;
	}
	.card {
		margin: 0 auto;
		margin-top:20rpx ;
		background-color: #FFFFFF;
		width: 690rpx;
		box-shadow: 0rpx 0rpx 5rpx 0rpx rgba(177, 177, 177, 0.42);
		border-radius: 10rpx;
		padding: 7rpx;
		padding-bottom: 30rpx;
		>view:first-child{
			font-size: 32rpx;
			color: #ff2b2b;
			padding:12rpx 15rpx;
			border-bottom: 2rpx solid #d2d2d2;
		}
		.item{
			padding-right: 20rpx;
			padding-top:20rpx ;
			display: flex;
			align-items: center;
			justify-content: space-between;
			>view:first-child{
				display: flex;
				align-items: center;
				>view:first-child{
					height:60rpx ;
					line-height: 60rpx;
						font-size: 32rpx;
						font-weight: bold;
						letter-spacing: 1rpx;
						color: #333333;
						padding:0 15rpx ;
						border-right: 2rpx solid #8fceee;
					
					
				}
				>view:last-child{
					font-size: 28rpx;
					font-weight: bold;
					padding-left:20rpx ;
					letter-spacing: 1rpx;
						color: #333333;
						max-width:405rpx;
				}
			}
			
		}
		.button{
			width: 542rpx;
				height: 66rpx;
			margin-left: 74rpx;
			margin-top: 26rpx;
			
		}
		.text{
			font-size: 28rpx;
		}
	}
</style>
