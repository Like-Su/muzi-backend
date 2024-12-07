const SendCode = require('@utils/SendCode');
const Cache = require('@utils/Cache');
const CacheMap = require('@utils/CacheMap');
const FormatCode = require('@utils/FormatCode');
const CodeEnum = require('@utils/CodeEnum');
const Validates = require('@utils/Validates');
const Encryption = require('@utils/Encryption');
const { USER } = require('@utils/status');

class UserService {
  static async login(ctx, { email, password, captcha, ip }) {
    const {
      User
    } = ctx.DB;
    // 验证
    if (!(email && password && captcha)) return FormatCode.errorEnum(CodeEnum.FORMAT_ERROR);

    if (!Validates.isEmail(email)) return FormatCode.errorEnum(CodeEnum.EMAIL_FORMAT_FAIL);

    const captchaVal = CacheMap.CAPTCHA({ ip });

    if (!(await Cache.exists(captchaVal.key))) return FormatCode.errorEnum(CodeEnum.CODE_NOT_WRITE);

    const captchaCode = await Cache.get(captchaVal.key);

    if (captchaCode !== captcha) return FormatCode.errorEnum(CodeEnum.CODE_FAIL);

    // 查询用户
    const pwd = Encryption.md5(Encryption.decryptString(password));

    const user = await User.findOne({ where: { email, pwd }, attributes: { exclude: ['pwd'] }, raw: true });

    if (!user) return FormatCode.errorEnum(CodeEnum.USER_EMAIL_OR_PASSWORD_ERROR);

    const token = Encryption.sign({ ...user  });

    return FormatCode.success(`Bearer ${token}`);
  }


  static async register(ctx, { email, username, password, enterPassword, captcha, code, ip }) {
    const {
      User
    } = ctx.DB;
    // 验证
    if (!(email && username && password && enterPassword && captcha && code)) return FormatCode.errorEnum(CodeEnum.FORMAT_ERROR);

    if (!Validates.isEmail(email)) return FormatCode.errorEnum(CodeEnum.EMAIL_FORMAT_FAIL);

    if (Encryption.decryptString(password) !== Encryption.decryptString(enterPassword)) return FormatCode.errorEnum(CodeEnum.PASSWORD_NOT_SAME);

    // 图形验证码
    const captchaVal = CacheMap.CAPTCHA({ ip });
    if (!(await Cache.exists(captchaVal.key))) return FormatCode.errorEnum(CodeEnum.CODE_FAIL);

    const captchaCode = await Cache.get(captcha.key);

    if (captchaCode !== captcha) return FormatCode.errorEnum(CodeEnum.CODE_FAIL);

    // 邮箱验证码
    const codeVal = CacheMap.SEND_CODE({ email, type: USER.REGISTER });

    if (!(await Cache.exists(codeVal.key))) return FormatCode.errorEnum(CodeEnum.CODE_NOT_EXISTS);

    const codeStr = await Cache.get(codeVal.key);

    if (codeStr !== code) return FormatCode.errorEnum(CodeEnum.CODE_FAIL);

    const user = await User.findOne({ where: { email }, raw: true });

    if (!user) return FormatCode.errorEnum(CodeEnum.CODE_EXISTS);

    // 创建用户
    const pwd = Encryption.md5(password);

    const newUser = await User.create({
      email,
      username,
      pwd
    });

    return FormatCode.success(newUser);
  }

  static async forget(ctx, { email, password, enterPassword, captcha, code, ip }) {
    const {
      User
    } = ctx.DB;
    // 验证
    if (!(email && password && enterPassword && captcha && code)) return FormatCode.errorEnum(CodeEnum.FORMAT_ERROR);

    if (!Validates.isEmail(email)) return FormatCode.errorEnum(CodeEnum.EMAIL_FORMAT_FAIL);

    if (Encryption.decryptString(password) !== Encryption.decryptString(enterPassword)) return FormatCode.errorEnum(CodeEnum.PASSWORD_NOT_SAME);

    // 图形验证码
    const captchaVal = CacheMap.CAPTCHA({ ip });
    if (!(await Cache.exists(captchaVal.key))) return FormatCode.errorEnum(CodeEnum.CODE_FAIL);

    const captchaCode = await Cache.get(captcha.key);

    if (captchaCode !== captcha) return FormatCode.errorEnum(CodeEnum.CODE_FAIL);

    // 邮箱验证码
    const codeVal = CacheMap.SEND_CODE({ email, type: USER.FORGET });

    if (!(await Cache.exists(codeVal.key))) return FormatCode.errorEnum(CodeEnum.CODE_NOT_EXISTS);

    const codeStr = await Cache.get(codeVal.key);

    if (codeStr !== code) return FormatCode.errorEnum(CodeEnum.CODE_FAIL);


    const pwd = Encryption.md5(Encryption.decryptString(password));

    const forget = await User.update({ pwd }, { where: { email } });

    return FormatCode.success(CodeEnum.UPDATE_PASSWORD_SUCCESS);

  }

  static async captcha({ ip }) {
    // 频繁请求处理
    const limitRequest = CacheMap.LIMIT_REQUEST(ip);

    // 是否频繁请求图片验证码
    if (await Cache.exists(limitRequest.key)) {
      // 当发送次数 < 0 时
      if (await Cache.isEqual(limitRequest.key, value => value <= 0)) {
        return FormatCode.errorEnum(CodeEnum.CODE_SEND_FAIL);
      }
    } else {
      let maxReqCount = 10;
      await Cache.set(limitRequest.key, maxReqCount, limitRequest.ex);
    }

    const reqCount = await Cache.get(limitRequest.key);
    Cache.set(limitRequest.key, reqCount - 1, limitRequest.ex);

    // 生成验证码
    const code = SendCode.generatorCodeSVG(4);

    const captchaVal = CacheMap.CAPTCHA(ip);

    Cache.set(captchaVal.key, code.text, captchaVal.ex);

    return code.data;
  }

  static async sendCode({ email, type }) {
    // 验证
    if (!(type || email)) return FormatCode.errorEnum(CodeEnum.CODE_EMAIL_IS_NULL);

    if (!Validates.isEmail(email)) return FormatCode.errorEnum(CodeEnum.EMAIL_FORMAT_FAIL);

    // 是否频繁发送
    const emailVal = CacheMap.SEND_CODE({ email, type });

    if (!(await Cache.exists(emailVal.key))) return FormatCode.errorEnum(CodeEnum.CODE_EXISTS);

    // 生成并发送验证码
    const code = SendCode.generatorCode(4);

    const sendCode = await SendCode.email({ email, title: type, content: code });

    Cache.set(emailVal.key, code, emailVal.ex);

    return FormatCode.success(sendCode);
  }

  static async userProfile(ctx) {
    const {
      User
    } = ctx.DB;

    const {
      authorizationParse
    } = ctx.request;

    if (!authorizationParse) return FormatCode.errorEnum(CodeEnum.UNAUTHORIZED_ACCESS);

    const {
      email,
      username
    } = authorizationParse;

    const user = await User.findOne({ email, username });

    if (!user) return FormatCode.errorEnum(CodeEnum.USER_NOT_EXISTS);

    return FormatCode.success(user);
  }

  static async userModifierProfile(ctx, modifiedUserInfo) {
    const {
      UserProfile
    } = ctx.DB;

    const {
      authorizationParse
    } = ctx.request;

    if(!authorizationParse) return FormatCode.errorEnum(CodeEnum.UNAUTHORIZED_ACCESS);

    const {
      id,
      email
    } = authorizationParse;

    const userProfile = (await UserProfile.findOne({
      where: { user_id: 1 }
    }));

    const userProfileJSON = userProfile.toJSON();

    // 对比差异, 求出最小更新值
    for(let k in userProfileJSON) {
      if(modifiedUserInfo.hasOwnProperty(k)) {
        modifiedUserInfo[k] = modifiedUserInfo[k] || userProfileJSON[k];
      }
    }

    await userProfile.update(modifiedUserInfo);

    return FormatCode.success(userProfile);
  }
}

module.exports = UserService;