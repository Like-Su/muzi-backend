// 状态码表
module.exports = {
  UNAUTHORIZED_ACCESS: {
    msg: 'Unauthorized access',
    code: 403
  },

  UN_PERMISSION_ACCESS: {
    msg: 'un permission access',
    code: 403
  },

  // 异常错误
  INVALID_ERROR: {
    msg: 'invalid error',
    code: 400
  },

  FORMAT_ERROR: {
    msg: 'format error',
    code: 400
  },

  // 请求过于频繁
  CODE_EXISTS: {
    msg: 'request are too frequent',
    code: 429
  },
  CODE_NOT_WRITE: {
    msg: 'Please fill in the graphic verification code',
    code: 429
  },
  // 验证码过期
  CODE_EXPIRE: {
    msg: 'The verification code has expired. Please obtain the verification code again',
    code: 1003
  },

  CODE_SEND_FAIL: {
    msg: 'Frequent sending of verification codes',
    code: 1001
  },

  // 验证码未发送
  CODE_NOT_EXISTS: {
    msg: 'Please send the verification code',
    code: 1001
  },

  // 验证码错误
  CODE_FAIL: {
    msg: 'verification code error',
    code: 1002
  },

  // 邮箱为空
  CODE_EMAIL_IS_NULL: {
    msg: 'email is null',
    code: 1002
  },

  // 邮箱格式错误
  EMAIL_FORMAT_FAIL: {
    msg: 'Email format error, please ensure that your email address conforms to the standard format, for example: example@example.com',
    code: 400
  },

  // 密码长度错误
  PASSWORD_LENGTH_FAIL: {
    msg: 'The password length is incorrect. Please ensure that the password contains at least 9 characters.',
    code: 400
  },

  // 密码不同
  PASSWORD_NOT_SAME: {
    msg: 'Please check if the password input is inconsistent',
    code: 1002
  },

  // 用户已存在
  USER_EXISTS: {
    msg: 'The user already exists',
    code: 1001
  },

  // 邮箱或密码错误
  USER_EMAIL_OR_PASSWORD_ERROR: {
    msg: 'email or password error',
    code: 1001
  },


  // 用户不存在
  USER_NOT_EXIST: {
    msg: 'user not exists',
    code: 1001
  },

  // 密码更新
  UPDATE_PASSWORD_SUCCESS: {
    msg: 'password update success',
    code: 200
  },

  // 文章
  // 文章不存在
  POST_NOT_EXISTS: {
    msg: 'The specified post does not exist',
    code: 404
  },

  // 搜索格式错误
  SEARCH_FORMAT_ERROR: {
    msg: 'Search format error, Please check you input',
    code: 400
  },

  // 排序参数错误
  SORT_PARAMETER_ERROR: {
    msg: 'Sorting parameter error',
    code: 400
  },
  // 文章删除成功
  ARTICLE_DELETE_SUCCESS: {
    msg: 'article delete success',
    code: 200
  },
   // 文章发布
   ARTICLE_PUBLISH_SUCCESS: {
    msg: 'article publish success',
    code: 200
  }

}