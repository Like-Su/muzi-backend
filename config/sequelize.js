const { Sequelize } = require('sequelize');
const { Op } = require('sequelize');
const initModules = require('@/models/init-models');
const config = require('./config');


const sequelize = new Sequelize(config.mysql);

const modules = initModules(sequelize);


// 设置关系
// modules.User.hasMany(modules.Posts, { foreignKey: 'user_id', as: 'posts' });
// modules.Posts.belongsTo(modules.User, { foreignKey: 'user_id', as: 'user' });

module.exports = {
  ...modules,
  sequelize,
  Op
};