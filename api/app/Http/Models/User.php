<?php
/**
 * Created by huxin.
 * User: huxin
 * Date: 2018/9/16 0016
 * Time: 下午 14:12
 */

namespace App\Http\Models;


use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $table  = 'users';
    protected $guarded = [];
}