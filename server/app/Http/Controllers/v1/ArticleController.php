<?php

namespace App\Http\Controllers\v1;

use App\Http\Model\Article;
use App\Http\Requests\ArticleImgCheck;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ArticleController extends BasicController
{
    public function article(Request $request)
    {
        $data = $request->all();
        $user = new Article();
        $res = $user->article($data);
        if ($res)
        {
            return renderJson('文章发表成功', null, 200);
        } else
        {
            return renderJson('文章发表失败', null, 400);
        }
    }
}
