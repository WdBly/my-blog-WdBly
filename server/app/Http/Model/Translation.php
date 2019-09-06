<?php

namespace App\Http\Model;
use Illuminate\Database\Eloquent\Model;

class Translation extends Model
{
    protected $table = 'keys';
    public function validateKey($data)
    {
        $key = $data['key'];
        $data = $this->where([['key','=',$key]])->select("id")->first();
        return $data;
    }
    public function getKey()
    {
        $strs="QWERTYUIOPASDFGHJKLZXCVBNM1234567890qwertyuiopasdfghjklzxcvbnm";
        $key=substr(str_shuffle($strs),mt_rand(0,strlen($strs)-11), 5);
        $this->key = $key;
        $re = $this->save();
        return $re?$key:false;
    }
}
