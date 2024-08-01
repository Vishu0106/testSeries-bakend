import {User} from '../models/user.model.js';
import jwt from 'jsonwebtoken';
// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// Register User
const registerUser = async (req, res) => {
  const { email, password , isAdmin } = req.body;
  if(!email || !password){
    return res
    .status(400)
    .json({ message: 'Please enter all fields'});
  }
  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    if(!isAdmin){
    await User.create({ email, password });
    } else {
      await User.create({ email, password, isAdmin });
    }
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("eamil ,mail ",email,password);
  console.log("req.body",req.body);
  if(!email || !password){
    return res
    .status(400)
    .json({ message: 'Please enter all fields'});
  }
  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id);
      res
      .status(200)
      .json({ token , isAdmin : user.isAdmin });
    } else {
      res.status(400).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user.isAdmin) {
            return res.status(401).json({ message: 'Not authorized as an admin' });
        }
        res.status(200)
        .json({ message: 'Admin authorized' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    } 
}
export {
    registerUser,
    loginUser,
    isAdmin
}
