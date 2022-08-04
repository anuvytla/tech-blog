// import models
const User = require('./User');
const Comment = require('./Comment');
const Post = require('./Post');

// Post belongsTo User
Post.belongsTo(User, {
  foreignKey: 'user_id',
});

// User have many Posts
User.hasMany(Post, {
  foreignKey: 'user_id',
});

// Comment belongsTo User
Comment.belongsTo(User, {
    foreignKey: 'user_id',
});
  
// User have many Comments
User.hasMany(Comment, {
    foreignKey: 'user_id',
});

// Comment belongsTo Post
Comment.belongsTo(Post, {
    foreignKey: 'post_id',
});

// Post have many Comments
Post.hasMany(Comment, {
    foreignKey: 'post_id',
});

module.exports = {
  User,
  Comment,
  Post,
};