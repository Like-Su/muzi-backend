const fs = require('fs');
const path = require('path');

module.exports = () => {
  const root = process.cwd();
  const envFile = path.join(root, '.env');

  try {
    const env = fs.readFileSync(envFile).toString();
    const envs = env.split(/\r\n/).map(env => env.split('='));

    envs.forEach(env => {
      const [key, value] = env;
      process.env[key] = value;
    });
  } catch(e) {
    throw new Error(e);
  }
}