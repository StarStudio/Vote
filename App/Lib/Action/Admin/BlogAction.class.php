<?php

//博客管理的控制器

class BlogAction extends CommonAction{

	//博客管理展示页面

	public function index(){
		import('ORG.Util.Page');

		$count = M('blog')->count();
		$page = new Page($count, 35);
		$limit = $page->firstRow . ',' . $page->listRows;

		$blog = M('blog')->order("vote_number")->limit($limit)->select();
		$this->page = $page->show();
		$this->blog = $blog;
		$this->display();
	}

	//删除博客条目的方法

	public function delete(){
		$id = I('id', '', 'intval');

		if(M('blog')->delete($id)){
			$this->success('删除成功', U('Admin/Blog/index'));
		}else{
			$this->error('删除失败');
		}
	}

	//展示新增条目页面

	public function add(){
		$this->display();
	}

	//新增条目的添加页面

	public function add_post(){
		if(!IS_POST) halt('页面不存在');

		$title = I('title');
		$content = I('content');
		$href = I('href');

		if($content == '' || $href == ''){
			$this->error('内容填写不规范');
		}

		$blog = array(
			'username' => $title,
			'content' => $content,
			'href' => $href
			);
		$flag = M('blog')->data($blog)->add();

		if($flag){
			$this->success('添加条目成功', U('Admin/Blog/add'));
		}else{
			$this->error('添加条目失败');
		}
	}
}

?>