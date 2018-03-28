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
            $data['img'] = "https://101.200.61.216/image/article/acb1c4189f5727fff608a11543663b69.jpg";
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
<<<<<<< HEAD
            $data['img'] = "https://127.0.0.1/image/article/acb1c4189f5727fff608a11543663b69.jpg";
=======
            $data['img'] = "http://101.200.61.216/image/article/acb1c4189f5727fff608a11543663b69.jpg";
>>>>>>> wdBlyBranch
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
        $all = $this->orderBy('created_at', 'desc')
            ->where($where)
            ->where(function ($query) use ($parameter) {
                $query->where('title', 'like', '%' . $parameter . '%')->orWhere(function ($query) use ($parameter) {
                    $query->where('description', 'like', '%' . $parameter . '%');
                });
            })
            ->select("*");
        $total = $all->count();
        $list = $all->skip(($data['pageNum'] - 1) * $data['pageSize'])->take($data['pageSize'])->get()->toArray();
        for($i = 0;$i < count($list); $i++){
            $d = DB::table('users')->where('id','=',$list[$i]['u_id'])->value('username');
            $list[$i]['username'] = $d;
        }
        return $list?['total'=>$total,'list'=>$list]:[];
    }
}
