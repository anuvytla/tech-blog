const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// The `/api/users` endpoint
router.get('/', async (req, res) => {
  // find all users
  try {
    const users = await User.findAll({
      // include associated Posts & Comments.
      include: [{ model: Post }, { model: Comment }]
    });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one User by its `id` value
  try {
    const user = await User.findByPk(req.params.id, {
      // include associated Posts & Comments.
      include: [{ model: Post }, { model: Comment }],
    });

    if (!user) {
      res.status(404).json({ message: 'No User found with that id!' });
      return;
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
