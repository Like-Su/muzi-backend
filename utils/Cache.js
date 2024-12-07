const redis = require('@/config/redis');

// 缓存方法
class Cache {
  static get(key) {
    return redis.get(key);
  }

  static set(key, value, expires) {
    redis.set(key, value);
    expires && this.expires(key, expires);
  }

  static expires(key, expires) {
    return redis.expire(key, expires);
  }

  static ttl(key) {
    return redis.ttl(key);
  }

  static exists(key) {
    return redis.exists(key);
  }

  static zAdd(key, values) {
    return redis.zadd(key, values);
  }

  static zRange(key, start = 0, end = -1, score = 'WITHSCORES') {
    return redis.zrange(key, start, end, score);
  }

  static async isEqual(key, cb) {
    return cb(await this.get(key));
  }
}

module.exports = Cache;