var DataTypes = require("sequelize").DataTypes;
var _Article = require("./article");
var _Category = require("./category");
var _Permission = require("./permission");
var _RoleUser = require("./role_user");
var _Seo = require("./seo");
var _Tag = require("./tag");
var _User = require("./user");
var _UserLog = require("./user_log");
var _UserProfile = require("./user_profile");

function initModels(sequelize) {
  var Article = _Article(sequelize, DataTypes);
  var Category = _Category(sequelize, DataTypes);
  var Permission = _Permission(sequelize, DataTypes);
  var RoleUser = _RoleUser(sequelize, DataTypes);
  var Seo = _Seo(sequelize, DataTypes);
  var Tag = _Tag(sequelize, DataTypes);
  var User = _User(sequelize, DataTypes);
  var UserLog = _UserLog(sequelize, DataTypes);
  var UserProfile = _UserProfile(sequelize, DataTypes);

  User.belongsTo(RoleUser, { as: "role", foreignKey: "role_id"});
  RoleUser.hasMany(User, { as: "users", foreignKey: "role_id"});
  Article.belongsTo(User, { as: "user", foreignKey: "user_id"});
  User.hasMany(Article, { as: "articles", foreignKey: "user_id"});
  User.belongsTo(UserProfile, { as: "id_user_profile", foreignKey: "id"});
  UserProfile.hasOne(User, { as: "user", foreignKey: "id"});

  return {
    Article,
    Category,
    Permission,
    RoleUser,
    Seo,
    Tag,
    User,
    UserLog,
    UserProfile,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
