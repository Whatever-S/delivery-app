import Article from '../models/article.model.js';
import User from '../models/user.model.js';

export const getArticles = async (req, res, next) => {
  try {
    
  } catch (err) {
    next(err);
  }
}

export const getArticleById = async (req, res, next) => {
  try {

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

  } catch (err) {
    next(err);
  }
}

export const deleteArticleById = async (req, res, next) => {
  try {

  } catch (err) {
    next(err);
  }
}
