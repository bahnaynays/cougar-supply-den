export interface Product {
    ProductID: string;
    p_name: string;
    Inv_quantity: number;
    prod_type: string;
    p_thresh: number;
    date_add: string | null;
    cart_id: number | null;
    supp: string | null;
    cost: number | null;
  }
  