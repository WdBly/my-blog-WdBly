<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});
$router->group([],function () use ($router){
    $router->group(['prefix'=>'user'],function () use ($router){
        $router->post('/register','UserController@register');
        $router->post('/login',"UserController@login");
        $router->post('/update',"UserController@update");
        $router->post('/delete',"UserController@delete");
        $router->post('/list',"UserController@userList");
        $router->post('/addUser',"UserController@addUser");
        $router->post('/editUser',"UserController@editUser");
        $router->post('/delUser',"UserController@delUser");
        $router->post('/logout',"UserController@logout");
    });
    /*    Route::group(['prefix'=>'userManagement'],function (){
            Route::post('/list',"UserController@list");
        });*/
    $router->group(['prefix'=>'article'],function () use ($router){
        $router->post('/imgUpload',"UploadController@upload");
        $router->post('/addArticle',"ArticleController@addArticle");
        $router->post('/delArticle',"ArticleController@delArticle");
        $router->post('/editArticle',"ArticleController@editArticle");
        $router->post('/getArticleList',"ArticleController@getArticleList");
        $router->get('/getArticleClass',"ArticleController@getArticleClass");
        $router->post('/addArticleClass',"ArticleController@addArticleClass");
        $router->post('/delArticleClass',"ArticleController@delArticleClass");
        $router->get('/getArticleTags',"ArticleController@getArticleTags");
        $router->post('/addArticleTags',"ArticleController@addArticleTags");
        $router->post('/delArticleTags',"ArticleController@delArticleTags");
        $router->post('/getArticleContent',"ArticleController@getArticleContent");
    });
});