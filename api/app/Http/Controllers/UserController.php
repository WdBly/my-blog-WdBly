<?php
/**
 * Created by huxin.
 * User: huxin
 * Date: 2018/9/16 0016
 * Time: 下午 14:05
 */

namespace App\Http\Controllers;


use App\Http\Repository\UserRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    private $repository;

    public function __construct(UserRepository $repository)
    {
        parent::__construct(['login','logout','register']);
        $this->repository = $repository;
    }

    public function register(Request $request)
    {
        $rule = [
            'username'=>'required',
            'password'=>'required',
            'email'=>'required',
            'mobile'=>'required'
        ];
        $data = $request->all();
        $this->validateParams($data,$rule);
        return $this->repository->register($data);
    }

    public function loginUpdate(Request $request)
    {
        $data = $request->all();
        return $this->repository->loginUpdate($data);
    }

    public function login(Request $request)
    {
        $data = $request->all();
        return $this->repository->login($data);
    }

    public function deleteUser(Request $request)
    {
        $data = $request->all();
        return $this->repository->deleteUser($data);
    }

    public function userList(Request $request)
    {
        $data = $request->all();
        return $this->repository->userList($data);
    }

    public function addUser(Request $request)
    {
        $data = $request->all();
        return $this->repository->addUser($data);
    }

    public function editUser(Request $request)
    {
        $data = $request->all();
        return $this->repository->editUser($data);
    }

    public function delUser(Request $request)
    {
        $data = $request->all();
        return $this->repository->delUser($data);
    }

    public function logout()
    {
        Auth::guard('web')->logout();
        return renderJson('退出登录成功',null,200);
    }
}