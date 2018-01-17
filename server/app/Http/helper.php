<?php

/*
 * 请求成功 200
 * 参数错误 400
 * 没有权限 401
 * token失效 402
 * 服务器内部错误 500
 * 统一错误格式
 */
if (!function_exists('renderJson'))
{
    function renderJson($message, $data = null, $code = 500)
    {
        return response()->json([
            'data' => $data ?? null,
            'message' => $message ?? null,
            'code' => $code
        ],200,[],JSON_UNESCAPED_UNICODE);
    }
}

//生成唯一token
if (!function_exists('generateToken'))
{
    function generateToken($length = 32)
    {
        $str = '';
        $strr = 'ABCDEFGabcdefgHIJKLMNOPQhijklmnopqRSTUVWXYZ01234rstuv56789wxyz';
        $max = strlen($strr) - 1;
        for ($i = 0; $i < $length; $i++)
        {
            $str .= $strr[mt_rand(0, $max)];
        }
        return $str;
    }
}


if(!function_exists('ddd')){
    function ddd(...$args){
        http_response_code(500);
        call_user_func_array('dd', $args);
    }
}
