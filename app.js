require('module-alias/register'); // 注册

const Koa = require('koa');
const cors = require('@koa/cors');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const compress = require('koa-compress');
const helmet = require('koa-helmet');


const DB = require('./config/sequelize');
const FormatCode = require('./utils/FormatCode');
const CodeEnum = require('./utils/CodeEnum');
const routes = require('./router');
const authorization = require('./middlewares/Authorization');

const app = new Koa({
  env: process.env.NODE_ENV
});

const router = new Router();

// 日志
app.use(logger());
// 跨域请求
app.use(cors());
// 数据解析
app.use(bodyParser());
// 路由
app.use(router.routes());
// 允许所有方法
app.use(router.allowedMethods());
// 压缩
app.use(compress());
// 安全
app.use(helmet());
// 权限控制路径
app.use(authorization({
  // 允许访问列表
  pathsAllow: [
    /^\/user/,
    /^\/article/,
  ]
}));

// 错误处理
app.on('error', (err, ctx) => {
  if(Object.is(err.msg, CodeEnum.UNAUTHORIZED_ACCESS.msg)) {
    ctx.body = FormatCode.error(CodeEnum.UNAUTHORIZED_ACCESS);
    return;
  }
  ctx.body = FormatCode.error(CodeEnum.INVALID_ERROR);
});

(async () => {
  try {
    await DB.sequelize.authenticate();
    
    // 加载路由
    app.use(routes(router));

    // 启动服务
    app.listen(9000);
    console.log('http://localhost:9000');
  } catch (e) {
    throw new Error(e);
  }
})();