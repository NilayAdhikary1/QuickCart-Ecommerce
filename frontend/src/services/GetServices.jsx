
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/'
});

export const getProducts = () => {
    return api.get("products");
}

export const getSelectedProduct = (productId) => {
  return api.get(`products/${productId}`);
}
