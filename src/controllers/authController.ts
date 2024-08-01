import { Request, Response } from 'express';
import { User } from '../models/User';
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = new User({ email, password });
    await user.save();

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined');
    }

    const token = jwt.sign({ id: user._id.toString() }, jwtSecret, { expiresIn: '1h' });
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined');
    }

    const token = jwt.sign({ id: user._id.toString() }, jwtSecret, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
