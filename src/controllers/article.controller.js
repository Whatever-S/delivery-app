import Article from '../models/article.model.js';
import User from '../models/user.model.js';

import mongoose from 'mongoose';

export const getArticles = async (req, res, next) => {
  try {
    const { title, page, limit } = req.query;

    const query = Article.find();

    if (title) {
      query.regex('title', new RegExp(title, 'i'));
    }

    // Apply pagination
    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 5;
    const startIndex = (pageNumber - 1) * limitNumber;
    query.skip(startIndex).limit(limitNumber);

    query.populate('owner', '-_id fullName email age');

    const articles = await query.exec();

    res.json(articles);
  } catch (err) {
    next(err);
  }
}

export const getArticleById = async (req, res, next) => {
  try {
    const articleId = req.params.id.slice(1);

    const article = await Article.findById(articleId)
      .populate('owner', '-_id fullName')
      .select('title subtitle description createdAt');

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.json(article);
  } catch (err) {
    next(err);
  }
}

export const createArticle = async (req, res, next) => {
  try {
    const {title, description, owner, subtitle, category  } = req.body

    const existingOwner = await User.findById(owner);

    if (!existingOwner) {
      return res.status(404).json({ message: 'Autor not found' });
    }

    const article = new Article({
      title, description, owner, subtitle, category 
    })

    const newArticle = await article.save()
    existingOwner.numberOfArticles += 1
    await existingOwner.save();
    
    return res.status(201).json(newArticle)

  } catch (err) {
    next(err);
  }
}

export const updateArticleById = async (req, res, next) => {
  try {
    const articleId = req.params.id.slice(1);
    const { title, subtitle, description } = req.body;

    //add a header with the key user-id and the value set to the ID of the user who owns the article
    const autorId = req.headers['autor-id'];

    if (!mongoose.Types.ObjectId.isValid(articleId)) {
      return res.status(400).json({ message: 'Invalid article id' });
    }

    const article = await Article.findById(articleId);

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    const autor = await User.findById(article.owner);

    if (!autor) {
      return res.status(404).json({ message: 'Autor not found' });
    }

    if (autor._id.toString() !== autorId) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    article.title = title;
    article.subtitle = subtitle;
    article.description = description;
    article.updatedAt = Date.now();

    await article.save();

    res.json({ message: 'Article updated successfully', article });
  } catch (err) {
    next(err);
  }
}

export const deleteArticleById = async (req, res, next) => {
  try {
    const articleId = req.params.id.slice(1);
    const deletedArticle = await Article.findById(articleId)

    if (!mongoose.Types.ObjectId.isValid(articleId)) {
      return res.status(400).json({ message: 'Invalid article id' });
    }
    //add a header with the key user-id and the value set to the ID of the user who owns the article
    const autorId = req.headers['autor-id'];

    if(!deletedArticle)
      return res.status(404).json({ message: 'Article not found' });

    const autor = await User.findById(autorId);

    if (!autor) {
      return res.status(404).json({ message: 'Autor not found' });
    }
  
    if (autor._id.toString() !== autorId) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    autor.numberOfArticles -= 1
    await autor.save()

    await Article.findByIdAndDelete(articleId)
    res.json({ message: 'Article deleted successfully' });
  } catch (err) {
    next(err);
  }
}
