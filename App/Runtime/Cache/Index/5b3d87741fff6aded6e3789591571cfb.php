<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>电子科技大学优秀博客评选</title>
	<link rel="stylesheet" type="text/css" href="__PUBLIC__/css/base.css">
	<link rel="stylesheet" type="text/css" href="__PUBLIC__/css/common.css">
	<link rel="stylesheet" type="text/css" href="__PUBLIC__/css/broadcast.css">
</head>
<body>
<div class="header">
	<div class="main_title">
		<h1><img src="__PUBLIC__/images/uestc.png" />电子科技大学优秀博客评选</h1>
	</div>
	<div class="shadow"></div>
</div>
<div id="section" class="clearfix">
	<div class="clearfix">
		<form id="search" method="post" action="<?php echo U('Index/Index/blogSearch');?>">
			<input id="search_text" name="word" type="text" placeholder="search..." />
			<input id="search_button" type="submit" value="" />
		</form>
	</div>
	<ul class="blogSearch clearfix">
		<?php if(is_array($var)): foreach($var as $key=>$v): ?><li class="bc_intro">
			<div class="bc_wrap" _id="<?php echo ($v["id"]); ?>">
				<div class="up_part">
					<div class="water"></div>
				</div>
				<div class="bc_content clearfix">
					<a target="_blank" href="<?php echo ($v["href"]); ?>">
						<h4><?php echo ($v["username"]); ?></h4>
						<p style="height:76px;overflow:hidden;"><?php echo ($v["content"]); ?></p>
					</a>
					<div class="down_part">
						<div class="love">
							<a title="投票规则：针对每个博客，每人每天只能投一票。可以投多个博客，但是每天不超过三个。" href="javascript:void(0)">
								<img src="__PUBLIC__/images/heart3.png"> 
								<span><?php echo ($v["vote_number"]); ?></span>
								<span> 喜欢</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		</li><?php endforeach; endif; ?>
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
<script type="text/javascript" src="__PUBLIC__/scripts/main.js"></script>
</body>
</html>