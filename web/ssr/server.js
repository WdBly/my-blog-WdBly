
const exp = require('express')
const express = exp()
const { createRenderer } = require('vue-server-renderer')
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');

const renderer = createRenderer({
    template: require('fs').readFileSync('ssr/view/index.template.html', 'utf-8')
})
const createApp = require('./dist/bundle.server.js')['default']
const api = require("./../src/api");

express.use(bodyParser.urlencoded({ extended: false}));
express.use(bodyParser.json())
express.use(cookieParser());
express.use('/', exp.static(__dirname + '/dist'))

const clientBundleFileUrl = '/client/app.client.js'
const data = {
  title: '周维的个人博客',
  meta: `
    <meta name="keywords" content="wdbly" />
    <meta name="keywords" content="前端技术分享" />
    <meta name="keywords" content="前端资源" />
  `,
  script: `
    <script src="/client/vendor.bundle.js"></script>
    <script src="${clientBundleFileUrl}"></script>
  `,
  state: ``
}

const useData = {};

express.post('/user/login', (req, res) => {
    api.default.userLogin(req.body).then(rs => {
        //获取lavavel返回的set-cookie的头信息
        let set_cookies = rs.headers["set-cookie"];
        if(rs.data.code === 200){
            //组装node的cookie
            set_cookies.push(`username=${rs.data.data.username}; path=/`);
        }
        res.writeHead(200, {
            "Content-Type": "application/json;charset=utf-8",
            "Set-Cookie": set_cookies
        });
        res.end(JSON.stringify(rs.data));
    })
})

express.post('/user/logout', (req, res) => {
    api.default.userLogout().then(rs => {
        if(rs.data.code === 200){
            res.clearCookie('username');
            res.clearCookie('laravel_session', {domain:'.wddsss.com'});
            res.clearCookie('XSRF-TOKEN', {domain:'.wddsss.com'});
        }
        res.writeHead(200, { "Content-Type": "application/json;charset=utf-8" });
        res.end(JSON.stringify(rs.data));
    })
})

express.get('*', (req, res) => {
    const context = {
        url: req.url,
        cookies: req.cookies
    };
    // console.log(req.cookies,"req.cookies");

    createApp(context).then(app => {
        // console.log(context, "context");
        useData = {};
        // 如果是文章详情页面
        if(context.url.search(/\/main\/displayArticle/) !== -1) {
            // 加载编辑器的样式 和修改title 和meta等头信息。
            useData.script = `
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.9.0/github-markdown.min.css">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.8.3/katex.min.css">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/github.min.css">
                <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js"></script>
                ${data.script}
            `;

            var article_title = context.state.mutations.articleContent.title;
            var article_description = context.state.mutations.articleContent.description;
            var article_tags = context.state.mutations.tags;
            useData.title = article_title;
            // meta
            useData.meta = article_tags.reduce((prev, next) => prev + `<meta name="keywords" content=${next.label} >`, `<meta name="description" content="${article_description}"`);
        }else {
            useData.title = data.title;
            useData.meta = data.meta;
            useData.script = data.script;

            if(context.url.search(/\/main\/home/) !== -1) {
                useData.title = "首页-周维的个人博客";
            }else if(context.url.search(/\/main\/archive/) !== -1) {
                useData.title = "归档-前端开发文章";
            }else if(context.url.search(/\/main\/tags/) !== -1) {
                useData.title = "标签-文章技能标签";
            }else if(context.url.search(/\/main\/categories/) !== -1) {
                useData.title = "分类-前端技能分类";
            }
        }
        
        var state = JSON.stringify(context.state);

        useData.state =  `<script>window.__INITIAL_STATE__ = ${state}</script>`
    
        renderer.renderToString(app, data, (err, html) => {
            if (err) {
                if (err.code === 404) {
                    res.status(404).end('Page not found')
                } else {
                    res.status(500).end('Internal Server Error')
                }
            } else {
                res.end(html)
            }
        })
    })
})

express.listen(5006, () => {
    console.log("localhost://5006");
});
