import {FlatList} from 'react-native';
import ProductList from '@/components/ProductList';
import { useProductList } from '@/api/products';
import { ActivityIndicator } from 'react-native';
import { Text } from 'react-native-elements';
import { Redirect } from 'expo-router';
import { useAuth } from '@/app/providers/AuthProvider';



export default function MenuScreen() {
    
  const {isAdmin} = useAuth();
   if(!isAdmin){
    return <Redirect href={'/(admin)/menu/'} />;
   }

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


