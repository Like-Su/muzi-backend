const crypto = require('crypto');
const fs = require('fs');

const jwt = require('jsonwebtoken');

const config = require('@/config/config');

const privateKey = fs.readFileSync(config.privatePemPath, 'utf8');

class Encryption {
  // 解析 token
  static verify(token) {
    return jwt.verify(token, config.jwt.secret);
  }

  // 生成 token
  static sign(token) {
    return jwt.sign(token, config.jwt.secret);
  }

  // 创建 md5
  static md5(value) {
    return crypto.createHmac('md5', `${config.md5Slat}.${value}`).digest('base64url');
  }

  static decryptString(str) {
    try {
      const decryptBuf = crypto.privateDecrypt({
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING
      }, Buffer.from(str, 'base64'));

      return decryptBuf.toString('utf8');
    } catch(e) {
      return null;
    }
  }
}

// 加密函数
function encryptData(data) {
  const publicKey = fs.readFileSync('public.pem', 'utf8');
  try {
    // 使用公钥加密
    const encryptedData = crypto.publicEncrypt(
      {
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING, // 填充方式，可与私钥解密方式匹配
      },
      Buffer.from(data, 'utf8') // 将要加密的字符串转换为 Buffer
    );
    return encryptedData.toString('base64'); // 返回 base64 编码的加密数据
  } catch (error) {
    console.error('加密失败:', error.message);
    return null;
  }
}

// const encryptedString = encryptData('123456');
// const decryptString = Encryption.decryptString(encryptedString);
// console.log(encryptedString);
// console.log(decryptString);

module.exports = Encryption;