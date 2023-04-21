import type { NextApiRequest, NextApiResponse } from 'next';
import { getConnection } from '@/../db';


async function handler(req: NextApiRequest, res: NextApiResponse) {
  const pool = await getConnection();

  if (req.method === 'GET') {
    try {
      const result = await pool.request().query(`
        SELECT user_id, f_name, l_name, dob, email, phone_num, pw, userType, url_link
        FROM [dbo].[USERS]
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
        .input('user_id', userData.user_id)
        .input('f_name', userData.f_name)
        .input('l_name', userData.l_name)
        .input('dob', userData.dob)
        .input('email', userData.email)
        .input('phone_num', userData.phone_num)
        .input('pw', userData.pw)
        .input('userType', userData.userType)
        .input('url_link', userData.url_link)
        .query(`
          INSERT INTO [dbo].[USERS] (user_id, f_name, l_name, dob, email, phone_num, pw, userType, url_link)
          VALUES (@user_id, @f_name, @l_name, @dob, @email, @phone_num, @pw, @userType, @url_link)
        `);

      console.log('POST response being sent');
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    console.log('Method not allowed response being sent');
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

export default handler;