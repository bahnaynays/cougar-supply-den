import type { NextApiRequest, NextApiResponse } from 'next';
import { getConnection } from '@/../db';


async function handler(req: NextApiRequest, res: NextApiResponse) {
  const pool = await getConnection();

  if (req.method === 'GET') {
    try {
      const result = await pool.request().query(`
        SELECT Sup_id
        FROM [dbo].[SUPPLIER]
      `);
      console.log('GET response being sent');
      res.status(200).json(result.recordset);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    const userData = req.body;

    try {
      await pool.request()
        .input('Sup_id', userData.Sup_id)
        .query(`
          INSERT INTO [dbo].[SUPPLIER] (Sup_id)
          VALUES (@Sup_id)
        `);

      console.log('POST response being sent');
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  
  
} else if (req.method === 'PUT') {
    const user_id = req.query.user_id;
    const userData = req.body;

    try {
      await pool.request()
        .input('Sup_id', user_id)
        .query(`
          UPDATE [dbo].[USERS]
          SET Sup_id = @Sup_id, 
          WHERE Sup_id = @Sup_id
        `);

      console.log('PUT response being sent');
      res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
} else if (req.method === 'DELETE') {
    const user_id = req.query.user_id;
  
    try {
      await pool.request()
        .input('Sup_id', user_id)
        .query(`
          DELETE FROM [dbo].[SUPPLIER]
          WHERE Sup_id = @Sup_id
        `);
  
      console.log('DELETE response being sent');
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    console.log('Method not allowed response being sent');
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

export default handler;