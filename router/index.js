const DB = require('@/config/sequelize');
const InjectDB = require('@/middlewares/InjectDB');
const CodeEnum = require('@/utils/CodeEnum');

const userRouter = require('./user.Router');
// const articleRouter = require('./article.Router');
// const adminRouter = require('./admin.Router');
const routerMap = require('./routerMap');

module.exports = (router) => {
  return async (ctx, next) => {
    try {
      // 注入 数据库
      router.use(InjectDB({
        db: DB,
        injectName: 'DB'
      }));

      // 用户相关接口
      router.use(routerMap.USER, userRouter.routes());
      // // 文章相关接口
      // router.use(routerMap.ARTICLE, articleRouter.routes());
      // // 后台相关
      // router.use(routerMap.ADMIN, adminRouter.routes());


      await next();
    } catch (e) {
      ctx.throw(CodeEnum.INVALID_ERROR);
    }
  }
}