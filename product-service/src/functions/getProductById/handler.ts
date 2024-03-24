import { formatJSONResponse } from '@libs/api-gateway';
import { PRODUCTS } from '../../db/products';

export const getProductById = async (event) => {
  const { id } = event.pathParameters;
  try {
    const product = await getProduct(id);
    return formatJSONResponse({ product });
  } catch ({ message }) {
    return formatJSONResponse({ message }, 404)
  }
};

const getProduct = async (productId) => {
  if (!productId) {
    throwNotFound(productId);
  }
  const foundProduct = PRODUCTS.find(({ id }) => id === productId);
  if (foundProduct) {
    return foundProduct;
  } else {
    throwNotFound(productId);
  }
}

const throwNotFound = (id) => {
  throw new Error(`Product with id: ${ id }, could not be found!`)
}