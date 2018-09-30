<?php
/**
 * Created by huxin.
 * User: huxin
 * Date: 2018/1/15
 * Time: 14:51
 */

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserLoginCheck extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'username' => 'required|check_user_login_name',
            'password' => 'required',
        ];
    }

    public function messages()
    {
        return [
            'username.required' => '登陆账号不能为空',
            'username.check_user_login_name' => '请输入正确的用户名',
            'password.required' => '登陆密码不能为空'
        ];
    }
}
