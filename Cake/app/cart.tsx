import { View, Text ,Platform,FlatList} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {  useCart} from './providers/CartProvider';
import CartListItem from '@/components/CartListItems';
import Button from '@/components/Button';


const CartScreen = () => {
  const { items, total, checkout } =useCart();
  return (
    <View style={{padding: 10}}>
     <FlatList
        data={items} renderItem={({item})=><CartListItem cartItem={item}/>}
        contentContainerStyle={{padding:10,gap :10}}
     />
      <Text style={{color:'black',marginTop:20,fontSize:20,fontWeight:'500'}}>Total: ${total}</Text>
       <Button onPress={checkout} text="CheckOut"/>

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
};

export default CartScreen;