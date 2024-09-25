import React, { createContext, useContext, PropsWithChildren, useState } from 'react';
import { CartItem} from '@/types';
import { randomUUID } from 'expo-crypto';
import { Tables } from '@/database.types';
import { useInsertOrder } from '@/api/orders';
import {  useRouter } from 'expo-router';
import { useInsertOrderItems } from '@/api/order-items';
import { Alert } from 'react-native';

type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem['size']) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
  total: number;
  checkout: () => void
};
type Product = Tables<'products'>;
const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
  checkout: ()=>{}
});

const CartProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const {mutate : inserOrder} = useInsertOrder();
  const {mutate : inserOrderItems} = useInsertOrderItems();
  const router = useRouter();

  const addItem = (product: Product, size: CartItem['size']) => {
    const existingItem = items.find(item => item.product === product && item.size === size

    );
    if(existingItem)
        {
          updateQuantity(existingItem.id,1);
          return;
        }
    const newCartItem: CartItem = {
      id: randomUUID(),
      product,
      product_id: product.id,
      size,
      quantity: 1,
    };

    setItems((prevItems) => [newCartItem, ...prevItems]);
  };

  const updateQuantity = (itemId: string, amount: -1 | 1) => {
    setItems(items.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + amount } : item
      ).filter((item)=> item.quantity > 0)
    );
  };
 const total = items.reduce((sum,item)=>(sum += item.product.price * item.quantity),0);
 const clearCart = () =>{
  setItems([])
 }
 const checkout = async () =>{

  inserOrder({total},{onSuccess: saveOrderItems});
 }
const saveOrderItems = (order : Tables<'orders'>) =>{

  const orderItems = items.map(cartItem =>({
    order_id: order.id,
    product_id: cartItem.product_id,
    quantity:cartItem.quantity,
    size:cartItem.size
  }))

  inserOrderItems(orderItems,
   {
    onSuccess(){
    clearCart();
    router.push(`/(user)/orders/${order.id}`);
    Alert.alert('Thank You!', 'Your Order will Reach You Soon.');
   }
   });

 
}


  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity ,total,checkout}}>
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => useContext(CartContext);

export default CartProvider;

