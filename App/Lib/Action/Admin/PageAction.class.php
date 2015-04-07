<?php

//Page是Passage的简称我英语不好别吐槽了，注释方式参考Blog控制器

class PageAction extends CommonAction{

	public function index(){
		import('ORG.Util.Page');

		$count = M('passage')->count();
		$page = new Page($count, 73);
		$limit = $page->firstRow . ',' . $page->listRows;

		$passage = M('passage')->order("convert(title using gb2312) ASC")->limit($limit)->select();
		$this->page = $page->show();
		$this->passage = $passage;
		$this->display();
	}
	
	public function delete(){
		$id = I('id', '', 'intval');

		if(M('passage')->delete($id)){
			$this->success('删除成功', U('Admin/Page/index'));
		}else{
			$this->error('删除失败');
		}
	}

	public function add(){
		$this->display();
	}

	public function add_post(){
		if(!IS_POST) halt('页面不存在');

		$title = I('title');
		$content = I('content');
		$href = I('href');

		if($content == '' || $href == ''){
			$this->error('内容填写不规范');
		}

		$page = array(
			'title' => $title,
			'content' => $content,
			'href' => $href
			);
		$flag = M('passage')->data($page)->add();

		if($flag){
			$this->success('添加条目成功', U('Admin/Page/add'));
		}else{
			$this->error('添加条目失败');
		}
	}
}

?>
