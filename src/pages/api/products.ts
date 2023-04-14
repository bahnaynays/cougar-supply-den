import type { NextApiRequest, NextApiResponse } from 'next';
import { getConnection}  from '@/../db';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  try {
    const pool = await getConnection();
    const result = await pool.request().query(`
      SELECT ProductID, p_name, Inv_quantity, prod_type, p_thresh, date_add, cart_id, supp, cost
      FROM [dbo].[PRODUCT]
    `);
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export default handler;