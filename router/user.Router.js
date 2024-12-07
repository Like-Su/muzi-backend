const Router = require('koa-router');
const router = new Router();
const UserController = require('@/controller/User.Controller');

// 登录
router.post('/login', UserController.login);

// 注册接口
router.post('/register', UserController.register);

// 忘记密码
router.post('/forget', UserController.forget);

// 图片验证码
router.get('/captcha', UserController.captcha);

// 邮箱
router.post('/send_code', UserController.sendCode);

// 用户信息展示
router.post('/user_profile', UserController.userProfile);

// 用户信息修改
router.put('/user_modifier_profile', UserController.userModifierProfile);


module.exports = router;


