<?php

namespace App\Http\Model;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Article extends Model
{
    protected $table = 'articles';

    public function getCreatedAtAttribute($value)
    {
        return mb_substr($value,0,10);
    }
    public function article($data)
    {
        if(!$data['img']){
            $data['img'] = "http://127.0.0.1/image/article/acb1c4189f5727fff608a11543663b69.jpg";
        }else{
            $this->img = $data['img'];
        }
        $this->title = $data['title'];
        $this->content = $data['content'];

        $this->description = $data['description'];
        $this->ca_id = $data['ca_id'];
        $this->whetherPublic = $data['whetherPublic'];
        $this->u_id = Auth::id();
        $re = $this->save();
        return $re?true:false;
    }

    public function getArticleContent($data)
    {
        $data = $this->where([['id','=',$data['id']]])->select("content")->first();
        return $data;
    }

    public function getArticleList($data)
    {
        $id = Auth::id();
        $index =1;
        $parameter = $data['search'];
        if($id==1){
            $where = [['u_id','=',$id]];
        }else{
            $where = [['u_id','=',$id],['weatherPublic','=',$index]];
        }
        $all = $this->orderBy('created_at', 'desc')
            ->where($where)
            ->where(function ($query) use ($parameter) {
                $query->where('title', 'like', '%' . $parameter . '%')->orWhere(function ($query) use ($parameter) {
                    $query->where('description', 'like', '%' . $parameter . '%');
                });
            })
            ->select(["id","title",'description','img','created_at']);

        $total = $all->count();
        $list = $all->skip(($data['pageNum'] - 1) * $data['pageSize'])->take($data['pageSize'])->get();
        return !$list->isEmpty()?['total'=>$total,'list'=>$list->toArray()]:[];
    }

    public function getArticleClass()
    {

        //return $re?true:false;
    }
}
