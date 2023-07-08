
const exp = require('express')
const express = exp()
const { createRenderer } = require('vue-server-renderer')
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
import {translation} from './language-translation.js';

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
    <link rel="stylesheet" href="/github-markdown.min.css">
    <link rel="stylesheet" href="/katex.min.css">
    <link rel="stylesheet" href="/github.min.css">
    <script src="/highlight.min.js"></script>
  `,
  state: ``
}

let useData = {};
let typeList = ["s2t", "t2s", "s2tw", "tw2s", "s2hk", "hk2s", "s2twp", "tw2sp", "t2tw", "t2hk"];

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

// 简繁转换
express.get('/getTranslateKey', (req, res) => {
    api.default.getTranslateKey().then(rs => {
        res.writeHead(200, { "Content-Type": "application/json;charset=utf-8" });
        res.end(JSON.stringify(rs.data));
    })
})
express.post('/translation', (req, res) => {
    api.default.translation(req.body.key).then(async rs => {
        // key 校验成功
        if(rs.data.code === 200){
            if(req.body.content && typeList.find(value => value === req.body.type)){
                rs.data.message = "success";
                rs.data.data = await translation(req.body.content, req.body.type);
            }else {
                rs.data.message = "error";
                rs.data.data = "参数错误， 请检查参数";
            }
        }else {
            rs.data.message = "error";
            // key校验失败
            rs.data.data = "key校验失败， 请确认key是否正确或重新生成key";
        }
        res.writeHead(200, { "Content-Type": "application/json;charset=utf-8" });
        res.end(JSON.stringify(rs.data));
    })
})


express.get('/*', (req, res) => {
    const info = req.params["0"].split('_')
    const [title, keyword, index_] = info
    const index = Number(index_)

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`<!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <!-- 百度广告 -->
            <link rel="shortcut icon" type="image/x-icon" href="/static/images/log.png">
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
            <meta name="applicable-device" content="pc,mobile">
            <meta property="og:type" content="website">
            <meta property=”og:title” content="周维的前端开发博客"/>
            <meta property=”og:image” content="https://www.wddsss.com/static/images/log.png"/>
            <meta property=”og:url” content="https://www.wddsss.com"/>
            <meta property=”og:width” content="500"/>
            <meta property=”og:height” content="416"/>
            <meta name="keywords" content="wdbly"/>
            <meta name="keywords" content="前端技术分享"/>
            <meta name="keywords" content="前端资源"/>
            <title>前端技术分享 - ${title}</title>
            <link rel="stylesheet" href="/github-markdown.min.css">
            <link rel="stylesheet" href="/katex.min.css">
            <link rel="stylesheet" href="/github.min.css">
            <script data-ad-client="ca-pub-6933753629630360" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
            <!-- baidu 统计-->
            <script>
                var _hmt = _hmt || [];
                (function() {
                    var hm = document.createElement("script");
                    hm.src = "https://hm.baidu.com/hm.js?2e1d0c7d633a629432ca4e2bab6c51c8";
                    var s = document.getElementsByTagName("script")[0];
                    s.parentNode.insertBefore(hm, s);
                }
                )();
            </script>
        </head>
        <body>  
            <h1>前端资源 - ${title}</h1>
            <h2>资源关键 - ${keyword}</h1>
            <div id="app" data-server-rendered="true">
                <a href="/${title}${index + 1}_${keyword + index}_${index + 1}">${title}-${keyword}-${index + 1} - 文章地址</a>
                <a href="/${title}${index + 2}_${keyword + index}_${index + 2}">${title}-${keyword}-${index + 2} - 文章地址</a>
                <a href="/${title}${index + 3}_${keyword + index}_${index + 3}">${title}-${keyword}-${index + 3} - 文章地址</a>
                <a href="/${title}${index + 4}_${keyword + index}_${index + 4}">${title}-${keyword}-${index + 4} - 文章地址</a>
                <a href="/${title}${index + 5}_${keyword + index}_${index + 5}">${title}-${keyword}-${index + 5} - 文章地址</a>
                <a href="/${title}${index + 6}_${keyword + index}_${index + 6}">${title}-${keyword}-${index + 6} - 文章地址</a>
                <a href="/${title}${index + 7}_${keyword + index}_${index + 7}">${title}-${keyword}-${index + 7} - 文章地址</a>
                <a href="/${title}${index + 8}_${keyword + index}_${index + 8}">${title}-${keyword}-${index + 8} - 文章地址</a>
                <a href="/${title}${index + 9}_${keyword + index}_${index + 9}">${title}-${keyword}-${index + 9} - 文章地址</a>
                <a href="/${title}${index + 10}_${keyword + index}_${index + 10}">${title}-${keyword}-${index + 10} - 文章地址</a>
                <a href="/${title}${index + 11}_${keyword + index}_${index + 11}">${title}-${keyword}-${index + 11} - 文章地址</a>
                <a href="/${title}${index + 12}_${keyword + index}_${index + 12}">${title}-${keyword}-${index + 12} - 文章地址</a>
                <a href="/${title}${index + 13}_${keyword + index}_${index + 13}">${title}-${keyword}-${index + 13} - 文章地址</a>
                <a href="/${title}${index + 14}_${keyword + index}_${index + 14}">${title}-${keyword}-${index + 14} - 文章地址</a>
        
                <div id="main" data-v-184ef416>
                    <header class="header" data-v-184ef416>
                        <div class="blog-log" data-v-184ef416>
                            <h3 style="line-height: 40px" data-v-184ef416>WdBly Blog</h3>
                            <p data-v-184ef416>懂事、有趣、保持理智</p>
                        </div>
                        <div class="show-nav" data-v-184ef416>
                            <div class="line" data-v-184ef416></div>
                            <div class="line" data-v-184ef416></div>
                            <div class="line" data-v-184ef416></div>
                        </div>
                        <nav class="nav" style="display:none;" data-v-184ef416>
                            <a href="/main/home" title="首页" class="item router-link-active" data-v-184ef416>首页</a>
                            <a href="/main/categories" title="分类" class="item" data-v-184ef416>分类</a>
                            <a href="/main/archive/all/all" title="归档" class="item" data-v-184ef416>归档</a>
                            <a href="/main/tags" title="标签" class="item" data-v-184ef416>标签</a>
                            <a href="/main/sourceList" title="资源" class="item" data-v-184ef416>资源</a>
                        </nav>
                    </header>
                    <div class="content" data-v-184ef416>
                        <div class="left-box" data-v-184ef416>
                            <div class="blog-log" data-v-184ef416>
                                <h3 style="line-height: 40px" data-v-184ef416>周维的个人Blog</h3>
                                <span data-v-184ef416>懂事、有趣、保持理智</span>
                            </div>
                            <nav class="nav" data-v-184ef416>
                                <a href="/main/home" title="首页" class="item router-link-active" data-v-184ef416>首页</a>
                                <a href="/main/categories" title="分类" class="item" data-v-184ef416>分类</a>
                                <a href="/main/archive/all/all" title="归档" class="item" data-v-184ef416>归档</a>
                                <a href="/main/tags" title="标签" class="item" data-v-184ef416>标签</a>
                                <a href="/main/sourceList" title="资源" class="item" data-v-184ef416>资源</a>
                            </nav>
                            <div class="overview" data-v-184ef416>
                                <h2 data-v-184ef416>站点概览</h2>
                                <p class="name" data-v-184ef416>周维 | Jim</p>
                                <p class="signature" style="color: #363636" data-v-184ef416>603927378@qq.com</p>
                                <div class="resouce" data-v-184ef416>
                                    <a title="github" href="https://github.com/WdBly" target="_blank" data-v-184ef416>
                                        <img src="http://cdn.wddsss.com/image/article/99a1c354794555c5c6aebec8cb8728dd.png?imageView2/1/w/200/h/200/q/100/webp" data-v-184ef416>
                                        <span style="margin-left: 4px;" data-v-184ef416>GitHub</span>
                                    </a>
                                </div>
                                <div class="links" data-v-184ef416>
                                    <p style="color: #363636; font-size: 18px" data-v-184ef416>友情链接</p>
                                    <a href="https://mo.fish" target="_blank" data-v-184ef416>鱼塘热榜
                        </a>
                                    <a href="https://www.penlsun.cn" target="_blank" data-v-184ef416>西桥听雨
                        </a>
                                    <a href="https://www.printf520.com" target="_blank" data-v-184ef416>清风笛竹
                        </a>
                                    <a href="https://www.ohdata.top" target="_blank" data-v-184ef416>胡大大的个人博客
                        </a>
                                </div>
                            </div>
                            <div class="right-box feedback" data-v-5dce3118 data-v-184ef416>
                                <div class="header-oper" data-v-5dce3118>
                                    <p data-v-5dce3118>给我留言</p>
                                    <span data-v-5dce3118>微信</span>
                                </div>
                                <input placeholder="你的名字/邮箱" value="" data-v-5dce3118>
                                <textarea maxlength="1200" placeholder="对网站有建议，或者是对文章细节上有疑惑都可以给作者留言哦。" data-v-5dce3118></textarea>
                                <div class="feedback-btn" data-v-5dce3118>提交</div>
                                <div class="qrcode" style="opacity:0;top:300px;" data-v-5dce3118>
                                    <img src="http://cdn.wddsss.com/image/article/5cbf514c3dc1bf12b864789f01bcd271.png?imageView2/1/w/0/h/0/q/50/webp" style="width: 100%" data-v-5dce3118>
                                </div>
                            </div>
                            <div class="top-list" data-v-ddd1b708 data-v-184ef416>
                                <h2 data-v-ddd1b708>推荐阅读</h2>
                            </div>
                        </div>
                    </div>
                    <footer class="footer" data-v-184ef416>WdBly|周维 blog copyright-蜀ICP备18002409号-1
        </footer>
                </div>
            </div>
        </body>
    </html>
    `)
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
        useData.script = data.script;
        // 如果是文章详情页面
        if(context.url.search(/\/main\/displayArticle/) !== -1) {
            // 加载编辑器的样式 和修改title 和meta等头信息。
            var article_title = context.state.mutations.articleContent.title;
            var article_description = context.state.mutations.articleContent.description;
            var article_tags = context.state.mutations.tags;
            useData.title = article_title;
            // meta
            useData.meta = article_tags.reduce((prev, next) => prev + `<meta name="keywords" content="${next.label}" />`, `<meta name="description" content="${article_description}" />`);
        }else {
            useData.title = data.title;
            useData.meta = data.meta;

            if(context.url.search(/\/main\/home/) !== -1) {
                useData.title = "首页-周维的个人博客";
            }else if(context.url.search(/\/main\/archive/) !== -1) {
                useData.title = "归档-前端开发文章";
            }else if(context.url.search(/\/main\/tags/) !== -1) {
                useData.title = "标签-文章技能标签";
            }else if(context.url.search(/\/main\/categories/) !== -1) {
                useData.title = "分类-前端技能分类";
            }else if(context.url.search(/\/main\/sourceList/) !== -1) {
                useData.title = "前端资源整合-合集";
                useData.meta = `
                    <meta name="keywords" content="免费简繁转换API接口" >
                    <meta name="description" content="免费简繁转换API接口使用" >
                `;
            }
        }
        
        var state = JSON.stringify(context.state);

        useData.state =  `<script>window.__INITIAL_STATE__ = ${state}</script>`
    
        renderer.renderToString(app, useData, (err, html) => {
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
