// article.model.js

const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  photo: {
    type: String
  }
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
