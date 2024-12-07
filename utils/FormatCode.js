// 处理状态码
class FormatCode {
  // 成功状态码
  static success(data) {
    return { data, msg: 'success', code: 200 };
  }
  // 成功 枚举状态
  static successEnum(codeEnumMap, data) {
    return { ... codeEnumMap, data };
  }
  // 错误处理
  static error(code, msg) {
    return { msg, code };
  }
  // 错误枚举状态
  static errorEnum(codeEnumMap, data) {
    return { ... codeEnumMap, data };
  }
}

module.exports = FormatCode;