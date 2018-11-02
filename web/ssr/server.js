
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

const clientBundleFileUrl = '/bundle.client.js'
const data = {
  title: '维大大的个人博客',
  meta: `
    <meta name="keywords" content="wdbly" />
  `,
  script: `
    <script src="${clientBundleFileUrl}"></script>
  `,
  state: ``
}

express.post('/user/login', (req, res) => {
    api.default.userLogin(req.body).then(rs => {
        console.log(rs);
        
        if(rs.data.code === 200){
            res.cookie('username', rs.data.data.username);
        }
        res.writeHead(200, { "Content-Type": "application/json;charset=utf-8" });
        res.end(JSON.stringify(rs.data));
    })
})
express.post('/user/logout', (req, res) => {
    api.default.userLogout().then(rs => {
        if(rs.data.code === 200){
            res.clearCookie('username');
            res.clearCookie('laravel_session');
            res.clearCookie('XSRF-TOKEN');
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
    console.log(req.cookies,"req.cookies");

    createApp(context).then(app => {
        var state = JSON.stringify(context.state);

        data.state =  `<script>window.__INITIAL_STATE__ = ${state}</script>`
    
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
