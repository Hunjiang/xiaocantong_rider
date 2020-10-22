<template>
	<view class="content">
		<u-tabs :list="tabList" :is-scroll="false" :current="current" @change="change" bg-color="#ffdf67"></u-tabs>
		<view>
			<view v-for="item,index of orderList" class="card">
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
				<view class="button" v-if="current==0">
					<u-button type="primary" ripple @click="getSuccess(item.id,index)">完成取货</u-button>
				</view>
				<view class="button" v-if="current==1">
					<u-button type="primary" ripple @click="deliverySuccess(item.id,index)">完成配送</u-button>
				</view>
				<view class="button" v-if="current==2">
					<view class="text">
						{{item.delivery_time_text}}完成配送

					</view>
				</view>


			</view>

		</view>
		<u-tabbar :list="list" :mid-button="true" active-color="#ffc84e"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: this.$store.state.vuex_tabbar,
				current: 0,
				tabList: [{
					name: '待取货'
				}, {
					name: '配送中'
				}, {
					name: '已完成'
				}],
				orderList: []
			}
		},
		onLoad() {
			console.log(this.$store.state)
		},
		onShow() {
			this.current = 0
			this.getList(0)
		},
		methods: {
			getSuccess(id, index) {
				uni.showModal({
					title: '提示',
					content: '完成取货？',
					success: (res) => {
						if (res.confirm) {
							this.todoOrder(id, 1, index)
						}
					}
				})
			},
			deliverySuccess(id, index) {
				uni.showModal({
					title: '提示',
					content: '完成送货？',
					success: (res) => {
						if (res.confirm) {
							this.todoOrder(id, 2, index)
						}
					}
				})
			},
			todoOrder(id, type, index) {
				this.$u.get('/api/rider_order/orderOperation', {
					type,
					order_id: id
				}).then(res => {
					uni.showToast({
						title: res.msg,
						icon: 'success',
						success: () => {
							this.orderList.splice(index, 1)
						}
					})


				})
			},
			makePhone(num) {
				uni.makePhoneCall({
					phoneNumber: num
				})
			},
			change(index) {
				this.current = index
				this.getList(index)
			},
			getList(index) {
				this.$u.get('/api/rider_order/orderList', {
					cat_id: index + 1
				}).then(res => {
					this.orderList = res.data
					uni.stopPullDownRefresh()
				})
			}
		},
		onPullDownRefresh() {
			this.getList(this.current)

		}
	}
</script>

<style lang="scss">
	.goodsItem {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 24rpx;
		letter-spacing: 1rpx;

		>view:first-child {
			color: #666666;
		}

		>view:last-child {
			color: #333333;
		}


	}

	.card {
		margin: 0 auto;
		margin-top: 20rpx;
		background-color: #FFFFFF;
		width: 690rpx;
		box-shadow: 0rpx 0rpx 5rpx 0rpx rgba(177, 177, 177, 0.42);
		border-radius: 10rpx;
		padding: 7rpx;
		padding-bottom: 30rpx;

		>view:first-child {
			font-size: 32rpx;
			color: #ff2b2b;
			padding: 12rpx 15rpx;
			border-bottom: 2rpx solid #d2d2d2;
		}

		.item {
			padding-right: 20rpx;
			padding-top: 20rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			>view:first-child {
				display: flex;
				align-items: center;

				>view:first-child {
					height: 60rpx;
					line-height: 60rpx;
					font-size: 32rpx;
					font-weight: bold;
					letter-spacing: 1rpx;
					color: #333333;
					padding: 0 15rpx;
					border-right: 2rpx solid #8fceee;


				}

				>view:last-child {
					font-size: 28rpx;
					font-weight: bold;
					padding-left: 20rpx;
					letter-spacing: 1rpx;
					color: #333333;
					max-width: 405rpx;
				}
			}

		}

		.button {
			width: 542rpx;
			height: 66rpx;
			margin-left: 74rpx;
			margin-top: 26rpx;

		}

		.text {
			font-size: 28rpx;
		}
	}
</style>
