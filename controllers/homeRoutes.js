const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
  Post.findAll({
    attributes: ['id', 'title', "text", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ['id', 'text', 'post_id', 'user_id', "created_at"],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  }).then(postsData => {
      const posts = postsData.map(post => post.get({ plain: true }));
      res.render('home', {posts});
  }).catch(err => {
      res.status(500).json(err);
    });
});

router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'title', "text"],
    include: [
        {
            model: Comment,
            attributes: ['id', 'text', 'post_id', 'user_id'],
            include: {
              model: User,
              attributes: ['username']
            }
        },
        {
            model: User,
            attributes: ['username']
        }
    ]
  })
  .then(postsData => {
    if (!postsData) {
      res.status(404).json({ message: 'No Post found with this id' });
      return;
    }
    const post = postsData.get({ plain: true });
    res.json(post);
    // TODO - render single post
  })
  .catch(err => {
    res.status(500).json(err);
  });
});

module.exports = router;
