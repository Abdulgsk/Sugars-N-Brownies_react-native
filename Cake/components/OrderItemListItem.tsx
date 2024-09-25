import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RemoteImage from './Remoteimage';
import { dimage } from './ProductList';

type OrderItemListItemProps = {
  item: {
    created_at: string | null;
    id: number;
    order_id: number;
    product_id: number;
    quantity: number | null;
    size: string | null;
    products: {
      created_at: string;
      id: number;
      image: string | null;
      name: string;
      price: number;
    } | null; 
  };
};

const OrderItemListItem = ({ item }: OrderItemListItemProps) => {
 
  const { products, quantity } = item;

  if (!products) {
    return null;
  }

  return (
    <View style={styles.container}>
      {products.image && (
        <RemoteImage
          path={products?.image}
          fallback={dimage}
          style={[styles.image, { marginRight: 5 }]} 
        />
      )}
      <View style={styles.textContainer}>
        <Text style={styles.name}>{products.name}</Text>
        <Text style={styles.quantity}>Quantity: {quantity}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8, // Reduce padding for less gap (adjust as needed)
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 5, // Reduce margin for less gap (adjust as needed)
  },
  image: {
    width: 50,
    height: 50,
  },
  textContainer: {
    flex: 1,
    marginLeft: 5, // Introduce a small margin for spacing (optional)
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 3, 
  },
  quantity: {
    fontSize: 14,
  },
});

export default OrderItemListItem;
