export interface Product {
  ProductID: string;
  p_name: string;
  Inv_quantity: number;
  prod_type: string;
  date_add: string | null;
  supp: string | null;
  cost: number | null;
  url_link: string | null;
}
