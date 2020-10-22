<template>
	<view class="content">
		<u-navbar :is-back="false" title="抢单池" :background="background">
			<view class="slot-wrap">
							<u-icon name="map" size="35"></u-icon>
							<view>{{loc}}</view>
						</view>
		</u-navbar>
		<view>
			<view v-for="item,index of orderList" class="card">
				<view>￥{{item.rider_charges}}</view>
				<view class="item">
					<view>
						<view>商家</view>
						<view>{{item.shop[0].name}} {{item.shop[0].campus_name}}</view>
					</view>
					<!-- <image src="../../static/images/phone.png" style="height: 45rpx;width: 45rpx;"></image> -->
				</view>
				<view class="item" style="border-bottom: 2rpx solid #d2d2d2;">
					<view>
						<view>客户</view>
						<view>{{item.user_address[0].name}} {{item.user_address[0].address}} {{item.user_address[0].campus_name}}</view>
					</view>
					<!-- <image src="../../static/images/phone.png" style="height: 45rpx;width: 45rpx;"></image> -->
				</view>
				<view class="item" style="border-bottom: 2rpx solid #d2d2d2;">
					<view>
						<view>商品详情</view>
						<view>
							<view class="goodsItem" v-for="item1,index1 of item.goods">
								<view>{{item1.goods_name}} {{item1.goods_spec_name}}X{{item1.total_num}}</view>
							</view>
						</view>
					</view>
				</view>
				<view class="item" style="border-bottom: 2rpx solid #d2d2d2;">
					<view>
						<view>下单时间</view>
						<view>{{item.pay_time_text}}</view>
					</view>
				</view>
				<view class="item" style="border-bottom: 2rpx solid #d2d2d2;">
					<view>
						<view>约定送达时间</view>
						<view>{{item.user_delivery_time}}</view>
					</view>
				</view>
				<view class="item" style="border-bottom: 2rpx solid #d2d2d2;">
					<view>
						<view>备注</view>
						<view style="color: #999999;font-weight: normal;">{{item.buyer_remark.length!=0?item.buyer_remark:'无'}}</view>
					</view>
				</view>
				<view class="button">
					<u-button type="primary" ripple @click="getOrder(item.id)">立即抢单</u-button>
				</view>
				
				
			</view>
		</view>
		<u-modal v-model="show" :show-title="false" width="auto">
					<view class="slot-content">
						<image :src="isSuccess?'../../static/images/success.png':'../../static/images/fail.png'" style="width: 410rpx;height: 410rpx;"></image>
					</view>
				</u-modal>
		<u-tabbar :list="list" :mid-button="true" active-color="#ffc84e"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isSuccess:false,
				show:false,
				background: {
					backgroundImage: 'linear-gradient(179deg,#ffd041 0%,#ffda5a 50%,#ffe372 100%)'
				},
				list: this.$store.state.vuex_tabbar,
				orderList:[],
				loc:''
			}
		},
		onLoad() {
			console.log(this.$store.state)
		},
		onShow() {
			this.getList()
		},
		methods: {
			getList(){
				this.$u.get('/api/rider_order/orderPond').then(res=>{
					this.orderList = res.data.list
					this.loc = res.data.campus_name
				})
			},
			getOrder(id){
				this.$u.get('/api/rider_order/orderGrab',{
					order_id:id
				}).then(res=>{
					if(res.code==1){
						this.isSuccess = true
					}
					this.show = true
					this.getList()
				}).catch(res=>{
					this.isSuccess = false
					this.show = true
				})
			}
		}
	}
</script>

<style lang="scss">
		.slot-wrap {
			display: flex;
			align-items: center;
			/* 如果您想让slot内容占满整个导航栏的宽度 */
			/* flex: 1; */
			/* 如果您想让slot内容与导航栏左右有空隙 */
			padding: 0 30rpx;
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
