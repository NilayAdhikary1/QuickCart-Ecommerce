
// eslint-disable-next-line no-undef
export const BASE_URL = process.env.NODE_ENV === 'development'? 'http://localhost:5000' : '';
export const PRODUCTS_URL = '/products';
export const USERS_URL = '/account';
export const ORDERS_URL = '/orders';
export const CHECKOUT_STEPS = [
    { title: "Sign in", badgeNumber: 1 },
    { title: "Delivery Address", badgeNumber: 2 },
    { title: "Order Summary", badgeNumber: 3 },
    { title: "Payment Options", badgeNumber: 4 },
  ];
