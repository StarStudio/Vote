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

	/*判断是博文页面还是博客页面*/

	if($("#section ul").hasClass("ul_Broadcast")){
		var aLi=$("#section .ul_Broadcast li");
	}else if($("#section ul").hasClass("ul_Article")){
		var aLi=$("#section .ul_Article li");
	}else{
		var aLi=[];
	}
	var iLen=aLi.length;
	var iPage=1;
	var b=false;/*判断瀑布流获取数据成功与否*/

	/*博客瀑布流*/

	function getList_Broadcast(){
		$.ajax({
			type:"POST",
			url:"blogData",
			data:{page_number:iPage},
			success:function(data){
				for(var i=0;i<data.length;i++){
					var _index=getShort();/*获取高度最短的li*/
					var randomNum = parseInt(Math.random()*42+1);
					randomNum = randomNum >=10 ? randomNum : '0' + randomNum;
					var str ='<div class="bc_wrap" _id="'+data[i].id+'">'+
						'<div style="background-image:url('+publicUrl+'/images/'+ randomNum +'.jpg)" class="up_part"><div class="water"></div></div>'+
						'<div class="bc_content clearfix">'+
							'<a target="_blank" href="'+data[i].href+'">'+
								'<h4>'+data[i].username+'</h4>'+
								'<p>'+data[i].content+'</p>'+
							'</a>'+
							'<div class="down_part">'+
								'<div class="love">'+
									'<a title="投票规则：针对每个博客，每人每天只能投一票。可以投多个博客，但是每天不超过三个。" href="javascript:void(0)">'+
										'<img src="'+publicUrl+'/images/heart3.png">'+
										 ' <span>'+data[i].vote_number+'</span><span> 投票</span>'+
									'</a>'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</div>';
					$(aLi[_index]).append(str);
					/*append是jquery封装的函数，所以前面的变量要用jquery$符号*/
					b=true;/*判断获取数据成功与否*/
				}

				$(".love a").unbind("click").click(function(){/*这里很奇怪，进不去？*/
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
			}
		});
	}

	/*博文瀑布流*/

	function getList_Article(){
		$.ajax({
			type:"POST",
			url:"passageData",
			data:{page_number:iPage},
			success:function(data){
				for(var i=0;i<data.length;i++){
					var _index=getShort();
					var randomNum = parseInt(Math.random()*42+1);
					randomNum = randomNum >=10 ? randomNum : '0' + randomNum;
					var str='<div class="a_wrap" _id="'+data[i].id+'">'+
						'<a target="_blank" href="'+data[i].href+'">'+
							'<div style="background-image:url('+publicUrl+'/images/'+ randomNum +'.jpg)" class="up_part"><div class="water"></div></div>'+
							'<div class="mid_part">'+
								'<h4 title="'+data[i].title+'" class="ellipsis">'+data[i].title+'</h4>'+
								'<p style="height:104px;overflow:hidden;" class="ellipsis">'+data[i].content+'</p>'+
								'<p style="text-align:right;">阅读全文</p>'+
							'</div>'+
						'</a>'+
						'<div class="down_part">'+
							'<div class="love">'+
								'<a title="投票规则：针对每篇博文，每人每天只能投一票。可以投多篇博文，但是每天不超过三个。" href="javascript:void(0)">'+
									'<img src="'+publicUrl+'/images/heart3.png">'+
									 ' <span>'+data[i].vote_number+'</span><span> 投票</span>'+
								'</a>'+
							'</div>'+
						'</div>'+
					'</div>';
					$(aLi[_index]).append(str);
					b=true;
				}
				$(".love a").unbind("click").click(function(){
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
				});
			}
		});
	}

	/*判断页面是博客还是博文*/

	if(aLi[0]==$("#section .ul_Broadcast li")[0]){
		getList_Broadcast();/*打开页面初始化*/
	}
	else if(aLi[0]==$("#section .ul_Article li")[0]){
		getList_Article();
	}
	$(window).scroll(function(){/*滑动时判断*/
		var _index=getShort();
		var oLi=aLi[_index];
		var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
		if(getTop(oLi)+oLi.offsetHeight<document.documentElement.clientHeight+scrollTop){
			if (b==true&&aLi[0]==$("#section .ul_Broadcast li")[0]) {
				iPage++;
				getList_Broadcast();
				b=false;
			}
			else if(b==true&&aLi[0]==$("#section .ul_Article li")[0]){
				iPage++;
				getList_Article();
				b=false;
			}
		}
	});
	function getShort(){/*获得最短一列*/
		var index=0;
		var ih=aLi[index].offsetHeight;
		for(var i=1;i<iLen;i++){
			if(aLi[i].offsetHeight<ih){
				index=i;
				ih=aLi[i].offsetHeight;
			}
		}
		return index;
	}
	function getTop(obj){/*获取对象对于页面最顶部的距离*/
		var iTop=0;
		while(obj){
			iTop+=obj.offsetTop;
			obj=obj.offsetParent;
		}
		return iTop;
	}
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
