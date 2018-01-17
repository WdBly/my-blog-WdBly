<?php

namespace App\Http\Controllers\v1;

use App\Http\Model\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Http\Requests\UserLoginCheck;

class LoginController extends Controller
{
    public $right_user = '';

    //生成token
    public function getToken($uid)
    {
        $token = password_hash(generateToken(), PASSWORD_BCRYPT);
        $expire_at = time() + 60 * 24 * 60;  ///设置token过期时间24小时
        User::where('id', $uid)->update(['token' => $token, 'expire' => $expire_at]);   //token存入数据库
        return $token;
    }


    //登陆逻辑
    public function login(UserLoginCheck $request)
    {
        $data = $request->all();
        $user = new User();
        $res = $user->login($data);
        if ($res)
        {
            $token = $this->getToken($res);
            $all = ['user_id' => $res, 'token' => $token];
            return renderJson('登录成功', $all, 200);
        } else
        {
            return renderJson('用户名或者密码错误', null, 400);
        }
    }

    public function register(Request $request)
    {
        $data = $request->all();
        $user = new User();
        $res = $user->register($data);
        return $res?'success':'error';
    }

    public function update(Request $request)
    {
        $data = $request->all();
        $user = new User();
        $res = $user->loginUpdate($data);
        return $res?'success':'error';
    }

    public function delete(Request $request)
    {
        $data = $request->all();
        $user = new User();
        $res = $user->deleteUser($data);
        return $res?'success':'error';
    }
}

