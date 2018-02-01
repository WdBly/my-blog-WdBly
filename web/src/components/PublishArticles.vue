<template>
    <div id="editor">
        <div style="padding: 0 0 15px 0;display: flex">
            <div>
                <span>文章分类:</span>
                <el-select v-model="value" size="mini" placeholder="请选择">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="publicYn">
                <el-switch
                        v-model="whetherPublic"
                        active-text="公开"
                        inactive-text="不公开">
                </el-switch>
            </div>
            <div style="display: flex">
                <el-input v-model="addClass" size="mini" placeholder="请输入新增的分类名"></el-input>
                <el-button @click="addArticleClass" size="mini" type="primary" style="margin-left: 20px">添加分类</el-button>
            </div>
        </div>
        <mavon-editor @save="savePosts"
                      ref=md
                      style="min-height: 460px"
                      @imgAdd="$imgAdd" @imgDel="$imgDel">
        </mavon-editor>
        <div style="display: flex;justify-content: flex-end;margin-top: 5px">
            <el-button type="primary">发布<i class="el-icon-upload el-icon--right"></i></el-button>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    var mavonEditor = require('mavon-editor');
    import 'mavon-editor/dist/css/index.css'
    export default {
        data(){
            return{
                article:null,
                whetherPublic: true,
                addClass: '',
                options: [],
                value: ''
            }
        },
        name: "publish-articles",
        components: {
            'mavon-editor': mavonEditor.mavonEditor
        },
        mounted(){
            this.getArticleClass()
        },
        methods:{
            addArticleClass(){
                this.$http.post("/article/addArticleClass",{
                    name:this.addClass
                }).then((res)=>{
                    if(res.data.code === 200){
                        this.$message.success(res.data.message)
                    }else{
                        this.$message.error(res.data.message)
                    }
                }).catch((err)=>{
                    console.log(err);
                })
            },
            getArticleClass(){
                this.$http.post("/article/getArticleClass",{
                    name:this.addClass
                }).then((res)=>{
                    if(res.data.code === 200){
                        this.options = res.data.data;
                    }else{
                        this.$message.error(res.data.message)
                    }
                }).catch((err)=>{
                    console.log(err);
                })
            },
            $imgAdd(pos, $file){
                // 第一步.将图片上传到服务器.
                var formdata = new FormData();
                formdata.append('file', $file);
                formdata.append('bucket', 'article');
                this.$http({
                    url: '/article/imgUpload',
                    method: 'post',
                    data: formdata,
                    headers: {'Content-Type':'multipart/form-data'},
                }).then((res) => {
                    this.$refs.md.$img2Url(pos, this.BASEURL+'/'+res.data.data);
                })
            },
            $imgDel(filename){
                console.log(filename);
            },
            savePosts(value,render){
                let frag = document.createElement('div');
                frag.innerHTML = render;
                let img = [].map.call(frag.querySelectorAll('img'), function(img){ return img.src })[0];
                let title = render.match(/<h1>(.+)<\/h1>/);
                let description = render.match(/<h2>(.+)<\/h2>/);
                if(!title ||!description){
                    this.$message.warning("必须要有文章标题,描述");
                    return
                }
                this.article = {
                    content:render,
                    title:title[1],
                    description:description[1],
                    img:img || "",
                    ca_id:1,
                    whetherPublic:this.whetherPublic?1:0,
                };
                this.$http.post('/article/article',this.article).then((res)=>{
                    if (res.data.code === 200) {
                        this.$message.success(res.data.message)
                    }else{
                        this.$message.error(res.data.message)
                    }
                }).catch((err)=>{
                    console.log(err);
                })
            }
        }
    }
</script>

<style scoped>
    .publicYn{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width:200px;
        margin-left:20px;
    }
</style>