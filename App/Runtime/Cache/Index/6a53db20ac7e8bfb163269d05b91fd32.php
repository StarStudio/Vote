<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<title>电子科技大学优秀博文评选</title>
	<link rel="stylesheet" type="text/css" href="__PUBLIC__/css/base.css">
	<link rel="stylesheet" type="text/css" href="__PUBLIC__/css/common.css">
	<link rel="stylesheet" type="text/css" href="__PUBLIC__/css/article.css">
</head>
<body>
<div class="header">
	<div class="main_title">
		<h1><img src="__PUBLIC__/images/uestc.png" />电子科技大学优秀博文评选</h1>
	</div>
	<div class="shadow"></div>
</div>
<div id="section" class="clearfix">
	<div class="clearfix">
		<form id="search" method="post" action="<?php echo U('Index/Index/articleSearch');?>">
			<input id="search_text" name="word" type="text" placeholder="search..." />
			<input id="search_button" type="submit" value="" />
		</form>
	</div>
	<ul class="ul_Article clearfix">
		<li class="article"></li>
		<li class="article"></li>
		<li class="article"></li>
		<li class="article"></li>
	</ul>
</div>
<div class="shadow"></div>
<div id="footer">
	<!-- <p>技术支持：<span class="studio">星辰工作室</span> 版权所有：<span class="uestc">电子科技大学</span> 联系方式：xxx@uestc.edu.cn</p> -->
	<p>技术支持：星辰工作室
	版权所有：电子科技大学网络文化建设工作办公室<br />
	联系方式：四川省成都市高新西区西源大道2006号电子科技大学清水河校区活动中心215</p>
</div>
<div class="shadow_bo"></div>
<p class="copyright">&copy; 2015 电子科技大学</p>
<div id="btn_top"></div>
<script type="text/javascript" src="__PUBLIC__/scripts/jquery.min.js"></script>
<script type="text/javascript">
	var publicUrl = '__PUBLIC__';
</script>
<script type="text/javascript" src="__PUBLIC__/scripts/main2.js"></script>
</body>
</html>