<?php

class IndexAction extends Action{

	public function index(){
		$this->display();
	}

	public function article(){
		// import('ORG.Util.Page');

		// $count = M('passage')->count();
		// $page = new Page($count, 6);
		// $limit = $page->firstRow . ',' . $page->listRows;

		$passage = M('passage')->order('id DESC')->select();
		// $this->page = $page->show();
		$this->passage = $passage;

		$this->display();
	}

	public function broadcast(){
		// import('ORG.Util.Page');

		// $count = M('blog')->count();
		// $page = new Page($count, 8);
		// $limit = $page->firstRow . ',' . $page->listRows;

		$blog = M('blog')->order('id DESC')->select();
		// $this->page = $page->show();
		$this->blog = $blog;
		$this->display();
	}
	
	public function loveBlog()
	{
		if(!IS_AJAX) halt('页面不存在');
		if(I('id') == '') $this->ajaxReturn(array('flag' => false), 'json');

		//获取当前客户端 IP

		$ip=get_client_ip();

		$find = array(
			'login_ip' => $ip,
			'date' => date("y-m-d", time()),
			);

		if(!(M('ip_list')->where($find)->select())){
			M('ip_list')->data($find)->add();
		}

		$var = M('ip_list')->where($find)->select();

		if($var[0]["times"]>=3){//大于3则提示不能重复投票
			$this->ajaxReturn(array('flag' => false), 'json');
		}else{
			M("ip_list")->where($find)->setInc("times");
			M('blog')->where(array('id' => I('id', '', 'intval')))->setInc("vote_number");
			$this->ajaxReturn(array('flag' => true), 'json');
		}
	}

	public function loveArticle()
	{
		if(!IS_AJAX) halt('页面不存在');
		if(I('id') == '') $this->ajaxReturn(array('flag' => false), 'json');

		//获取当前客户端 IP
		$ip = get_client_ip();

		$find = array(
			'login_ip' => $ip,
			'date' => date("y-m-d", time()),
			);

		if(!(M('ip_list')->where($find)->select())){
			M('ip_list')->data($find)->add();
		}

		$var = M('ip_list')->where($find)->select();

		if($var[0]["p_times"]>=3){//大于3则提示不能重复投票
			$this->ajaxReturn(array('flag' => false), 'json');
		}else{
			M("ip_list")->where($find)->setInc("p_times");
			M('passage')->where(array('id' => I('id', '', 'intval')))->setInc("vote_number");
			$this->ajaxReturn(array('flag' => true), 'json');
		}
	}

	public function blogData(){

		$page_number = I('page_number', '', 'intval');

		$data = M('blog')->order("convert(username using gb2312) ASC")->page($page_number, 8)->select();
		if($data != null){
			$this->ajaxReturn($data, 'json');
		}else{
			$this->ajaxReturn(array('flag' => false), 'json');
		}
	}

	public function passageData(){

		$page_number = I('page_number', '', 'intval');

		$data = M('passage')->order("convert(title using gb2312) ASC")->page($page_number, 5)->select();
		if($data != null){
			$this->ajaxReturn($data, 'json');
		}else{
			$this->ajaxReturn(array('flag' => false), 'json');
		}
	}

	public function blogSearch(){

		$word = I('word');

		if($word != ''){
			$find['username'] = array('like','%'.I('word').'%',);
			$var = M('blog')->where($find)->select();
		}else{
			$var =array();
		}

		$this->var = $var;
		$this->display();
	}

	public function articleSearch(){

		$word = I('word');

		if($word != ''){
			$find['title'] = array('like','%'.I('word').'%',);
			$var = M('passage')->where($find)->select();
		}else{
			$var =array();
		}

		$this->var = $var;
		$this->display();
	}

	public function rule(){
		$this->display();
	}

}

?>
