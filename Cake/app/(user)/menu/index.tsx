import {View ,FlatList, ActivityIndicator} from 'react-native';
import ProductList from '@/components/ProductList';
import { Text } from 'react-native-elements';
import { useProductList } from '@/api/products';

export default function MenuScreen() {

 const { data ,error ,isLoading} = useProductList();
         if(isLoading)
          {
            return <ActivityIndicator/>;
          }
      if(error)
        {
          return <Text>Failed to Fetch the product</Text>
        }


   return(
    
   <FlatList
    data = {data}
    renderItem={({item}) => <ProductList product={item}/>} numColumns={2} 
    contentContainerStyle={{gap:5,padding:10}}
    columnWrapperStyle={{gap:5}}
    >
   </FlatList>
  );
}


