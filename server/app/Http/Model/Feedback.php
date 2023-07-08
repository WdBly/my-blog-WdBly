<?php

namespace App\Http\Model;

use Illuminate\Database\Eloquent\Model;
use DB;

class Feedback extends Model
{
    protected $table = 'feedback';

    public function addFeedback($data)
    {
        $this->email = $data['email'];
        $this->feedback = $data['feedback'];
        $re = $this->save();
        return $re?true:false;
    }
}
