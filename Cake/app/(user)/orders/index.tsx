import { Text, FlatList } from "react-native";
import OrderListItem from "@/components/OrderListItems";
import { useMytList } from "@/api/orders";
import { ActivityIndicator } from "react-native";

export default function OrdersScreen()  {
  const {data:orders, isLoading ,error} = useMytList();

  if(isLoading)
    {
      return <ActivityIndicator/>
    }
  if(error)
    {
      return <Text>Failed  to fetch</Text>;
    }


  return (
    <FlatList data={orders}
    renderItem={({item})=> <OrderListItem order={item}/>}
    contentContainerStyle={{gap: 10,padding: 10}}
    />
  );
  
};