/**
 * Created by ZhouWei on 2017/12/28.
 */

//校验输入字段
var validateUsername = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('用户名不能为空'));
    }else if (!/^([a-zA-Z\u4e00-\u9fa5\.]){4,16}$/.test(value)) {
        callback(new Error('只能输入4-16个中文、英文、.等字符'));
    }else{
        callback();
    }
};

var validateCaptcha = (rule, value, callback) => {  //4位验证码
    if (value === '') {
        callback(new Error('验证码不能为空!'));
    }else if(!/^\d{4}$/.test(value)){
        callback(new Error('请输入正确的验证码!'));
    } else {
        callback();
    }
};

var validateCaptchaSix = (rule, value, callback) => { //6位验证码
    if (value === '') {
        callback(new Error('验证码不能为空!'));
    }else if(!/^\d{6}$/.test(value)){
        callback(new Error('请输入正确的验证码!'));
    } else {
        callback();
    }
};

var validateName = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('姓名不能为空'));
    }else if (!/^[a-zA-Z\u4e00-\u9fa5]{2,20}$/.test(value)) {
        callback(new Error('只能2-20个汉字或者英文'));
    }else{
        callback();
    }
};
var validateMobile = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('手机不能为空'));
    }else if (!(/^1[34578]\d{9}$/.test(value))) {
        callback(new Error('请正确填写您的手机号码'));
    }else {
        callback();
    }
};

var validatePassword = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('密码不能为空'));
    }else if (!(/^.{6,12}$/.test(value))) {
        callback(new Error('6-12位密码'));
    }else {
        callback();
    }
};

var validateEmail = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('邮箱不能为空'));
    }else if (!(/^([\w\.\-]+)@([\w\.\-]+)\.([\w]{2,4})$/.test(value))) {
        callback(new Error('邮箱格式不正确'));
    }else {
        callback();
    }
};

export {
    validateUsername,
    validateCaptcha,
    validateCaptchaSix,
    validateName,
    validateMobile,
    validatePassword,
    validateEmail
}