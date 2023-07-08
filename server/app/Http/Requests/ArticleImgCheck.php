<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ArticleImgCheck extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'imgName'=>'required'
        ];
    }

    public function messages()
    {
        return [
            'imgName.required'=>'图片不能为空',
            'imgName.mimes'=>'图片类型有误'
        ];
    }
}
