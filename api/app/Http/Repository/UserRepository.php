<?php
/**
 * Created by huxin.
 * User: huxin
 * Date: 2018/9/16 0016
 * Time: 下午 14:19
 */

namespace App\Http\Repository;


use App\Http\Models\User;
use Illuminate\Support\Facades\Auth;

class UserRepository extends BasicRepository
{
    private $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    //生成token
    public function getToken($uid,$token)
    {
        $expire_at = time() + 6*60*60;
        $this->user->where('id', $uid)->update(['token' => $token, 'expire' => $expire_at]);   //token存入数据库
        return $token;
    }

    public function register($data)
    {
        $right_data['username'] = $data['username'];
        $right_data['password'] = $data['password'];
        $right_data['email'] = $data['email'];
        $right_data['mobile'] = $data['mobile'];
        $re = $this->user->create($right_data);
        return $re?renderJson('注册账号成功',null,200)
            :renderJson('注册账号失败，请稍后再试');
    }
    public function loginUpdate($data)
    {
        $re = $this->user->where('username',$data['username'])->update($data);
        return $re?renderJson('修改信息成功',null,200)
            :renderJson('修改信息失败，请稍后再试');
    }
    public function login($data)
    {
        $res = $this->user
            ->where([['username','=',$data['username']],['password','=',$data['password']]])
            ->select("id","username",'mobile')
            ->first();
        if($res){
            $token = Auth::login($res);
            $token = $this->getToken($res->id,$token);
            $all = ['user_id' => $res->id, 'token' => 'Bearer '.$token, 'username' => $res->username, 'mobile' => $res->mobile];
            return renderJson('登录成功', $all, 200);
        }
        return renderJson('登录失败，请稍后再试');
    }
    public function deleteUser($data)
    {
        $re = $this->user->where(['username','=',$data['username']])->delete();
        return $re?renderJson('删除用户成功',null,200)
            :renderJson('删除用户失败，请稍后再试');
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
            return !$list->isEmpty()?renderJson('获取用户列表成功',['total'=>$total,'list'=>$list->toArray()],200)
                :renderJson('暂无用户列表数据');
        }else{
            return renderJson('暂无用户列表数据');
        }
    }

    public function addUser($data)
    {
        $re = $this->user->insert($data);
        return $re?renderJson('添加用户成功',null,200)
            :renderJson('添加用户失败，请稍后再试');
    }

    public function editUser($data)
    {
        $re = $this->user->where('id',$data['id'])->update($data);
        return $re?renderJson('编辑用户信息成功',null,200)
            :renderJson('修改用户信息失败，请稍后再试');
    }

    public function delUser($data)
    {
        $re = $this->user->where('id','=',$data['id'])->delete();
        return $re?renderJson('删除用户成功',null,200)
            :renderJson('删除用户失败，请稍后再试');
    }
}