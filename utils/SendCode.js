const nodemailer = require('nodemailer');
const svgCaptcha = require('svg-captcha');
const config = require('@config/config');


// 邮件发送
class SendCode {
  static emailServer = nodemailer.createTransport(config.email);
  // 发送邮箱
  static async email({ email, title, content }) {
    return await this.emailServer({
      from: `${title} <${config.email.auth.user}>`,
      to: email,
      text: content
    })
  }

  // 生成验证码
  static generatorCode(num) {
    const codeStr = Math.random().toString(16);
    return codeStr.slice(-codeStr.length + 2, num + 2);
  }

  // 生成图片验证码
  static generatorCodeSVG(num) {
    const code = svgCaptcha.create({
      size: num,
      ignoreChars: '0o1i',
      noise: 1,
      color: true,
      background: '#FFF'
    });

    return code;
  }
}

module.exports = SendCode;