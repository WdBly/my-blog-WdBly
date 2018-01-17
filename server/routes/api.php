<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['namespace'=>'v1'],function (){
    Route::group(['prefix'=>'user'],function (){
        Route::post('/register',"LoginController@register");
        Route::post('/login',"LoginController@login");
        Route::post('/update',"LoginController@update");
        Route::post('/delete',"LoginController@delete");
    });
});
