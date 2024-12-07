const Interface = require('@utils/Interface');
const UserService = require('@services/User.Service');

class UserController {
  static async login(ctx, next) {
    const {
      email,
      password,
      captcha
    } = ctx.request.body;
    const ip = Interface.ip(ctx);
    const loginInfo = await UserService.login(ctx, {
      email,
      password,
      captcha,
      ip
    });

    ctx.body = loginInfo;
  }

  static async register(ctx, next) {
    const {
      email,
      username,
      password,
      enterPassword,
      captcha,
      code
    } = ctx.request.body;

    const ip = Interface.ip(ctx);
    const registerInfo = await UserService.register(ctx, {
      email,
      username,
      password,
      enterPassword,
      captcha,
      code,
      ip
    });

    ctx.body = registerInfo;
  }

  static async forget(ctx, next) {
    const {
      email,
      password,
      enterPassword,
      captcha,
      code
    } = ctx.request.body;

    const ip = Interface.ip(ctx);
    const forgetInfo = await UserService.forget(ctx, {
      email,
      password,
      enterPassword,
      captcha,
      code,
      ip
    });

    ctx.body = forgetInfo;
  }

  static async captcha(ctx, next) {
    const ip = Interface.ip(ctx);
    const captcha = await UserService.captcha({ ip });

    ctx.type = 'image/svg+xml';
    ctx.body = captcha;
  }

  static async sendCode(ctx, next) {
    const {
      email,
      type
    } = ctx.request.body;

    const sendCode = await UserService.sendCode(ctx, { email, type });

    ctx.body = sendCode;
  }

  static async userProfile(ctx, next) {
    const user = await UserService.userProfile(ctx);

    ctx.body = user;
  }

  static async userModifierProfile(ctx, next) {
    const {
      fullName,
      bio,
      avatar,
      website
    } = ctx.request.body;

    const newUser = await UserService.userModifierProfile(ctx, { fullName, bio, avatar, website });

    ctx.body = newUser;
  }
}

module.exports = UserController;