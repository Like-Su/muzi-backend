const STORE_DATE = {
  SECONDS: 60,
  DAY: 60 * 60 * 24
}

module.exports = {
  LIMIT_REQUEST: (ip) => ({ key: `limit:request:${ip}`, ex: STORE_DATE.SECONDS }),
  CAPTCHA: (ip) => ({ key: `captcha:${ip}`, ex: STORE_DATE.SECONDS }),
  SEND_EMAIL: ({ email, type }) => ({ key: `email:${type}:${email}`, ex: STORE_DATE.SECONDS })
}