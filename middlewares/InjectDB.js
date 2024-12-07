module.exports = ({ db, injectName }) => {
  return async (ctx, next) => {
    ctx[injectName] = db;
    await next();
  }
}