const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// The `/api/posts` endpoint
router.get('/', async (req, res) => {
  // find all posts
  try {
    const posts = await Post.findAll({
      // include associated User & Comments.
      include: [{ model: User }, { model: Comment }]
    });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one Post by its `id` value
  try {
    const post = await Post.findByPk(req.params.id, {
      // include associated User & Comments.
      include: [{ model: User }, { model: Comment }],
    });

    if (!post) {
      res.status(404).json({ message: 'No User found with that id!' });
      return;
    }

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
