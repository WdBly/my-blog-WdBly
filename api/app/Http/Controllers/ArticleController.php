<?php
/**
 * Created by huxin.
 * User: huxin
 * Date: 2018/9/16 0016
 * Time: 下午 14:09
 */

namespace App\Http\Controllers;


use App\Http\Repository\ArticleRepository;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    private $repository;

    public function __construct(ArticleRepository $repository)
    {
        parent::__construct(['getArticleList','getArticleContent','getArticleClass','getArticleTags']);
        $this->repository = $repository;
    }

    public function addArticle(Request $request)
    {
        $data = $request->all();
        return $this->repository->addArticle($data);
    }

    /**
     * 删除文章
     * Created by huxin.
     * Date: 2018/9/16 0016 下午 14:48
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \App\Exceptions\SecondValidationException
     */
    public function delArticle(Request $request)
    {
        $rule = ['id'=>'required|integer'];
        $data = $request->only('id');
        $this->validateParams($data,$rule);
        return $this->repository->delArticle($data['id']);
    }

    /**
     * 获取文章详情
     * Created by huxin.
     * Date: 2018/9/16 0016 下午 14:49
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \App\Exceptions\SecondValidationException
     */
    public function getArticleContent(Request $request)
    {
        $rule = ['id'=>'required|integer'];
        $data = $request->only('id');
        $this->validateParams($data,$rule);
        return $this->repository->getArticleContent($data['id']);
    }

    /**
     * 编辑文章
     * Created by huxin.
     * Date: 2018/9/16 0016 下午 14:50
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function editArticle(Request $request)
    {
        $data = $request->all();
        return $this->repository->editArticle($data);
    }

    /**
     * 获取文章列表
     * Created by huxin.
     * Date: 2018/9/16 0016 下午 14:51
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getArticleList(Request $request)
    {
        $data = $request->all();
        return $this->repository->getArticleList($data);
    }

    public function addArticleClass(Request $request)
    {
        $data = $request->all();
        return $this->repository->addArticleClass($data);
    }

    public function delArticleClass(Request $request)
    {
        $data = $request->all();
        return $this->repository->delArticleClass($data);
    }

    public function getArticleClass()
    {
        return $this->repository->getArticleClass();
    }

    public function addArticleTags(Request $request)
    {
        $data = $request->all();
        return $this->repository->addArticleTags($data);
    }

    public function delArticleTags(Request $request)
    {
        $data = $request->all();
        return $this->repository->delArticleTags($data);
    }

    public function getArticleTags()
    {
        return $this->repository->getArticleTags();
    }
}