const { Stream } = require('stream');

class StreamPromise {
  // 读取文件
  static readStream(stream, dataCallback = () => {}, endCallback = () => {}) {
    if(!(stream instanceof Stream)) {
      throw new TypeError('arguments type is not stream');
    }

    return new Promise((resolve, reject) => {
      const arr = [];

      stream.on('data', chunk => {
        arr.push(chunk);
        dataCallback(chunk);
      });

      stream.on('end', () => {
        resolve(Buffer.isBuffer(arr[0]) ? Buffer.concat(arr) : arr);
        endCallback(arr);
      });

      stream.on('end', (err) => {
        reject(err);
      });
    });
  }

  // 转换为 Promise
  static toPromise({ method, thisArg }, ...args) {
    return new Promise((resolve, reject) => {
      method.call(thisArg, ...args, (err, data) => {
        if(err) {
          reject(err);
        }

        resolve(data);
      });
    });
  }
}

module.exports = StreamPromise;