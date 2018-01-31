<template>
    <div id="editor">
        <mavon-editor @save="savePosts"
                      ref=md
                      @imgAdd="$imgAdd" @imgDel="$imgDel">
        </mavon-editor>
    </div>
</template>

<script type="text/ecmascript-6">
    var mavonEditor = require('mavon-editor');
    import 'mavon-editor/dist/css/index.css'
    export default {
        data(){
            return{
                article:null,
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
                };
                this.$http.post('/article/article',this.article).then((res)=>{
                    if (res.data.code === 200) {

                    }else{

                    }
                }).catch((err)=>{
                    console.log(err);
                })
            }
        }
    }
</script>

<style scoped>

</style>