import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import OrderListItem from '@/components/OrderListItems';
import OrderItemListItem from '@/components/OrderItemListItem';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useOrderDetails } from '@/api/orders'; 
import { useUpdateOrderSubscription } from '@/api/orders/subscription';


const OrdersDetailScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === 'string' ? idString : idString?.[0] ?? '');
  
  const { data: order, isLoading, error } = useOrderDetails(id);
  useUpdateOrderSubscription(id);
  
  const navigation = useNavigation(); // Access navigation object
  
  useEffect(() => {
    if (order) {
      navigation.setOptions({ title: `Order #${order.id}` }); // Set header title dynamically
    }
  }, [order, navigation]);
  
  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />;
  }
  
  if (error || !order) {
    return <Text style={styles.error}>Failed to fetch data.</Text>;
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`Order #${order.id}`}</Text>
      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        keyExtractor={item => item.id.toString()}
        ListFooterComponent={() => <OrderListItem order={order} />}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'red',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default OrdersDetailScreen;
