<template>
    <div class="right-box feedback">
        <div class="header-oper">
            <p>给我留言</p>
            <span @click="showQrCode = !showQrCode">微信</span>
        </div>
        <input v-model="email" placeholder="你的名字/邮箱" />
        <textarea v-model="feedback" maxlength="1200" placeholder="对网站有建议，或者是对文章细节上有疑惑都可以给作者留言哦。"></textarea>
        <div class="feedback-btn" @click="submitFeedback()">提交</div>

        <div class="qrcode" :style="{'opacity': showQrCode ? 1 : 0, 'top': showQrCode ? '43px' : '300px'}">
            <img style="width: 100%" src="http://cdn.wddsss.com/image/article/5cbf514c3dc1bf12b864789f01bcd271.png?imageView2/1/w/0/h/0/q/50/webp" />
        </div>
    </div>
</template>

<script>
    import api from "../api";
    export default {
        name: "feedback",
        serverCacheKey: props => {
            return props.currStyle.isBlack ? "black" : "light";
        },
        data() {
            return {
                feedback: "",
                email: "",
                status: false,
                showQrCode: false
            }
        },
        methods: {
            submitFeedback() {
                if(this.status) {
                    return;
                }

                // 校验邮箱
                if(!this.email) {
                    this.$store.dispatch("showMessage", {type: "", value: "请填写你的名字或邮箱"});
                    return;
                }

                if(!this.feedback){
                    this.$store.dispatch("showMessage", {type: "", value: "请填写反馈内容哦"});
                    return;
                }

                this.status = true;
                api.addFeedback({email: this.email, feedback: this.feedback}).then(rs => {
                    rs = rs.data;
                    this.status = true;
                    if(rs.code === 200) {
                        this.email = "";
                        this.feedback = "";
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .right-box {
        width: 240px;
        background: #fff;
        padding: 12px;
        margin: 20px 0;
        box-sizing: border-box;
        position: relative;
    }
    .feedback {
        overflow: hidden;
    }

    .header-oper {
        display: flex;
        justify-content: space-between;
        font-size: 16px;
        font-weight: bold;
        border-left: 4px solid #0090f0;
        padding-left: 8px;
        line-height: 22px;
        height: 20px;
        margin-bottom: 16px;
        color: "#363636";

        span {
            cursor: pointer;
            font-size: 13px;
            color: #0078ff;

            &:hover {
                opacity: .8;
            }
        }
    }
    .feedback textarea {
        width: 100%;
        box-sizing: border-box;
        height: 130px;
        border-radius: 4px;
        border: 1px solid #e9e9e9;
        padding: 10px;
        margin-bottom: 6px;
        outline: none;
        resize: none
    }
    .feedback p {
        font-size: 16px;
        font-weight: bold;
    }
    .feedback input {
        width: 100%;
        box-sizing: border-box;
        padding: 6px 10px;
        border-radius: 4px;
        outline: none;
        border: 1px solid #eee;
        margin-bottom: 10px;

        &:focus {
            border-color: #0078ff;
        }
    }
    .feedback .feedback-btn {
        line-height: 36px;
        background: #0090F0;
        text-align: center;
        color: #fff;
        border-radius: 4px;
        cursor: pointer;

        &:hover {
            opacity: .8;
        }
    }

    textarea:focus {
        border-color: #0078ff;
    }

    .qrcode {
        position: absolute;
        top: 43px;
        left: 1px;
        transition: opacity .5s, top .5s;
    }
    @keyframes message-in {
        0% {right: -100px}
        100% {right: 16px;}
    }
</style>