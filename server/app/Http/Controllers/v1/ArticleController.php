<?php

namespace App\Http\Controllers\v1;

use App\Http\Model\Article;
use App\Http\Model\ArticleClassification;
use App\Http\Model\ArticleTags;
use App\Http\Model\Feedback;
use App\Http\Model\ArticleComment;
use App\Http\Requests\ArticleImgCheck;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ArticleController extends BasicController
{
    public function addArticle(Request $request)
    {
        $data = $request->all();
        $user = new Article();
        $res = $user->addArticle($data);
        if ($res)
        {
            return renderJson('文章发表成功', null, 200);
        } else
        {
            return renderJson('文章发表失败', null, 400);
        }
    }

    public function delArticle(Request $request)
    {
        $data = $request->all();
        $user = new Article();
        $res = $user->delArticle($data);
        if ($res)
        {
            return renderJson('文章删除成功', null, 200);
        } else
        {
            return renderJson('文章删除失败', null, 400);
        }
    }

    public function editArticle(Request $request)
    {
        $data = $request->all();
        $user = new Article();
        $res = $user->editArticle($data);
        if ($res)
        {
            return renderJson('文章编辑成功', null, 200);
        } else
        {
            return renderJson('文章编辑失败', null, 400);
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

    public function getBackendArticleContent(Request $request)
    {
        $data = $this->validate($request,['id'=>'required|integer']);
        $user = new Article();
        $res = $user->getBackendArticleContent($data);
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

    public function getHomeArticleList(Request $request)
    {
        $typeTag = $request->input('type_tag', '');
        $typeClass = $request->input('type_class', '');
        $data = $this->validate($request,['pageSize'=>'required|integer','pageNum'=>'required|integer','search'=>'present']);
        $article = new Article();
        $data = array_merge($data, ['type_class' => $typeClass, 'type_tag' => $typeTag]);
        $res = $article->getHomeArticleList($data);
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
        $data = $this->validate($request,['name'=>'required|string|unique:articleclassification']);
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

    public function getArticleClass(Request $request)
    {
        $isAdmin = $request->input('get_all', 0);
        $addArticleClass = new ArticleClassification();
        $res = $addArticleClass->getArticleClass($isAdmin);
        if (!empty($res))
        {
            return renderJson('获取文章分类成功', $res, 200);
        } else
        {
            return renderJson('暂无文章分类', null, 400);
        }
    }

    public function addArticleTags(Request $request)
    {
        $data = $this->validate($request,['name'=>'required|string|unique:articletags']);
        $addArticleClass = new ArticleTags();
        $res = $addArticleClass->addArticleTags($data);
        if (!empty($res))
        {
            return renderJson('添加文章标签成功', $res, 200);
        } else
        {
            return renderJson('添加文章标签失败', null, 400);
        }
    }

    public function addFeedback(Request $request)
    {
        $data = $this->validate($request,['email'=>'required|string', 'feedback'=>'required|string']);
        $feedback = new Feedback();
        $res = $feedback->addFeedback($data);
        if (!empty($res))
        {
            return renderJson('留言成功', $res, 200);
        } else
        {
            return renderJson('留言失败', null, 400);
        }
    }

    public function addArticleComment(Request $request)
    {
        $data = $this->validate($request,['comment'=>'required|string', 'articleId'=>'required|integer']);
        $comment = new ArticleComment();
        $res = $comment->addArticleComment($data);
        if (!empty($res))
        {
            return renderJson('评论成功', $res, 200);
        } else
        {
            return renderJson('评论失败', null, 400);
        }
    }

    public function getArticleComment(Request $request)
    {
        $data = $this->validate($request,['id'=>'required|integer']);
        $comment = new ArticleComment();
        $res = $comment->getArticleComment($data);
        if (!empty($res))
        {
            return renderJson('获取评论成功', $res, 200);
        } else
        {
            return renderJson('获取评论失败', null, 400);
        }
    }

    public function delArticleTags(Request $request)
    {
        $data = $this->validate($request,['name'=>'required|string']);
        $delArticleClass = new ArticleTags();
        $res = $delArticleClass->delArticleTags($data);
        if ($res)
        {
            return renderJson('删除文章标签成功', null, 200);
        } else
        {
            return renderJson('删除文章标签失败', null, 400);
        }
    }

    public function getArticleTags()
    {
        $addArticleClass = new ArticleTags();
        $res = $addArticleClass->getArticleTags();
        if (!empty($res))
        {
            return renderJson('获取文章标签成功', $res, 200);
        } else
        {
            return renderJson('暂无文章标签', null, 400);
        }
    }
}
