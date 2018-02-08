<?php

namespace App\Http\Controllers\v1;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class BasicController extends Controller
{
    public function __construct()
    {
        $this->middleware('check_login')->except(['login','logout','getArticleClass','getArticleList','getArticleContent']);
    }
}
