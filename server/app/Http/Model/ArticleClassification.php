<?php

namespace App\Http\Model;

use Illuminate\Database\Eloquent\Model;

class ArticleClassification extends Model
{
    protected $table = 'articleclassification';

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
        $da = $this->select('articleclassification.id as value','articleclassification.name as label')
                ->selectRaw('count(*) as total')
                ->leftJoin('articles', 'articleclassification.id', '=', 'articles.ca_id')
                ->where([["whetherPublic", "=", "1"]])
                ->groupBy('articleclassification.id')
                ->get()
                ->toArray();
        return $da;
    }
}
