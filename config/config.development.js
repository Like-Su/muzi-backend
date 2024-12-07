const { join } = require('path');

module.exports = {
  mysql: {
    database: 'muzi',
    username: 'root',
    password: 'xykl4869',
    dialect: 'mysql',
    host: 'localhost'
  },
  redis: {
    port: 6379,
    host: 'localhost',
    username: 'default',
    password: '',
    db: 0
  },
  email: {
    host: "smtp.163.com",
    port: 465,
    secure: true, // true for port 465, false for other ports
    auth: {
      user: "kl13615976938@163.com",
      pass: "Kelan4869",
    },
  },
  jwt: {
    secret: 'muzi',
  },
  privatePemPath: join(process.cwd(), 'private.pem'),
  md5Slat: 'muzi',
  minio: {
    // http://192.168.10.31:9001/browser/images
    endPoint: 'www.course.oss.com',
    port: 9000,
    useSSL: false,
    accessKey: 'CourseAccessKey',
    secretKey: 'CourseSecretKey'
  }
}