import { View, Text , StyleSheet , Pressable} from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { dimage } from '@/components/ProductList';
import Colors from '@/constants/Colors';
import { useState } from 'react';
import { useCart } from '@/app/providers/CartProvider';
import { CakeWeight } from '@/types';
import { Link } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { UseProduct } from '@/api/products';
import { ActivityIndicator } from 'react-native';
import RemoteImage from '@/components/Remoteimage';

const Weigths: CakeWeight[] =['1/2Kg','1Kg','2Kg','5Kg'];


const ProductDetailsScreen = () => {
  const { id : idString } = useLocalSearchParams();  
  const id = parseFloat(typeof idString === 'string' ? idString : idString?.[0] ?? '');

  const {data: product , error , isLoading } = UseProduct(id);
  const {addItem}= useCart();

  const router = useRouter();

 const [ selectedWeight, setSelectedWeight] = useState<CakeWeight>('1Kg');

  const addToCart = () => {
        if(!product)
        return ;

        if(isLoading)
          {
            return <ActivityIndicator/>;
          }
      if(error)
        {
          return <Text>Failed to Fetch the product</Text>
        }
      

        addItem(product, selectedWeight);
       router.push('/cart');
  }
   if(!product)
    {
      return <Text style={{color:'white'}}>!Product Not Found {id}</Text>
    }

    return (
      <View style={styles.container}>
        <Stack.Screen 
         options={{title: 'Menu', 
          headerRight: () => (
           <Link href={`/(admin)/menu/create?id=${id}`} asChild>
             <Pressable>
               {({ pressed }) => (
                <FontAwesome
                name="pencil"
                size={25}
                color={Colors.light.tint}
                style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
              />
               )}
            </Pressable>
          </Link>
                 ),}}/>
        <Stack.Screen options={{ title: product.name }} />
        <RemoteImage
          path={product?.image}
          fallback={dimage}
          style={styles.image}
        />
        <Text style={styles.title}>${product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </View>
    );
     };
const styles= StyleSheet.create({
  container:{
    backgroundColor:'white',
    flex:1,
    padding:10,
  },
  title:{
    fontSize:20,
    fontWeight:'bold',
  },
  image:{
   width:'100%',
   aspectRatio:1,
  },
  price:{
    fontWeight: 'bold',
    fontSize:18,
    color: Colors.light.tint,
  },

});
export default ProductDetailsScreen;