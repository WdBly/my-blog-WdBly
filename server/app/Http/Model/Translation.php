<?php

namespace App\Http\Model;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\User as AuthUser;
class Translation extends AuthUser
{
    protected $table = 'keys';
    public function validateKey($data)
    {
        $key = $data.key;
        $data = $this->where([['username','=',$key]])->select("id")->first();
        return $data;
    }
    public function getKey()
    {
        $strs="QWERTYUIOPASDFGHJKLZXCVBNM1234567890qwertyuiopasdfghjklzxcvbnm";
        $key=substr(str_shuffle($strs),mt_rand(0,strlen($strs)-11), 5);
        $re = $this->insert($key);
        return $re?$key:false;
    }
}
