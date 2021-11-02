const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const date = new Date();

router.route('/').get(async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        { model: User, attributes: ['id', 'username'] },
        { model: Comment, attributes: ['id', 'comment', 'user_id', 'date'] },
      ],
    });
