<template>
    <div id="login">
        <el-row type="flex" justify="space-around">
            <el-col style="width: 400px;" :xs="0">
                <div class="describeText">
                    <img src="../../static/images/rotateCircleIn.png" class="rotateIn"/>
                    <img src="../../static/images/rotateCircleOut.png" class="rotateOut"/>
                    <img src="../../static/images/sharp.png" class="sharpOut"/>
                    <img src="../../static/images/p1_kuang2.22221.png" class="p1_kuang2"/>
                    <img src="../../static/images/p1_jqr.22221.png" class="p1_jqr"/>
                </div>
            </el-col>
            <el-col class="elColWidth">
                <div class="loginFrame">
                    <div class="loginFrameHead">
                        <span>密码登陆</span>
                        <el-tooltip class="item"  effect="light" :content="pwOrQRCode=='PW'?'扫码登陆':'密码登陆'" placement="left">
                            <div class="QRCode"></div>
                        </el-tooltip>
                    </div>
                    <p style="margin-bottom: 15px">管理员可通过密码登陆</p>
                    <el-form ref="form" status-icon :rules="rules" :model="form">
                        <el-form-item prop="username" auto-complete="off">
                            <el-input v-model="form.username" placeholder="邮箱/手机号"
                                      @keyup.enter.native="onSubmit('form')">
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="password" auto-complete="off">
                            <el-input type="password" v-model="form.password" placeholder="用户密码"
                                      @keyup.enter.native="onSubmit('form')">
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button style="width: 100%;background-color: #00C1De" type="primary" @click="onSubmit('form')" :disabled = "loginButtonDisabled">立即登陆</el-button>
                        </el-form-item>
                    </el-form>
                    <div>
                        <a class="downForgetPw">忘记密码</a>
                    </div>
                    <div class="otherMethodLogin">
                        <span style="font-size: 14px">其他方式登陆:</span>
                        <a href="###"></a>
                        <a href="###"></a>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "login",
        data(){
            return{
                pwOrQRCode:'PW',
                loginButtonDisabled:false,
                form:{
                    username:"",
                    password:""
                },
                rules: {
                    username: [
                        { required: true, message: '请输入登录名', trigger: 'blur' },
                        { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入登录密码', trigger: 'blur' },
                        { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
                    ]
                }
            }
        },
        methods:{
            onSubmit(formName){
                this.$refs[formName].validate((valid) => {
                    if(valid){
                        this.loginButtonDisabled = true;
                        this.$http.post("/user/login", this.form, this.ORIGIN).then((res)=>{
                            this.loginButtonDisabled = false;
                            if(res.data.code===200){
                                this.$router.push("/home");
                                sessionStorage.setItem('token', res.data.data.token);
                                sessionStorage.setItem('user_id', res.data.data.user_id);
                                sessionStorage.setItem('username',res.data.data.username);
                                this.$store.dispatch("setCookie",{username: res.data.data.username});
                                sessionStorage.setItem('mobile',res.data.data.mobile);
                                this.$message.success(res.data.message);
                            }else{
                                this.$message.error(res.data.message);
                            }
                        }).catch((err)=>{
                            this.loginButtonDisabled = false;
                            console.log(err);
                        })
                    }
                });
            }
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    #login {
        height:100vh;
        display: flex;
        justify-content: center;
        flex-direction: column;
        background: url("/../../static/images/e48e1d0cbffed09322e60ec6a930eaf3.jpg") fixed left top no-repeat;
        background-size: cover;
        .describeText {
            color: white;
            animation:opacityChange 2s;
            position: relative;
            .rotateIn {
                width: 350px;
                position: absolute;
                animation:rotateTransition 4s  infinite linear;
            }
            .rotateOut {
                width: 350px;
                position: absolute;
                animation:rotateTransition 5s  infinite linear;
            }
            .sharpOut{
                width: 218px;
                height: 218px;
                position: absolute;
                left:66px;
                top:66px;
                animation:sizeChange 0.6s  0.4s;
            }
            .p1_kuang2{
                width: 201px;
                height: 203px;
                position: absolute;
                left:74px;
                top:74px;
                animation:sizeChange2 0.4s  0.4s;
            }
            .p1_jqr{
                width: 40%;
                left:-40%;
                top:-80px;
                position: absolute;
            }
        }
        .elColWidth {
            width: 400px;
            .loginFrame {
                padding: 20px;
                background-color: white;
                .loginFrameHead{
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 20px;
                    span{
                        font-size: 18px;
                        color: black;
                        line-height: 40px;
                    }
                    .QRCode{
                        width: 40px;
                        height: 40px;
                        background: url("/../../static/images/QRcodeImg.png");
                        cursor: pointer;
                    }
                }
                .downForgetPw{
                    float: right;
                    cursor: pointer;
                    margin-top: -15px;
                    font-size: 12px;
                    &:hover{
                        color: #2a88bd;
                    }
                }
                .otherMethodLogin{
                    display: flex;
                    justify-content: start;
                    padding: 15px 0 0 0;
                    span {
                        line-height: 25px;
                    }
                    a{
                        width: 25px;
                        height:25px;
                        margin-left: 15px;
                        &:nth-child(2) {
                            background: url("/../../static/images/wx.png") no-repeat center;
                            background-size: 25px 25px;
                        }
                        &:nth-child(3) {
                            background: url("/../../static/images/qq.png") no-repeat center;
                            background-size: 25px 25px;
                        }
                    }
                }
            }
        }
    }
    @media screen and (max-width: 400px){
        #login {
            .elColWidth {
                width: 90%;
                min-width: 300px;
            }
        }
    }
    @keyframes rotateTransition
    {
        from {transform:rotate(0deg);}
        to {transform:rotate(360deg);}
    }

    @keyframes sizeChange
    {
        from {
            width:100%;
            left: 0;
            top:0;
            opacity: 0.5;
            transform:rotate(270deg);
        }
        to {
            width:218px;
            left: 66px;
            top: 66px;
            opacity: 1;
            transform:rotate(360deg);
        }
    }
    @keyframes sizeChange2
    {
        from {
            width:100%;
            height:100%;
            left: 0;
            top:0;
            opacity: 0.5;
        }
        to {
            width: 201px;
            height: 203px;
            left:74px;
            top:74px;
            opacity: 1;
        }
    }
</style>