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
        Route::post('/list',"UserController@list");
        Route::post('/addUser',"UserController@addUser");
        Route::post('/editUser',"UserController@editUser");
        Route::post('/delUser',"UserController@delUser");
        Route::post('/logout',"LoginController@logout");
    });
/*    Route::group(['prefix'=>'userManagement'],function (){
        Route::post('/list',"UserController@list");
    });*/
    Route::group(['prefix'=>'article'],function (){
        Route::post('/imgUpload',"UploadController@upload");
        Route::post('/addArticle',"ArticleController@addArticle");
        Route::post('/delArticle',"ArticleController@delArticle");
        Route::post('/editArticle',"ArticleController@editArticle");
        Route::post('/getArticleList',"ArticleController@getArticleList");
        Route::post('/getHomeArticleList',"ArticleController@getHomeArticleList");
        Route::post('/getArticleClass',"ArticleController@getArticleClass");
        Route::post('/addArticleClass',"ArticleController@addArticleClass");
        Route::post('/delArticleClass',"ArticleController@delArticleClass");
        Route::get('/getArticleTags',"ArticleController@getArticleTags");
        Route::post('/addArticleTags',"ArticleController@addArticleTags");
        Route::post('/delArticleTags',"ArticleController@delArticleTags");
        Route::post('/getArticleContent',"ArticleController@getArticleContent");
        Route::post('/getBackendArticleContent',"ArticleController@getBackendArticleContent");
        Route::post('/feedback',"ArticleController@addFeedback");
        Route::post('/addArticleComment',"ArticleController@addArticleComment");
        Route::post('/getArticleComment',"ArticleController@getArticleComment");
    });

    Route::group(['prefix'=>'api'],function (){
        Route::get('/getKey',"TranslationController@getKey");
        Route::post('/validateKey',"TranslationController@validateKey");
    });
});
