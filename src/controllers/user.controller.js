import User from '../models/user.model.js';
import Article from '../models/article.model.js';

export const getUsers = async (req, res, next) => {
  try {
    const { sort } = req.query;

    const query = User.find({}, 'email age')
      .select('firstName lastName')
      .sort(sort === 'age' ? { age: 1 } : null)
      .lean();

    const users = await query.exec();
    const transformedUsers = users.map(user => ({
      fullName: user.firstName + ' ' + user.lastName,
      email: user.email,
      age: user.age
    }));

    res.json(transformedUsers);
    console.log(users)

  } catch (err) {
    next(err);
  }
}

export const getUserByIdWithArticles = async (req, res, next) => {
  try {
    const  userId  = req.params.id.slice(1);
    const user = await User.findById(userId,
      {_id: 0, firstName: 1, numberOfArticles: 1}); // MAKE FULLNAME

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const articles = await Article.find({ owner: userId }, 'title subtitle');

    res.json({ user, articles });

  } catch (err) {
    next(err);
  }
}

export const createUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, role, age } = req.body;

    const user = new User({
      firstName,
      lastName,
      email,
      role,
      age,
    });

    const newUser = await user.save();

    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
}

export const updateUserById = async (req, res, next) => {
  try {
    const  userId  = req.params.id.slice(1);
    const { firstName, lastName, age } = req.body;

    if (age < 1) {
      return res.status(400).json({ message: 'Age must be a positive number' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, age },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
}

export const deleteUserById = async (req, res, next) => {
  try {
    const  userId  = req.params.id.slice(1);

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await Article.deleteMany({ owner: userId });

    await User.deleteOne({ _id: userId })

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    next(err);
  }
}

