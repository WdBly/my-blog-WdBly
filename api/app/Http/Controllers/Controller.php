<?php

namespace App\Http\Controllers;

use App\Exceptions\SecondValidationException;
use Illuminate\Support\Facades\Validator;
use Laravel\Lumen\Routing\Controller as BaseController;

class Controller extends BaseController
{
    public function __construct($actions=[])
    {
        $this->middleware('auth',['except'=>$actions]);
    }

    public function validateParams($data,$rule,$message=[])
    {
        $validator = Validator::make($data,$rule,$message);
        if($validator->fails()){
            throw new SecondValidationException($validator->errors()->first(),400);
        }
        return true;
    }
}
