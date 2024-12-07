// 网络操作
class Interface {
  static ip(ctx) {
    const {
      hostname,
      ip
    } = ctx;

    if (hostname === 'localhost') {
      return hostname;
    }

    return ip;
  }
}

module.exports = Interface;