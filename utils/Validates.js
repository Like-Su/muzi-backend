class Validates {
  /**
   * 判断是否为 邮箱
   * @param {*} email 
   * @returns {boolean}
   */
  static isEmail(email) {
    const emailReg = /^[a-zA-Z0-9]+\@[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+$/;
    return emailReg.test(email);
  }

  /**
   * 判断密码是否合法
   * @param {*} password
   * @returns {boolean}
   */
  static validatePassword = function (password) {
    const passwordReg = /[^0-9a-zA-Z_]/;
    return !passwordReg.test(password);
  }

  /**
   * 验证文本是否符合规范
   * @param {string} text 文本
   * @returns {boolean}
   */
  static text = function(text) {
    const textReg = /[0-9A-Za-z$_+-8/\"\'\:\;\[\]\{\}\?\/\|]+/g;
    return textReg.test(text);
  }

  /**
   * 验证图片后缀
   * @param {string} ext 后缀名
   * @returns {boolean}
   */
  static isImage(ext) {
    const imageReg = /\.(png|jp?eg|gif|webp)/;
    return imageReg.test(ext);
  }
}

module.exports = Validates;