<template>
    <div id="editor">
        <div style="padding: 10px 0 15px 0;display: flex;background-color: white;margin-top: 10px">
            <div style="margin-left: 20px;display: flex;flex-wrap: nowrap;align-items: center;">
                <span style="white-space:nowrap">文章分类:</span>
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
                <el-input v-model="addClass" size="mini" placeholder="请输入新增或删除的分类名"></el-input>
                <el-button @click="addArticleClass" size="mini" type="primary" style="margin-left: 20px">添加分类</el-button>
                <el-button @click="delArticleClass" size="mini" type="primary" style="margin-left: 20px">删除分类</el-button>
            </div>
        </div>
        <div style="padding: 10px 0 15px 0;display: flex;align-items:center;background-color: white">
            <div style="margin: 3px 0 0 20px;">
                <el-radio v-model="original" label="0">原创</el-radio>
                <el-radio v-model="original" label="1">转载</el-radio>
            </div>
            <div style="margin-left: 20px;display: flex;flex-wrap: nowrap;align-items: center;">
                <span style="white-space:nowrap">标签:</span>
                <el-select
                        v-model="tags"
                        size="mini"
                        multiple
                        collapse-tags
                        style="margin-left: 20px;"
                        placeholder="请选择">
                    <el-option
                            v-for="item in optionTags"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div style="display: flex;margin-left: 15px">
                <el-input v-model="addTags" size="mini" placeholder="请输入新增或删除的标签名"></el-input>
                <el-button @click="addArticleTags" size="mini" type="primary" style="margin-left: 20px">添加标签</el-button>
                <el-button @click="delArticleTags" size="mini" type="primary" style="margin-left: 20px">删除标签</el-button>
            </div>
        </div>
        <mavon-editor @save="savePosts"
                      ref=md
                      :value="mavonValue"
                      style="min-height: 460px"
                      @imgAdd="$imgAdd" >
        </mavon-editor>
    </div>
</template>

<script type="text/ecmascript-6">
    var mavonEditor
    if(process.env.VUE_ENV !== "server"){
        mavonEditor = require('mavon-editor');
    } else {
        mavonEditor = {
            template: '<div></div>'
        };
    }
    import 'mavon-editor/dist/css/index.css'
    export default {
        props:["id"],
        data(){
            return{
                article:null,
                tags:[],
                tagsTemp:[],
                optionTags:[],
                original:"0",
                whetherPublic: true,
                addClass: '',
                addTags: '',
                options: [],
                value: '',
                ca_id: -1,
                tag: false,
                tag2: false,
                mavonValue: ''
            }
        },
        name: "publish-articles",
        components: {
            'mavon-editor': mavonEditor.mavonEditor
        },
        mounted(){
            if(this.id != 0){
                this.getArticleContent();
            }
            this.getArticleClass();
            this.getArticleTags()
        },
        methods:{
            addArticleClass(){
                this.$http.post("/article/addArticleClass",{
                    name:this.addClass
                }).then((res)=>{
                    if(res.data.code === 200){
                        this.$message.success(res.data.message);
                        this.getArticleClass();
                    }else{
                        this.$message.error(res.error)
                    }
                }).catch((err)=>{
                    console.log(err);
                })
            },
            delArticleClass(){
                this.$http.post("/article/delArticleClass",{
                    name:this.addClass
                }).then((res)=>{
                    if(res.data.code === 200){
                        this.$message.success(res.data.message);
                        this.getArticleClass();
                    }else{
                        this.$message.error(res.error)
                    }
                }).catch((err)=>{
                    console.log(err);
                })
            },
            addArticleTags(){
                this.$http.post("/article/addArticleTags",{
                    name:this.addTags
                }).then((res)=>{
                    if(res.data.code === 200){
                        this.$message.success(res.data.message);
                        this.getArticleTags();
                    }else{
                        this.$message.error(res.error)
                    }
                }).catch((err)=>{
                    console.log(err);
                })
            },
            delArticleTags(){
                this.$http.post("/article/delArticleTags",{
                    name:this.addTags
                }).then((res)=>{
                    if(res.data.code === 200){
                        this.$message.success(res.data.message);
                        this.getArticleClass();
                    }else{
                        this.$message.error(res.error)
                    }
                }).catch((err)=>{
                    console.log(err);
                })
            },
            getArticleTags(){
                this.$http.get("/article/getArticleTags").then((res)=>{
                    if(res.data.code === 200){
                        this.tags = [];
                        if(this.id!==0){
                            this.tag2 = true;
                            this.publicFn();
                            this.publicFn2();
                        }
                        this.optionTags = res.data.data;
                    }else{
                        this.$message.error(res.data.message)
                    }
                }).catch((err)=>{
                    console.log(err);
                })
            },
            getArticleClass(){
                this.$http.post("/article/getArticleClass", {
                    get_all: 1
                }).then(res => {
                    if(res.data.code === 200){
                        this.value = '';
                        if(this.id!==0){
                            this.tag = true;
                            this.publicFn();
                        }
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
                this.$http.axios({
                    url: '/article/imgUpload',
                    method: 'post',
                    data: formdata,
                    headers: {'Content-Type':'multipart/form-data'},
                }).then((res) => {
                    let url = res.data.data + "?imageView2/1/w/0/h/0/q/50/webp";
                    this.$refs.md.$img2Url(pos, url);
                })
            },
            savePosts(value,render){
                this.$confirm('是否确定上传博客?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let frag = document.createElement('div');
                    frag.innerHTML = render;
                    let img = [].map.call(frag.querySelectorAll('img'), function(img){ return img.src })[0];
                    let title = render.match(/<h1>(.+)<\/h1>/);
                    let description = render.match(/<h2>(.+)<\/h2>/);
                    let url = '/article/addArticle';
                    if(!title ||!description ||!this.value){
                        this.$message.warning("必须要有文章标题,描述,分类");
                        return
                    }
                    this.article = {
                        content:render,
                        title:title[1],
                        description:description[1],
                        value:value,
                        img:img || "",
                        ca_id:this.value,
                        original:this.original-0,
                        tags:JSON.stringify(this.tags),
                        whetherPublic:this.whetherPublic?1:0,
                    };
                    if(this.id!=0){
                        url = '/article/editArticle';
                        this.article.id = this.id;
                    }
                    this.$http.post(url,this.article).then((res)=>{
                        if (res.data.code === 200) {
                            this.$message.success(res.data.message)
                        }else{
                            this.$message.error(res.data.message)
                        }
                    }).catch((err)=>{
                        console.log(err);
                    })
                }).catch(() => {
                    return;
                });
            },
            getArticleContent(){
                this.$http.post("/article/getArticleContent",{
                    id:this.id
                }).then((res)=>{
                    if(res.data.code===200){
                        this.mavonValue = res.data.data.value;
                        if(this.id!==0){
                            this.ca_id = res.data.data.ca_id;
                            this.tagsTemp = JSON.parse(res.data.data.tags);
                            this.original = res.data.data.original+"";
                            this.whetherPublic = res.data.data.whetherPublic===1?true:false;
                            this.publicFn();
                            this.publicFn2();
                        }
                    }else{
                        this.$message.error(res.data.message)
                    }
                }).catch((err)=>{
                    console.log(err);
                })
            },
            publicFn(){
                if(this.ca_id!==-1 && this.tag){
                    this.value = this.ca_id;
                }
            },
            publicFn2(){
                if(this.tagsTemp!==-1 && this.tag2){
                    this.tags = this.tagsTemp || [];
                }
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