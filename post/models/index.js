const Sequelize = require('sequelize');
const Post = require('./post');
const Comment = require('./comment');
const Image = require('./image');


const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

db.sequelize = sequelize;
db.Post = Post;
db.Comment = Comment;
db.Image = Image;

Post.init(sequelize);
Comment.init(sequelize);
Image.init(sequelize);

Post.associate(db);
Comment.associate(db);
Image.associate(db);

module.exports = db;
