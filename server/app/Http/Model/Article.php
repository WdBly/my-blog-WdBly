<?php

namespace App\Http\Model;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Article extends Model
{
    protected $table = 'articles';

    public function article($data)
    {
        if(!$data['img']){
            $data['img'] = "";
        }
        $this->title = $data['title'];
        $this->content = $data['content'];
        $this->img = $data['img'];
        $this->description = $data['description'];
        $this->ca_id = $data['ca_id'];
        $this->u_id = Auth::id();
        $re = $this->save();
        return $re?true:false;
    }
}
