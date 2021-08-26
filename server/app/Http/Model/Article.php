<?php

namespace App\Http\Model;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class Article extends Model
{
    protected $table = 'articles';
    protected $guarded = [];

/*    public function getCreatedAtAttribute($value)
    {
        return mb_substr($value,0,10);
    }*/
    public function addArticle($data)
    {
        if(!$data['img']){
            $data['img'] = "http://cdn.wddsss.com/image/article/acb1c4189f5727fff608a11543663b69.jpg";
        }
        $data['u_id'] = Auth::id();
        $re = $this->create($data);
        return $re?true:false;
    }

    public function delArticle($data)
    {
        $id = Auth::id();
        $articleData = $this->find($data['id']);
        if (!empty($articleData)) {
            if ($articleData->u_id != $id && $id != 1) {
                return false;
            }

            $re = $this->where([['id','=',$data['id']]])->delete();
            return $re?true:false;
        }
        return false;
    }

    public function getArticleContent($data)
    {
        $data = $this->where([['id','=',$data['id']], ['whetherPublic','=', 1]])->select("*")->first();
        $next = $this->where([['id','>',$data['id']], ['whetherPublic', '=', 1]])->select("id", "title")->first();
        $d = DB::table('users')->where('id','=',$data['u_id'])->value('username');
        $class_name = DB::table('articleclassification')->where('id','=',$data['ca_id'])->value('name');
        $data["username"] = $d;
        $data["class_name"] = $class_name;
        $data["next"] = $next;

        // 新增查询下一篇文章

        // 设置文章阅读次数
        $this->where('id',$data['id'])->increment('read_num', 1);

        return $data;
    }

    public function getBackendArticleContent($data)
    {
        $data = $this->where([['id','=',$data['id']]])->select("*")->first();
        $next = $this->where([['id','>',$data['id']], ['whetherPublic', '=', 1]])->select("id", "title")->first();
        $d = DB::table('users')->where('id','=',$data['u_id'])->value('username');
        $class_name = DB::table('articleclassification')->where('id','=',$data['ca_id'])->value('name');
        $data["username"] = $d;
        $data["class_name"] = $class_name;
        $data["next"] = $next;

        // 新增查询下一篇文章

        // 设置文章阅读次数
        $this->where('id',$data['id'])->increment('read_num', 1);

        return $data;
    }

    public function editArticle($data)
    {
        if(!$data['img']){
            $data['img'] = "http://cdn.wddsss.com/image/article/acb1c4189f5727fff608a11543663b69.jpg";
        }

        $id = Auth::id();
        $articleData = $this->find($data['id']);
        if (!empty($articleData)) {
            if ($articleData->u_id != $id && $id != 1) {
                return false;
            }

            $re = $this->where('id',$data['id'])->update($data);
            return $re?true:false;
        }
        return false;
    }

    public function getArticleList($data)
    {
        $id = Auth::id();
        $parameter = $data['search'];
        $where = [['u_id','=',$id]];

        return $id

        // $all = $this->join('users','users.id','=','articles.u_id')
        //     ->where($where)
        //     ->when($parameter,function ($query) use ($parameter) {
        //         $query->where('title', 'like', '%' . $parameter . '%')->orWhere(function ($query) use ($parameter) {
        //             $query->where('description', 'like', '%' . $parameter . '%');
        //         });
        //     })
        //     ->select("articles.title","articles.description","articles.img","articles.id","articles.original","articles.tags","articles.u_id","articles.updated_at","articles.whetherPublic","articles.ca_id","articles.created_at",'users.username');
        // $total = $all->count();
        // $list = $all->skip(($data['pageNum'] - 1) * $data['pageSize'])->take($total)->orderBy('articles.created_at', 'desc')->get();
        // return $list->isNotEmpty()?['total'=>$total,'list'=>$list]:[];
    }

    public function getHomeArticleList($data)
    {
        // 登陆后可以看到所有公开文章 + 自己的私人文章
        $id = Auth::id();
        $parameter = $data['search'];
        $model = new Article();
        $model = $model->where('whetherPublic', 1);
        // if(!$id) {
        //     // 未登录
        //     $model = $model->where('whetherPublic', 1);
        // } else {
        //     // 登陆
        //     $model = $model->where(function ($query) use($id) {
        //         $query->where('u_id', $id)
        //         ->orWhere('whetherPublic', 1);
        //     });
        // }

        // 重构后新增逻辑
        // 1 文章列表中包含了 class name
        // 2 文章可通过tag_id 和class_id来筛选
        // 3 文章新增阅读次数 延后
        if (isset($data['type_tag']) && is_numeric($data['type_tag'])) {
            $model = $model->where('articles.tags', 'like', '%' . $data['type_tag'] . '%');
        }
        if (isset($data['type_class']) && is_numeric($data['type_class'])) {
            $model = $model->where('articles.ca_id', $data['type_class']);
        }

        $all = $model->leftJoin('users','users.id','=','articles.u_id')
            ->when($parameter,function ($query) use ($parameter) {
                $query->where('articles.title', 'like', '%' . $parameter . '%')->orWhere(function ($query) use ($parameter) {
                    $query->where('articles.description', 'like', '%' . $parameter . '%');
                });
            })
            ->leftJoin('articleclassification', 'articles.ca_id', '=', 'articleclassification.id')
            ->select("articleclassification.name as class_name", "articles.title","articles.description","articles.img","articles.id","articles.original","articles.tags","articles.u_id","articles.updated_at","articles.whetherPublic","articles.ca_id","articles.created_at","articles.read_num",'users.username');
        $total = $all->count();
        $list = $all->skip(($data['pageNum'] - 1) * $data['pageSize'])->take($data['pageSize'])->orderBy('articles.created_at', 'desc')->get();
        return $list->isNotEmpty()?['total'=>$total,'list'=>$list]:[];
    }
}
