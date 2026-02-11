import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export interface User {
  id: number;
  garage_number: string;
  password: string;
  role: 'user' | 'admin';
}

export const getUserByGarageNumber = async (garage_number: string): Promise<User | null> => {
  const result = await pool.query('SELECT * FROM users WHERE garage_number = $1', [garage_number]);
  return result.rows[0] || null;
};

export const createUser = async (garage_number: string, password: string, role: 'user' | 'admin') => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    'INSERT INTO users (garage_number, password, role) VALUES ($1, $2, $3) RETURNING id',
    [garage_number, hashedPassword, role]
  );
  return result.rows[0];
};