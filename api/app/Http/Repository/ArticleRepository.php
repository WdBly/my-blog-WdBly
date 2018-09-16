<?php
/**
 * Created by huxin.
 * User: huxin
 * Date: 2018/9/16 0016
 * Time: 下午 14:19
 */

namespace App\Http\Repository;


use App\Http\Models\Article;
use App\Http\Models\ArticleClassification;
use App\Http\Models\ArticleTag;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ArticleRepository
{
    private $article;
    private $classification;
    private $tag;

    public function __construct(Article $article,ArticleClassification $classification,ArticleTag $tag)
    {
        $this->article = $article;
        $this->classification = $classification;
        $this->tag = $tag;
    }

    public function addArticle(array $data)
    {
        if(!$data['img']){
            $data['img'] = "http://112.74.34.178/image/article/acb1c4189f5727fff608a11543663b69.jpg";
        }
        $data['u_id'] = Auth::id();
        $re = $this->article->create($data);
        return $re?renderJson('添加文章成功',null,200)
            :renderJson('添加文章失败，请稍后再试');
    }

    public function delArticle(int $id)
    {
        $re = $this->article->destroy($id);
        return $re?renderJson('删除文章成功',null,200)
            :renderJson('删除文章失败，请稍后再试');
    }

    public function getArticleContent(int $id)
    {
        $res = $this->article
            ->join('users','users.id','=','articles.u_id')
            ->where('articles.id','=',$id)
            ->select("articles.*",'users.username')
            ->first();
        return $res?renderJson('获取文章详情成功',$res,200)
            :renderJson('暂无该文章数据');
    }

    public function editArticle(array $data)
    {
        if(!$data['img']){
            $data['img'] = "http://112.74.34.178/image/article/acb1c4189f5727fff608a11543663b69.jpg";
        }
        $re = $this->article->where('id',$data['id'])->update($data);
        return $re?renderJson('修改文章信息成功',null,200)
            :renderJson('修改文章信息失败，请稍后再试');
    }

    public function getArticleList(array $data)
    {
        $id = Auth::id();
        $index =1;
        $parameter = $data['search'];
        if($id==1){
            $where = [['articles.u_id','=',$id]];
        }else{
            $where = [['articles.whetherPublic','=',$index]];
        }
        $all = $this->article->join('users','users.id','=','articles.u_id')
            ->where($where)->where(function ($query) use ($parameter) {
                $query->where('title', 'like', '%' . $parameter . '%')->orWhere(function ($query) use ($parameter) {
                    $query->where('description', 'like', '%' . $parameter . '%');
                });
            })
            ->select("articles.*",'users.username');
        $total = $all->count();
        $list = $all->skip(($data['pageNum'] - 1) * $data['pageSize'])->take($total)->orderBy('articles.created_at', 'desc')->get();
        return $list->isNotEmpty()?renderJson('获取文章列表成功',['total'=>$total,'list'=>$list],200)
            :renderJson('暂无文章列表数据');
    }


    public function addArticleClass($data)
    {
        $right_data['name'] = $data['name'];
        $re = $this->classification->create($right_data);
        return $re?renderJson('添加文章分类成功',null,200)
            :renderJson('添加文章分类失败，请稍后再试');
    }

    public function delArticleClass($data)
    {
        $re = $this->classification->where([['name','=',$data['name']]])->delete();
        return $re?renderJson('修改文章分类成功',null,200)
            :renderJson('修改文章分类失败，请稍后再试');
    }

    public function getArticleClass()
    {
        $da = $this->classification->select('id','name')->get()->toArray();
        $data1 = [];
        for($i = 0; $i < count($da); $i++){
            $data = [
                'value' => $da[$i]['id'],
                'label' => $da[$i]['name'],
            ];
            array_push($data1,$data);
        }
        return !empty($data1)?renderJson('获取分类列表成功',$data1,200)
            :renderJson('暂无文章分类列表数据');
    }

    public function addArticleTags($data)
    {
        $right_data['name'] = $data['name'];
        $re = $this->tag->create($right_data);
        return $re?renderJson('添加标签成功',null,200)
            :renderJson('添加标签失败，请稍后再试');
    }

    public function delArticleTags($data)
    {
        $re = $this->tag->where([['name','=',$data['name']]])->delete();
        return $re?renderJson('删除文章标签成功',null,200)
            :renderJson('删除文章标签失败，请稍后再试');
    }

    public function getArticleTags()
    {
        $da = $this->tag->select('id','name')->get()->toArray();
        $data1 = [];
        for($i = 0; $i < count($da); $i++){
            $data = [
                'value' => $da[$i]['id'],
                'label' => $da[$i]['name'],
            ];
            array_push($data1,$data);
        }
        return !empty($data1)?renderJson('获取文章标签成功',$data1,200)
            :renderJson('暂无文章标签数据');
    }
}