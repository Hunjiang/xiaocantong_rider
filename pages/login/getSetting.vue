<template>
</template>

<script>
	function getUrlParams (search) {
	  search = search || location.search;
	  var paramsSplit = search.replace(/^[^\?]*\?/i, '').split('&');
	  var params = {};
	 
	  if (Array.isArray(paramsSplit)) {
	    paramsSplit.forEach(function (item) {
	      const itemSplit = item.split('=');
	      params[itemSplit[0]] = itemSplit[1];
	    });
	  }
	  return params
	}
	let that 
	export default {
		data(){
			return{
				base:this.$base
			}
		},
		onLoad() {
			that = this
						let link = window.location.href;
						console.log('link',link)
						let params = getUrlParams (link);
						console.log('params',params)
						
						if(params.code){
							 this.$u.get('/api/rider_login/getOPenid2',{
								 code:params.code
							 }).then(res=>{
								 if(res.code==1){
									 uni.showToast({
									 	title:'授权成功,请继续登陆',
										icon:'none',
										success: () => {
											setTimeout(()=>{
												window.location.href = that.base+'/rider/#/pages/login/index'
											},1500)
										}
									 })
									 
								 }
							 })
							 
						}else{
							//跳转微信授权链接获取
							    let appid = 'wxad7c57f6263f6bd3';
							    let uri = encodeURIComponent(link);
								console.log('uri',uri)
							    let authURL = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${uri}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`;
								console.log('authURL',authURL)
							    window.location.href = authURL;
						}
		}
	}
</script>

<style>
</style>
