<template>
	<view>
		<view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30" @tap="chooseAvatar">
			<view class="u-m-r-10">
				<u-avatar :src="avatar" size="140"></u-avatar>
			</view>
			<view class="u-flex-1">
				<view class="u-font-18 u-p-b-20">uView ui</view>
				<view class="u-font-14 u-tips-color">用户名:helang_uView</view>
			</view>
			<view class="u-m-l-10 u-p-10">
				<u-icon name="photo" color="#969799" size="28"></u-icon>
			</view>
			<view class="u-m-l-10 u-p-10">
				<u-icon name="arrow-right" color="#969799" size="28"></u-icon>
			</view>
		</view>
		
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="info" title="用户昵称"></u-cell-item>
				<u-cell-item icon="man" title="性别"></u-cell-item>
				<u-cell-item icon="phone" title="手机"></u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				avatar:'https://cdn.uviewui.com/uview/common/logo.png',
				show:true
			}
		},
		onLoad() {
			
		},
		methods: {
			chooseAvatar() {
				this.$u.route({
					url: 'pages/avatar-cropper/index',
					params: {
						// 输出图片宽度，高等于宽，单位px
						destWidth: 300,
						// 裁剪框宽度，高等于宽，单位px
						rectWidth: 200,
						// 输出的图片类型，如果'png'类型发现裁剪的图片太大，改成"jpg"即可
						fileType: 'jpg',
					}
				})
			},
		},
		created() {
			uni.$on('uAvatarCropper', path => {
				this.avatar = path;
				// 可以在此上传到服务端
				uni.uploadFile({
					url: 'http://192.168.1.18:9090/api/common/upload',
					filePath: path,
					name: 'file',
					complete: (res) => {
						console.log(res);
					}
				});
			})
		},
		
	}
</script>

<style lang="scss">
page{
	background-color: #ededed;
}

.camera{
	width: 54px;
	height: 44px;
	
	&:active{
		background-color: #ededed;
	}
}
.user-box{
	background-color: #fff;
}
</style>
