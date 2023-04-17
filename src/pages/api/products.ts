import type { NextApiRequest, NextApiResponse } from 'next';
import { getConnection } from '@/../db';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const pool = await getConnection();

  if (req.method === 'GET') {
    try {
      const result = await pool.request().query(`
        SELECT ProductID, p_name, Inv_quantity, prod_type, p_thresh, date_add, cart_id, supp, cost
        FROM [dbo].[PRODUCT]
      `);
      console.log('GET response being sent');
      res.status(200).json(result.recordset);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    const productData = req.body;

    try {
      await pool.request()
        .input('p_name', productData.p_name)
        .input('Inv_quantity', productData.Inv_quantity)
        .input('prod_type', productData.prod_type)
        .input('p_thresh', productData.p_thresh)
        .input('date_add', productData.date_add)
        .input('cart_id', productData.cart_id)
        .input('supp', productData.supp)
        .input('cost', productData.cost)
        .query(`
          INSERT INTO [dbo].[PRODUCT] (p_name, Inv_quantity, prod_type, p_thresh, date_add, cart_id, supp, cost)
          VALUES (@p_name, @Inv_quantity, @prod_type, @p_thresh, @date_add, @cart_id, @supp, @cost)
        `);

      console.log('POST response being sent');
      res.status(201).json({ message: 'Product created successfully' });
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else if (req.method === 'PUT') {
    const productId = req.query.productId;
    const productData = req.body;

    try {
      await pool.request()
        .input('productId', productId)
        .input('p_name', productData.p_name)
        .input('Inv_quantity', productData.Inv_quantity)
        .input('prod_type', productData.prod_type)
        .input('p_thresh', productData.p_thresh)
        .input('date_add', productData.date_add)
        .input('cart_id', productData.cart_id)
        .input('supp', productData.supp)
        .input('cost', productData.cost)
        .query(`
          UPDATE [dbo].[PRODUCT]
          SET p_name = @p_name,
              Inv_quantity = @Inv_quantity,
              prod_type = @prod_type,
              p_thresh = @p_thresh,
              date_add = @date_add,
              cart_id = @cart_id,
              supp = @supp,
              cost = @cost
          WHERE ProductID = @productId
        `);

      console.log('PUT response being sent');
      return res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
      console.error('Error updating product:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else if (req.method === 'DELETE') {
    const productId = req.query.productId;

    await pool.request()
      .input('productId', productId)
      .query(`
        DELETE FROM [dbo].[PRODUCT]
        WHERE ProductID = @productId
      `);

    console.log('DELETE response being sent');
    res.status(200).json({ message: 'Product deleted successfully' });
  } else {
    console.log('Method not allowed response being sent');
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

export default handler;