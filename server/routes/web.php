<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::group(['namespace'=>'v1'],function (){
    Route::group(['prefix'=>'user'],function (){
        Route::post('/register',"LoginController@register");
        Route::post('/login',"LoginController@login");
        Route::post('/update',"LoginController@update");
        Route::post('/delete',"LoginController@delete");
    });
    Route::group(['prefix'=>'article'],function (){
        Route::post('/imgUpload',"UploadController@upload");
        Route::post('/article',"ArticleController@article");
    });
});
