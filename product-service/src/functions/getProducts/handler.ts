import { formatJSONResponse } from '@libs/api-gateway';
import { PRODUCTS } from '../../db/products';

export const getProducts = async (event) => {
  return formatJSONResponse(PRODUCTS);
};
