<?php

namespace App\Http\Controllers\v1;

use App\Http\Model\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UserController extends BasicController
{
    public function list(Request $request)
    {
        $data = $this->validate($request,['pageSize'=>'required|integer','pageNum'=>'required|integer','search'=>'present']);
        $user = new User();
        $res = $user->userlist($data);
        if ($res)
        {
            return renderJson('用户列表获取成功', $res, 200);
        } else
        {
            return renderJson('用户列表获取失败', null, 400);
        }
    }

    public function addUser(Request $request)
    {
        $data = $this->validate($request,['username'=>'required|string','password'=>'required|string','email'=>'required|string','mobile'=>'required|string']);
        $user = new User();
        $res = $user->addUser($data);
        if ($res)
        {
            return renderJson('添加用户成功', null, 200);
        } else
        {
            return renderJson('添加用户失败', null, 400);
        }
    }

    public function editUser(Request $request)
    {
        $data = $this->validate($request,['id'=>'required|integer','username'=>'required|string','password'=>'required|string','email'=>'required|string','mobile'=>'required|string']);
        $user = new User();
        $res = $user->editUser($data);
        if ($res)
        {
            return renderJson('修改用户成功', null, 200);
        } else
        {
            return renderJson('修改用户失败', null, 400);
        }
    }

    public function delUser(Request $request)
    {
        $data = $this->validate($request,['id'=>'required|integer']);
        $user = new User();
        $res = $user->delUser($data);
        if ($res)
        {
            return renderJson('删除用户成功', null, 200);
        } else
        {
            return renderJson('删除用户失败', null, 400);
        }
    }
}
