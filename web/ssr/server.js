
const exp = require('express')
const express = exp()
const { createRenderer } = require('vue-server-renderer')

const renderer = createRenderer({
    runInNewContext: false, // 推荐
    template: require('fs').readFileSync('ssr/view/index.template.html', 'utf-8')
})
const createApp = require('./dist/bundle.server.js')['default']
const clientBundleFileUrl = '/bundle.client.js'
const data = {
  title: '维大大的个人博客',
  meta: `
    <meta name="keywords" content="wdbly" />
  `,
  script: `
    <script src="${clientBundleFileUrl}"></script>
  `,
  state:``
}



// 设置静态文件目录
express.use('/', exp.static(__dirname + '/dist'))

express.get('*', (req, res) => {
    const context = { url: req.url }

    if(/\.jpg|.png|.ico$/.test(req.url)){
        return;
    }

    createApp(context).then(app => {
        
        let state = JSON.stringify(context.state);
        data.state = `<script>window.__INITIAL_STATE__ = ${state}</script>`;
    
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

express.listen(2500, () => {
    console.log("localhost://2500");
});