// article.routes.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Article = require('../models/article');

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Get all articles
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create an article
router.post('/', upload.single('photo'), async (req, res) => {
  const article = new Article({
    title: req.body.title,
    description: req.body.description,
    content: req.body.content,
    photo: req.file.filename
  });

  try {
    const newArticle = await article.save();
    res.status(201).json(newArticle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get one article
router.get('/:id', getArticle, (req, res) => {
  res.json(res.article);
});

// Update an article
router.patch('/:id', getArticle, async (req, res) => {
  if (req.body.title != null) {
    res.article.title = req.body.title;
  }
  if (req.body.description != null) {
    res.article.description = req.body.description;
  }
  if (req.body.content != null) {
    res.article.content = req.body.content;
  }
  if (req.file != null) {
    res.article.photo = req.file.filename;
  }

  try {
    const updatedArticle = await res.article.save();
    res.json(updatedArticle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an article
router.delete('/:id', getArticle, async (req, res) => {
  try {
    await res.article.remove();
    res.json({ message: 'Article deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get an article by ID
async function getArticle(req, res, next) {
  let article;
  try {
    article = await Article.findById(req.params.id);
    if (article == null) {
      return res.status(404).json({ message: 'Cannot find article' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.article = article;
  next();
}

module.exports = router;
