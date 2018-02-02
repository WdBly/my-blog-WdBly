<?php

namespace App\Http\Model;

use Illuminate\Database\Eloquent\Model;

class ArticleClassification extends Model
{
    protected $table = 'articleClassification';

    public function addArticleClass($data)
    {
        $this->name = $data['name'];
        $re = $this->save();
        return $re?true:false;
    }

    public function delArticleClass($data)
    {
        $re = $this->where([['name','=',$data['name']]])->delete();
        return $re?true:false;
    }

    public function getArticleClass()
    {
        $da = $this->select('id','name')->get()->toArray();
        $data1 = [];
        for($i = 0; $i < count($da); $i++){
            $data = [
                'value' => $da[$i]['id'],
                'label' => $da[$i]['name'],
            ];
            array_push($data1,$data);
        }
        return $data1;
    }
}
