<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Validator;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //验证用户登录名
        Validator::extend('check_user_login_name',function ($attribute, $value, $parameters, $validator){
            if(!preg_match("/^[\x7f-\xffa-zA-Z0-9.]+$/", $value)){
                return false;
            }else{
                return true;
            }
        });
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
