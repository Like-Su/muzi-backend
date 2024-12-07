const path = require('path');
const minio = require('@/config/minio');
const StreamPromise = require('./StreamPromise');
const Validates = require('./Validates');

class Minio {
  /**
   * 获取图片 Buffer
   * @param {string} bucketName 桶名称
   * @param {string} imageName 图片名称
   * @returns {Buffer} 图片 Buffer
   */
  static async getImages(bucketName, imageName) {
    const imageStream = await minio.getObject(bucketName, imageName);

    return await StreamPromise.readStream(imageStream);
  }

  /**
   * 获取图片url
   * @param {string} method 方法
   * @param {string} bucketName 桶名称
   * @param {string} imageName 图片名称
   * @param {number} expiry 授权访问时间(s)
   * @param {object} req 信息
   * @param {number} date 何时授权访问
   * @returns 
   */
  static async _presignedUrl(method, bucketName, imageName, expiry = 60 * 60 * 24 * 7, req = undefined, date = undefined) {
    const url = await minio.presignedUrl(method, bucketName, imageName, expiry, req, date);

    return url;
  }

  /**
   * 文件上传
   * @param {string} bucketName 桶名称
   * @param {string} filePath 路径
   * @returns {object}
   */
  static async uploadFile(bucketName, filePath) {
    const ext = path.basename(filePath);

    if (!Validates.isImage(ext)) {
      return false;
    }
    // 文件名称
    const fileName = path.basename(filePath);
    filePath = path.join(__dirname, filePath);

    const uploadFile = await StreamPromise.toPromise({ method: minio.fPutObject, thisArg: minio }, bucketName, fileName, filePath);

    return uploadFile;
  }

  /**
   * 
   * @param {string} bucketName 桶名称
   * @param {string} prefix 前缀名称
   * @param {boolean} recursive 是否递归处理
   * @param {object} listOpts 查询参数
   */
  static async getBucketObject(bucketName, prefix = '', recursive = true, listOpts = {}) {
    const objects = minio.listObjects(bucketName, prefix, recursive, listOpts);

    return StreamPromise.readStream(objects);
  }

  static async getBuckets() {
    const buckets = await minio.listBuckets();

    return buckets;
  }
}

['get', 'post'].forEach(method => {
  Minio[`${method}PresignedUrl`] = async function (...args) {
    return await Minio._presignedUrl(method, ...args);
  }
});

module.exports = Minio;