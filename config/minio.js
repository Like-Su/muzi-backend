const Minio = require('minio');
const config = require('./config');

const minioClient = new Minio.Client({
  endPoint: config.minio.endPoint,
  port: config.minio.port,
  useSSL: config.minio.useSSL,
  accessKey: config.minio.accessKey,
  secretKey: config.minio.secretKey,
});

minioClient.listBuckets((err, buckets) => {
  if(err) throw new Error(err);
});

module.exports = minioClient;