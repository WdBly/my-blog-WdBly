::: hljs-center

# vue 博客优化，服务端渲染(SSR)指南 #
## 对已有的单页应用进行改造，优化，使之成为一个具有良好seo的应用 ##

![image.png](http://cdn.wddsss.com/image/article/da867d289a32c86fe9b4cb44f2699150.png)
:::


### Vue 项目改造 - 服务端渲染

几个问题：使用服务端渲染解决了什么问题？，技术上如何实现？ 经过服务端渲染改造的项目和改造前的单页的区别？

场景：已有基于vue-cli的单页博客项目，前端使用 vue+vue-router+vuex+axios+elementui+webpack,后台使用laravel + mysql
，服务器阿里云 Ubuntu 16.04，web服务器nginx。

面临的问题。1：单页应用首屏加载过慢；2：无法被搜索引擎抓取；3：图片加载过慢；

解决一：首屏加载过慢。
经过分析，页面首屏慢主要是首次需要加载的js问价过大。

1：对webpack打包过程进行优化，采用多入口将项目的vender依赖分割，对不需要变动的文件做缓存，同时对路由做异步加载。
```javascript
    //多个入口
    entry: {
        "app": path.join(projectRoot, 'entry-client.js'),
        "vendor": ['vue', 'vue-router', 'vuex', 'element-ui']
    }

    //对多入口的文件 单独打包 并且不开启hash保证缓存
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'client/[name].bundle.js',
    })

    //js压缩 缩减文件大小
    new UglifyJsPlugin({
        uglifyOptions: {
            compress: {
                warnings: false
            }
        },
        sourceMap: true,
        parallel: true
    })

    //异步的路由 使得首屏加载的代码尽量小
    const Home = ()=> import('@/components/Home.vue');

```
2：服务端nginx开启gzip压缩

     gzip on;
     gzip_disable "msie6";
     gzip_vary on;
     gzip_proxied any;
     gzip_comp_level 6;
     gzip_buffers 16 8k;
     gzip_http_version 1.1;
     gzip_types text/plain text/css application/json application/javascript 
     text/xml application/xml application/xml+rss text/javascript;

>进过验证 开启gzip压缩的js文件大小大概能缩减为源文件的1/5

通过前面两部的优化，首屏加载快了不少，但还是有点慢。

解决二：SEO
#### 开启服务端的渲染

首先我们来捋一捋实现流程，传统的单页应用的流程为前端将文件打包后生成了index.html文件和其他依赖文件，index.html文件中引入了一些js文件和css文件。如下：

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset=utf-8>
        <meta http-equiv=X-UA-Compatible content="IE=edge">
        <link rel="shortcut icon" type=image/x-icon href=/static/images/log.png>
        <meta name=viewport content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
        <link href=/static/css/app.d7870aa3331359b670dcc68b12acbf1c.css rel=stylesheet>
    </head>
    <body>
        <div id=app></div>
        <script type=text/javascript src=/static/js/manifest.58325323c3b8fe4ed982.js></script>
        <script type=text/javascript src=/static/js/vendor.8a01502e87cfadd8f748.js></script>
        <script type=text/javascript src=/static/js/app.df3c871f3751a0c9b0e9.js></script>
    </body>
</html>
```

nginx中配置相应的server_name和root字段,两个路由分别代表前端页面和后台接口。

```javascript
//前端页面的路由
server {
    root /www/wwwroot/myblog-WdBly/web/dist
    server_name www.wddsss.com
    ...
}
//后台接口路由
server {
    root /www/wwwroot/myblog-WdBly/server/public
    server_name 112.74.34.177
    ...
}
```

用户访问前端路由www.wddsss.com时 会返回dist目录下的index.html文件给浏览器。剩下的所有工作都由浏览器完成。

现在我们需要在nginx服务端和浏览器之间开启一个node中间层用于服务端渲染。

理想状态是 当用户访问 www.wddsss.com时，nginx通过proxy_pass将访问流量代理到node中间层监听的端口，而不是直接返回一个index.html文件，nginx将后面的返回页面的工作交给了node。nginx代理配置：

```javascript

//node监听了 5006端口，注意我们并不对外暴露5006端口，也就是说同过
//www.wddsss.com：5006的访问是会失败的。

upstream z.com {
   server 127.0.0.1:5006;
}

//proxy_pass 将访问转移到 127.0.0.1:5006
server {
    server_name www.wddsss.com;
    access_log  /var/log/nginx/blog.api.access.log;
    error_log  /var/log/nginx/blog.api.error.log;
    location / {
        proxy_pass http://l.com;
    }
}

```

现在的任务清晰了不少，我们需要开启一个node服务，监听一个端口，当有用户访问的时候完成一大波事情，最后需要返回一个充满数据的html文件。

那么我们开始实现这个任务吧！，首先分析，用户访问www.wddsss.com/app/home这个路由时，我们在node中监听到访问，必然需要将此路由对应的组件，以及组件中需要的数据获取并整合形成html文件。

vue-server-renderer 提供了一个renderToString方法，此方法接受一个Vue组件，返回一段对应的html代码。这不就解决了我们的问题嘛。

重新整理思路，node在监听到某个路由被访问时，会去查找前端路由表，并找到对应的组件。对于某些需要ssr的组件，我们手动为其添加了一个asyncData()方法，在node加载这些组件同时回去执行asyncData()方法，拿到组件内的数据渲染到组件中。最后将这个组件传入renderToString方法。这样一个简陋无比的ssr就做好了！部分代码如下(删减版，完整的请前往github查看)

```javascript
const { createRenderer } = require('vue-server-renderer')
const createApp = require('./dist/bundle.server.js')['default']
const renderer = createRenderer({
    template: require('fs').readFileSync('ssr/view/index.template.html', 'utf-8')
})
const data = {
  script: `
    <script src="/client/vendor.bundle.js"></script>
    <script src="/client/app.client.js"></script>
  `,
  state: ``
}

express.get('*', (req, res) => {

    const context = {url: req.url};
    
    createApp(context).then(app => {
        var state = JSON.stringify(context.state);

        data.state =  `<script>window.__INITIAL_STATE__ = ${state}</script>`
    
        renderer.renderToString(app, data, (err, html) => {
	    res.end(html)
        })
    })
})

```
1：我们可以看到createRenderer方法可以接受一个html模板文件，因为renderToString方法最终生成的html片段时不带head头等内容的，需要我们自定义一个模板，将renderToString方法生成的html插入到次模板html文件即可。
2：createApp变量来自一个bundle.server.js，这个js文件是通过特定的配置对项目打包后生成的入口文件,它接受一个context用于根据路由寻找对应组件并将最终的state添加至context，后面会说到。
3：createApp本身是一个异步过程，因为在这个函数中可能会存在数据的获取，当数据获取且组件加载完毕后，执行then中的renderToString，renderToString的第二个data参数即是传入模板html文件的参数。

webpack.server.js部分配置

```javascript

    target: 'node',
    entry: [path.join(projectRoot, 'entry-server.js')],
    output: {
        libraryTarget: 'commonjs2',
        path: path.join(projectRoot, 'dist'),
        filename: 'bundle.server.js',
        chunkFilename: '[name].bundle.js',
        publicPath: "/"
    }

```

这个比较简陋的ssr存在很多问题，主要是客户端拿到的只是一个单独的html页面其中，我们绑定的事件，统统是不生效的。

正确的流程是当客户端拿到首屏渲染好的页面时，会在浏览器后台执行一次重绘，生成一系列的虚拟Node,并且和从服务端获取的真实dom节点进行比对，若是不匹配，会执行重绘(使用浏览器端生成的页面)，而浏览器在后台生成虚拟Node依赖于页面中的数据，而我们又不可能在浏览器再次发送ajax请求来获取页面数据(浪费),所有在上方代码中我们可以看到window.__INITIAL_STATE__这一句，当服务端获取到组件的数据时，会将state放在script标签的一个变量中，在客户端执行重绘时采用的即是这里的数据。

具体过程参考下图：

![image.png](http://cdn.wddsss.com/image/article/66a15eed618e2ea57029124effb6ca10.png)

![image.png](http://cdn.wddsss.com/image/article/67a82330ea0758a5029e1d9a6bc96d5f.png)



在整个过程中产生的一些问题总结

#### element-ui样式丢失问题。
在 app.js 中我们引入了 'element-ui/lib/theme-chalk/index.css'的css文件，我们必须要清楚 app.js本身会在服务端执行，所以我们必须在webpack.server.js中配置处理css文件的loader

#### 区分是当前执行环境时node还是浏览器
因为我们的项目是要在服务端执行，同时也会在客户端执行，到时服务端不支持某些客户端对象 如window对象，所以在我们的代码中如果有使用到window，document等浏览器API的地方需要对当前的执行环境进行判断
我们使用的方式是webpack的插件
```javascript
       new webpack.DefinePlugin({
            'process.env.VUE_ENV': '"client"',
            'process.env.NODE_ENV': '"production"',
       }),
       new webpack.DefinePlugin({
            'process.env.VUE_ENV': '"server"',
            'process.env.NODE_ENV': '"production"',
       }),
```

#### 某些页面与用户是否登陆相关

对于某些页面，我们可能会在页面中显示当前登陆用户的信息，并将这个信息存入了localStorage中，但结合上个问题我们可以看出来，在服务端渲染中我们并不能获取到这个localStorage这个对象。那么最终渲染出的页面在和浏览器重绘的页面进行对比时必然会出现不匹配的错误。
处理方法，在node层为登陆用户设置cookie，当用户请求时，若是判断出当前的执行环境为node，则从cookie中读取信息载入页面，否则从localStorage读取数据。

#### 两次渲染不匹配问题

除了上述情况可能导致两个渲染不匹配，还有从服务端返给客户端的__INITIAL_STATE__不存在或者__INITIAL_STATE__的内容有误时，都会导致客户端获取不到初始__INITIAL_STATE__而发生不匹配的错误(这里__INITIAL_STATE__不存在的情况有很多种)，
1：若是直接将 <script>window.__INITIAL_STATE__ = ${state}</script>做为参数传入index.template.html,那么需要使用{{{ }}}的语法解析。
2：在index.template.html 引入state的标签需要在引入build.client.js的标签之前引入，因为build.client.js需要依赖初始state。
3：若是state中存在标签(比如mackdown语法生成的dom结构)需要使用不转义插值{{{}}}。
4: 若是state中有某些特殊字符 :: 回车等特殊字符，需要使用{{}}进行转移，否则在渲染页面时这部分state会直接跑到页面上去。

#### cookie问题
laravel设置的cookie配置 .env 文件 SESSION_DOMAIN=.wddsss.com
这样我们的node层(www.wddsss.com)才能获取到laravel的cookie，并在客户端将登陆时将cookie保存下来，同时返回给客户端。这样用户在刷新页面时，node会通过axios并带上cookie请求nginx服务器获取数据。

#### 图片走七牛cdn
我们的首页图片加载可以明细看到很慢（毕竟1M的小服务器），开启七牛cdn，具体流程就不说了，使用的是laravel itbdw/laravel-storage-qiniu包。

#### 开启https
到这个时候我们发现网站被标记为不安全了，https走一波，推荐一个免费证书申请机构。

[certbot证书申请](https://certbot.eff.org/)






