const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const date = new Date();

router.route('/').get(async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        { model: User, 
            attributes: ['id', 'username'] 
        },
        { model: Comment, 
            attributes: ['id', 'comment', 'user_id', 'date'] 
        },
      ],
    });
    router
    .route('/:id')
    .get(async (req, res) => {
      try {
        const post = await Post.findByPk(req.params.id, {
          include: [
            { model: User, attributes: ['id', 'name'] },
            { model: Comment, attributes: ['id', 'comment', 'user_id'] },
          ],
        });

        res.status(200).json(post);
      } catch (err) {
        res.status(500).json(err);
      }
    })