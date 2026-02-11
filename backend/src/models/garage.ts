import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export interface Garage {
  id: number;
  number: string;
  owner_name?: string;
  status: 'paid' | 'partial' | 'unpaid';
}

export const getAllGarages = async (): Promise<Garage[]> => {
  const result = await pool.query('SELECT * FROM garages ORDER BY number');
  return result.rows;
};

export const getGarageByNumber = async (number: string): Promise<Garage | null> => {
  const result = await pool.query('SELECT * FROM garages WHERE number = $1', [number]);
  return result.rows[0] || null;
};