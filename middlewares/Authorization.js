const Encryption = require('@/utils/Encryption');
const CodeEnum = require('@/utils/CodeEnum');

/**
 * 阻止访问
 * @param {Object} pathsAllow 允许无需权限访问路径
 * @param {String} authorization 校验名称
 * @returns 
 */
module.exports = ({ pathsAllow, authorization = 'authorization', parseName = 'authorizationParser' }) => {
  return async (ctx, next) => {
    const {
      url
    } = ctx.request;
    
    for (const path of pathsAllow) {
      // 无需权限访问
      if (path.test(url)) {
        return await next();
      }
    }

    try {
      if(ctx.request[authorization]) {
        ctx.request['authorizationParse'] = Encryption.verify(ctx.request[authorization]);
        // 解析 token
        await next();
      }
    } catch (e) {
      ctx.throw(CodeEnum.UnauthorizedAccess);
    } 
  }
}