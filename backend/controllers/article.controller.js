const Article = require('../models/article');

// Get all articles
exports.AllArticle = async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//fonction count
exports.countArticle =(req,res) => {
  Article.count({}).exec(function(err, st) {
      if (st == 0 && err) {
        res.json("Pas de messages", err);
      } else {
        res.json(st); 
      }
    });
};

// Create an article
exports.saveArticle = async (req, res) => {
  const article = new Article({
    ...req.body,
     photo: req.file.filename
  });

  try {
    const newArticle = await article.save();
    res.status(201).json(newArticle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update an article
exports.updateArticle =async (req, res) => {
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
};

// Delete an article
exports.deleteArticle = async (req, res) => {
  try {
    await res.article.remove();
    res.json({ message: 'Article deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Get one article
exports.getOneArticle = async (req, res, next)  => {
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
