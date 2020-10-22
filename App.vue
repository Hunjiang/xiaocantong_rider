<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	/* 引入uView基础样式 */
	@import "uview-ui/index.scss";
	page{
		background-color: #f4f4f4;
	}
</style>
