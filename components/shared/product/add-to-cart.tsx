'use client';

import { CartItem } from '@/types';

const AddToCart = ({ item }: { item: Omit<CartItem, 'cartId'> }) => {
  return <>Add To Cart</>;
};

export default AddToCart;
