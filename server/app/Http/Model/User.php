<?php

namespace App\Http\Model;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\User as AuthUser;
class User extends AuthUser
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
        $data = $this->where([['username','=',$data['username']],['password','=',$data['password']]])->select("id","username",'mobile')->first();
        Auth::guard('web')->loginUsingId($data->id);
        return $data;
    }
    public function deleteUser($data)
    {
        $re = $this->where(['username','=',$data['username']])->delete();
        return $re?true:false;
    }

    public function userList($data)
    {
        $id = Auth::id();
        $parameter = $data['search'];
        if($id==1){
            $all = $this->orderBy('created_at', 'desc')
                ->where(function ($query) use ($parameter) {
                    $query->where('username', 'like', '%' . $parameter . '%')->orWhere(function ($query) use ($parameter) {
                        $query->where('mobile', 'like', '%' . $parameter . '%')->orWhere(function ($query) use ($parameter){
                            $query->where('email', 'like', '%' . $parameter . '%');
                        });
                    });
                })
                ->select('*');

            $total = $all->count();
            $list = $all->skip(($data['pageNum'] - 1) * $data['pageSize'])->take($data['pageSize'])->get();
            return !$list->isEmpty()?['total'=>$total,'list'=>$list->toArray()]:[];
        }else{
            return false;
        }
    }

    public function addUser($data)
    {
        $re = $this->insert($data);
        return $re?true:false;
    }

    public function editUser($data)
    {
        $re = $this->where('id',$data['id'])->update($data);
        return $re?true:false;
    }

    public function delUser($data)
    {
        $re = $this->where('id','=',$data['id'])->delete();
        return $re?true:false;
    }
}
