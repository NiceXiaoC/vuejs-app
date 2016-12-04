var path = require('path')
var express = require('express')
var webpack = require('webpack')
var config = require('../config')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)

//获取模拟的data.json数据
var appData = require('../data.json');
var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;

/*设置路由*/
var apiRoutes = express.Router();
// 设置seller路由
apiRoutes.get('/seller',function(req,res){
	res.json({  // 浏览器响应后传给用户一个对象
		errno:0,  // 代表正常访问，
		data:seller  // 返回访问的数据
	})
});
// 设置goods路由
apiRoutes.get('/goods',function(req,res){
	res.json({
		errno:0,
		data:goods
	})
});
// 设置tatings路由
apiRoutes.get('/ratings',function(req,res){
	res.json({
		errno:0,
		data:ratings
	})
});

// 通过app.use来来启动路由【当浏览器中访问：XXXX/api/[seller|goods|ratings]时，返回用户需要的数据】
app.use('/api',apiRoutes);

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
})

var hotMiddleware = require('webpack-hot-middleware')(compiler)
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
