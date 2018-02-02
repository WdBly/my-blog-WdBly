<?php

namespace App\Http\Controllers\v1;

use App\Http\Model\Article;
use App\Http\Model\ArticleClassification;
use App\Http\Requests\ArticleImgCheck;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ArticleController extends BasicController
{
    public function article(Request $request)
    {
        $data = $request->all();
        $user = new Article();
        $res = $user->article($data);
        if ($res)
        {
            return renderJson('文章发表成功', null, 200);
        } else
        {
            return renderJson('文章发表失败', null, 400);
        }
    }

    public function getArticleContent(Request $request)
    {
        $data = $this->validate($request,['id'=>'required|integer']);
        $user = new Article();
        $res = $user->getArticleContent($data);
        if ($res)
        {
            return renderJson('文章获取成功', $res, 200);
        } else
        {
            return renderJson('文章获取失败', null, 400);
        }
    }

    public function getArticleList(Request $request)
    {
        $data = $this->validate($request,['pageSize'=>'required|integer','pageNum'=>'required|integer','search'=>'present']);
        $article = new Article();
        $res = $article->getArticleList($data);
        if (!empty($res))
        {
            return renderJson('获取文章列表成功', $res, 200);
        } else
        {
            return renderJson('获取文章列表失败', null, 400);
        }
    }

    public function addArticleClass(Request $request)
    {
        $data = $this->validate($request,['name'=>'required|string|unique:articleClassification']);
        $addArticleClass = new ArticleClassification();
        $res = $addArticleClass->addArticleClass($data);
        if (!empty($res))
        {
            return renderJson('添加文章分类成功', $res, 200);
        } else
        {
            return renderJson('添加文章分类失败', null, 400);
        }
    }

    public function delArticleClass(Request $request)
    {
        $data = $this->validate($request,['name'=>'required|string']);
        $delArticleClass = new ArticleClassification();
        $res = $delArticleClass->delArticleClass($data);
        if ($res)
        {
            return renderJson('删除文章分类成功', null, 200);
        } else
        {
            return renderJson('删除文章分类失败', null, 400);
        }
    }

    public function getArticleClass()
    {
        $addArticleClass = new ArticleClassification();
        $res = $addArticleClass->getArticleClass();
        if (!empty($res))
        {
            return renderJson('获取文章分类成功', $res, 200);
        } else
        {
            return renderJson('暂无文章分类', null, 400);
        }
    }
}
