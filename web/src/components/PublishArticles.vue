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
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                value: ''
            }
        },
        name: "publish-articles",
        components: {
            'mavon-editor': mavonEditor.mavonEditor
        },
        methods:{
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