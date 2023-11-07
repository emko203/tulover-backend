const User = require('../../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Replace 'your_jwt_secret' with the secret key for JWT
const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';

exports.register = async (req, res) => {
  try {
    let { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }

    // Check if the user already exists
    let user = await User.findOne({ username });
    if (user) {
      return res.status(409).json({ message: 'User already exists.' });
    }

    // Create a new user
    user = new User({ username, password });
    await user.save();

    // Respond with the new user (excluding the password)
    res.status(201).json({ 
      user: {
        id: user._id,
        username: user.username
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    let { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }

    // Check if the user exists
    let user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Compare the provided password with the stored hash
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // User matched, create JWT Payload
    const payload = {
      user: {
        id: user._id
      }
    };

    // Sign token
    jwt.sign(payload, jwtSecret, { expiresIn: '1h' }, (error, token) => {
      if (error) throw error;
      res.json({
        token,
        user: {
          id: user._id,
          username: user.username
        }
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};