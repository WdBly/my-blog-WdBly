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
            $data['img'] = "http://112.74.34.178/image/article/acb1c4189f5727fff608a11543663b69.jpg";
        }
        $data['u_id'] = Auth::id();
        $re = $this->create($data);
        return $re?true:false;
    }

    public function delArticle($data)
    {
        $re = $this->where([['id','=',$data['id']]])->delete();
        return $re?true:false;
    }

    public function getArticleContent($data)
    {
        $data = $this->where([['id','=',$data['id']]])->select("*")->first();
        $d = DB::table('users')->where('id','=',$data['u_id'])->value('username');
        $data["username"] = $d;
        return $data;
    }

    public function editArticle($data)
    {
        if(!$data['img']){
             $data['img'] = "http://112.74.34.178/image/article/acb1c4189f5727fff608a11543663b69.jpg";
        }
        $re = $this->where('id',$data['id'])->update($data);
        return $re?true:false;
    }

    public function getArticleList($data)
    {
        $id = Auth::id();
        $index =1;
        $parameter = $data['search'];
        if($id==1){
            $where = [['u_id','=',$id]];
        }else{
            $where = [['whetherPublic','=',$index]];
        }
        $all = $this->join('users','users.id','=','articles.u_id')
            ->where($where)
            ->when($parameter,function ($query) use ($parameter) {
                $query->where('title', 'like', '%' . $parameter . '%')->orWhere(function ($query) use ($parameter) {
                    $query->where('description', 'like', '%' . $parameter . '%');
                });
            })
            ->select("articles.title","articles.description","articles.img","articles.id","articles.original","articles.tags","articles.u_id","articles.updated_at","articles.whetherPublic","articles.ca_id","articles.created_at",'users.username');
        $total = $all->count();
        $list = $all->skip(($data['pageNum'] - 1) * $data['pageSize'])->take($total)->orderBy('articles.created_at', 'desc')->get();
        return $list->isNotEmpty()?['total'=>$total,'list'=>$list]:[];
    }
}
