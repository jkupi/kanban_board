import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  // If the user exists and the password is correct, return a JWT token
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username }});
    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'invalid password' });
    }

    const token = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: '1h' },
    );

    return res.status(200).json({ token });
  } catch (error) {
    console.error('error during login', error);
    return res.status(500).json({ message: 'error during login' });
  }
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
