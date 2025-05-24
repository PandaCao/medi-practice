import { createClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required.' });
  }

  // Find user by username
  const { data: user, error } = await supabase
    .from('user')
    .select('*')
    .eq('username', username)
    .single();

  if (error || !user) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  // Check password using bcrypt
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  // Get role info
  let roleInfo = null;
  if (user.role_id) {
    const { data: roleData } = await supabase
      .from('user_role')
      .select('role_name')
      .eq('id', user.role_id)
      .single();
    roleInfo = roleData;
  }

  // Prepare user info for FE
  const userInfo = {
    id: user.id,
    username: user.username,
    role: roleInfo ? roleInfo.role_name : null,
    first_name: user.first_name,
    last_name: user.last_name,
    specialization: user.specialization,
    prefix: user.prefix
  };

  // Create JWT
  const token = jwt.sign({ id: user.id, role: userInfo.role }, JWT_SECRET, { expiresIn: '8h' });

  return res.json({ token, user: userInfo });
};

// Middleware to extract user from JWT
export const getMe = async (req, res) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'No token provided.' });
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // Get user info
    const { data: user } = await supabase
      .from('user')
      .select('*')
      .eq('id', decoded.id)
      .single();
    if (!user) return res.status(404).json({ message: 'User not found.' });
    // Get role info
    let roleInfo = null;
    if (user.role_id) {
      const { data: roleData } = await supabase
        .from('user_role')
        .select('role_name')
        .eq('id', user.role_id)
        .single();
      roleInfo = roleData;
    }
    const userInfo = {
      id: user.id,
      username: user.username,
      role: roleInfo ? roleInfo.role_name : null,
      first_name: user.first_name,
      last_name: user.last_name,
      specialization: user.specialization,
      prefix: user.prefix
    };
    return res.json({ user: userInfo });
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
};
