<?php

namespace App\Http\Controllers\v1;

use App\Http\Model\Translation;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TranslationController extends BasicController
{
    public function validateKey(Request $request)
    {
        $data = $this->validate($request,['key'=>'required|string']);
        $translate = new Translation();
        $res = $translate->validateKey($data);
        if ($res)
        {
            return renderJson('key校验成功', $res, 200);
        } else
        {
            return renderJson('key校验失败', null, 400);
        }
    }

    public function getKey()
    {
        $translate = new Translation();
        $res = $translate->getKey();
        if (!empty($res))
        {
            return renderJson('获取Key成功', $res, 200);
        } else
        {
            return renderJson('获取Key失败', null, 400);
        }
    }
}
