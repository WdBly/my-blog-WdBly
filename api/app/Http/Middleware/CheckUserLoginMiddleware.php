<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Http\Middleware\BaseMiddleware;

class CheckUserLoginMiddleware extends BaseMiddleware
{
    /**
     * Created by huxin.
     * Date: 2018/6/6 13:24
     * @param         $request
     * @param Closure $next
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Response|mixed
     * @throws \Tymon\JWTAuth\Exceptions\JWTException
     */
    public function handle($request, Closure $next)
    {
        // 检查此次请求中是否带有 token，如果没有则抛出异常。
        $this->checkForToken($request);
        $old_token = $request->header('Authorization');
        $user = Cache::store('redis_user')->get(md5($old_token));
        if(!$user){
            return renderJson(Message::TOKEN_EXPIRED, null, Code::TOKEN_EXPIRED);
        }
        // 使用 try 包裹，以捕捉 token 过期所抛出的 TokenExpiredException  异常
        try
        {
            // 检测用户的登录状态，如果正常则通过
            if ($this->auth->parseToken()->authenticate())
            {
                return $next($request);
            }
            return renderJson(Message::USER_UNAUTHORIZED, null, Code::USER_UNAUTHORIZED);
        } catch (TokenExpiredException $exception)
        {
            // 此处捕获到了 token 过期所抛出的 TokenExpiredException 异常，我们在这里需要做的是刷新该用户的 token 并将它添加到响应头中
            try
            {
                // 刷新用户的 token
                $token = $this->auth->refresh();
                // 使用一次性登录以保证此次请求的成功
                $user_id = $this->auth->manager()->getPayloadFactory()->buildClaimsCollection()->toPlainArray()['sub'];
                Auth::guard('admin')->onceUsingId($user_id);
            } catch (JWTException $exception)
            {
                // 如果捕获到此异常，即代表token被加入黑名单了或者 refresh 也过期了，用户无法刷新令牌，需要重新登录。
                return renderJson(Message::TOKEN_EXPIRED, null, Code::TOKEN_EXPIRED);
            }
        }
        //缓存新的用户数据
        Cache::store('redis_user')->forget(md5($old_token));
        Cache::store('redis_user')->put(md5('Bearer '.$token), $user, config('website.user_cache_expired'));
        // 在响应头中返回新的 token
        return $this->setAuthenticationHeader($next($request), $token);
    }
}
