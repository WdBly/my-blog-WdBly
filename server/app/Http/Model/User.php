<?php

namespace App\Http\Model;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $table = 'users';

    public function register($data)
    {
        $this->username = $data['username'];
        $this->password = $data['password'];
        $this->email = $data['email'];
        $this->mobile = $data['mobile'];
        $re = $this->save();
        return $re?true:false;
    }
    public function loginUpdate($data)
    {
        $re = $this->where('username',$data['username'])->update($data);
        return $re?true:false;
    }
    public function login($data)
    {
        $data = $this->where([['username','=',$data['username']],['password','=',$data['password']]])->value("id");
        return $data;
    }
    public function deleteUser($data)
    {
        $re = $this->where(['username','=',$data['username']])->delete();
        return $re?true:false;
    }
}
