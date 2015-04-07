$(function(){

	/*初始化回到顶部按钮*/

	$("#btn_top").css({"right":Math.floor(($("body").width()-$("#section").width())/2.2)});
	if($(window).scrollTop()>parseInt($("#header").height()+50+"px")){
		$("#btn_top").css({"display":"none"});
	}else{
		$("#btn_top").fadeOut(200);
	}

	/*滑动判断位置*/

	$(window).scroll(function(){
		if($(window).scrollTop()>parseInt($("#header").height()+50+"px")){
			$("#btn_top").fadeIn(200);
		}else{
			$("#btn_top").fadeOut(200);
		}
	});
	$("#btn_top").click(function(){
		$(window.parent.document.getElementsByTagName('body'),window.parent.document.getElementsByTagName('html')).animate({scrollTop:0},500);
		setTimeout(function(){
			window.parent.document.getElementsByTagName('iframe')[0].style.display = 'none';
		},500);
	});

	/*窗口大小变化时，使返回顶部按钮固定*/

	function btn_position(){
		$("#btn_top").css({"right":Math.floor(($("body").width()-$("#section").width())/2.2)});	
	}
	var rs=null;/*设置延时器，以免resize引起的时刻计算浪费资源*/
	$(window).resize(function(){
		setTimeout(function(){
			$("#btn_top").css({"right":Math.floor(($("body").width()-$("#section").width())/2.2)});	
		},3000);
		window.clearTimeout(rs);
	});

	$(".bc_intro .love a").click(function(){/*这里很奇怪，进不去？*/
		var this1=jQuery.extend(true,{},$(this));/*jQuery自带对象深度复制*/
		var vote_id = $(this).parent().parent().parent().parent().attr("_id");
		if(findID(vote_id, 'blog')){
			$.ajax({
				type:'POST',
				url:'loveBlog',
				data:{"id": vote_id},
				success:function(data){
					if(data.flag){
						$($(this1).parent().find("span")[0]).html(parseInt($($(this1).parent().find("span")[0]).html())+1);
						alert('投票成功！');
						var oDate = new Date();
						oDate.setHours(24);
						if(getCookie('blog')===''){
							document.cookie = 'blog=' + vote_id+';expires='+oDate;
						}else{
							document.cookie = 'blog=' + getCookie('blog') + ',' + vote_id+';expires='+oDate;;
						}
					}else{
						alert('投票失败！每人每天仅有三票！');
					}
				}
			});
		}else{
			alert('同一天内对于同一条目不可重复投票！');
		}
	});
	$(".article .love a").click(function(){
		var this1=jQuery.extend(true,{},$(this));/*jQuery自带对象深度复制*/
		var vote_id = $(this).parent().parent().parent().attr("_id");
		if(findID(vote_id, ' passage')){
			$.ajax({
				type:'POST',
				url:'loveArticle',
				data:{"id":vote_id},
				success:function(data){
					if(data.flag){
						$($(this1).parent().find("span")[0]).html(parseInt($($(this1).parent().find("span")[0]).html())+1);
						alert('投票成功！');
						var oDate = new Date();
						oDate.setHours(24);
						if(getCookie(' passage')===''){
							document.cookie = 'passage=' + vote_id+';expires='+oDate;
						}else{
							document.cookie = 'passage=' + getCookie(' passage') + ',' + vote_id+';expires='+oDate;
						}
					}else{
						alert('投票失败！每人每天仅有三票！');
					}
				}
			});
		}else{
			alert('同一天内对于同一条目不可重复投票！');
		}
	})
	function getCookie(key){
		var arr1 = document.cookie.split(';');
		for(var i = 0;i<arr1.length;i++){
			var arr2 = arr1[i].split('=');
			if(arr2[0]==key){
				return arr2[1];
			}
		}
		return '';
	}
	function findID(id, part){
		var find = getCookie(part);
		if(find===''){
			return true;
		}else{
			var result = find.split(',');
			for(var i = 0; i < result.length; i++){
				if(result[i]==id){
					return false;
				}
			}
		}
		return true;
	}
})
