<?php
/**
 * Created by huxin.
 * User: huxin
 * Date: 2018/6/6 0006
 * Time: 下午 15:26
 */


//统一返回格式
if (!function_exists('renderJson'))
{
    function renderJson($message, $data = null, $code = 400,$httpCode=200,$status='ok')
    {
        return response()->json([
            'status'    =>$status,
            'data'      => $data ?? null,
            'msg'       => $message ?? null,
            'code'      => $code
        ],$httpCode,[],JSON_UNESCAPED_UNICODE);
    }
}

if(!function_exists('public_path'))
{
    /**
     * Return the path to public dir
     * @param null $path
     * @return string
     */
    function public_path($path=null)
    {
        return rtrim(app()->basePath('public/'.$path), '/');
    }
}


