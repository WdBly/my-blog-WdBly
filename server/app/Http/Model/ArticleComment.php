<?php

namespace App\Http\Model;

use Illuminate\Database\Eloquent\Model;
use DB;

class ArticleComment extends Model
{
    protected $table = 'article_comment';

    public function addArticleComment($data)
    {
        $this->comment = $data['comment'];
        $this->article_id = $data['articleId'];
        $re = $this->save();
        return $re?true:false;
    }
    public function getArticleComment($data)
    {
        $data = $this->where([['article_id','=',$data['id']]])->select("*")->orderBy('created_at', 'desc')->get()->toArray();;
        return $data;
    }
}
