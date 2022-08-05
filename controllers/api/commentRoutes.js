const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// The `/api/comments` endpoint
router.get('/', async (req, res) => {
  // find all comments
  try {
    const comments = await Comment.findAll({
      // include associated Post & User.
      include: [{ model: User }, { model: Post }]
    });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one Comment by its `id` value
  try {
    const comment = await Comment.findByPk(req.params.id, {
      // include associated User & Post.
      include: [{ model: User }, { model: Post }],
    });

    if (!comment) {
      res.status(404).json({ message: 'No User found with that id!' });
      return;
    }

    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const comment = await Comment.create(req.body);
    res.status(200).json(comment);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
