<?php

namespace App\Http\Model;

use Illuminate\Database\Eloquent\Model;
use DB;

class ArticleTags extends Model
{
    protected $table = 'articletags';

    public function addArticleTags($data)
    {
        $this->name = $data['name'];
        $re = $this->save();
        return $re?true:false;
    }

    public function delArticleTags($data)
    {
        $re = $this->where([['name','=',$data['name']]])->delete();
        return $re?true:false;
    }

    public function getArticleTags()
    {
        $da = $this->select('id', 'name')
                ->get()
                ->toArray();
        $data1 = [];

        $articleTags = DB::connection('mysql')->table('articles')->where('whetherPublic', 1)->select('tags')->get();
        $allTags = [];
        foreach ($articleTags as $val) {
            if ($val->tags) {
                $temp = json_decode($val->tags, true);
                foreach ($temp as $tId) {
                    $allTags[$tId] = isset($allTags[$tId]) ? $allTags[$tId] + 1 : 1; 
                }
            }
        }

        for($i = 0; $i < count($da); $i++){
            $data = [
                'value' => $da[$i]['id'],
                'label' => $da[$i]['name'],
                'total' => isset($allTags[$da[$i]['id']]) ? $allTags[$da[$i]['id']] : 0
            ];
            array_push($data1,$data);
        }
        return $data1;
    }
}
