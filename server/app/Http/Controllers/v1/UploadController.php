<?php

namespace App\Http\Controllers\v1;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UploadController extends BasicController
{


    /**
     * 上传图片
     * Created by huxin.
     * Date: 2018/1/22 0022 下午 16:14
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function upload(Request $request)
    {
        if(!$request->hasFile('file')){
            return renderJson('无法获取上传文件',null,400);
        }
        $file = $request->file('file');
        $bucket = $request->input('bucket');
        switch ($bucket){
            case 'article':
                return $this->uploadAvatar($file,'article');
            case 'line':
                return $this->uploadImage();
            default:
                return renderJson('上传文件用途有误',null,400);
        }
    }

    public $all_ext = ['jpg','jpeg','gif','png'];
    //上传头像
    public function uploadAvatar($file,$bucket)
    {
        try
        {
            if ($file->isValid())
            {
                //获取图片后缀名
                $ext = strtolower($file->getClientOriginalExtension());
                if (!in_array($ext, $this->all_ext))
                {
                    return renderJson('不允许上传的图片类型', null, 400);
                }
                $disk = Storage::disk('public');
                //生成图片唯一id
                $image_key = md5(file_get_contents($file->getPathname())) . '.' . $ext;
                //检测图片是否已经存在，存在则删除替换，不存在则上传

                $publicImagePath = base_path().'/public/image/article/';
                $htmlImagePath = base_path().'/html/image/article/';


                if ($disk->exists($bucket . '/' . $image_key))
                {
                    $res = $disk->delete($bucket . '/' . $image_key);
                    if ($res)
                    {
                        $picture_path = $file->storeAs($bucket, $image_key, 'public');
                        if ($picture_path)
                        {
							copy($htmlImagePath.$image_key, $publicImagePath.$image_key);

                            $picture_path = 'image/' . $picture_path;
                            return renderJson('上传成功', $picture_path, 200);
                        } else
                        {
                            return renderJson('上传失败', null, 400);
                        }
                    }
                } else
                {
                    $picture_path = $file->storeAs($bucket, $image_key, 'public');
                    if ($picture_path)
                    {
                        copy($htmlImagePath.$image_key, $publicImagePath.$image_key);
                        $picture_path = 'image/' . $picture_path;
                        return renderJson('上传成功', $picture_path, 200);
                    } else
                    {
                        return renderJson('上传失败', null, 400);
                    }
                }
            } else
            {
                return renderJson('上传图片不合法', null, 500);
            }
        } catch (\Exception $e)
        {
            return renderJson($e->getMessage(),null, 500);
        }
    }
}
