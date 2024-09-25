import { View, Text , StyleSheet , Pressable} from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { dimage } from '@/components/ProductList';
import Colors from '@/constants/Colors';
import { useState } from 'react';
import Button from '@/components/Button';
import { useCart } from '@/app/providers/CartProvider';
import { CakeWeight } from '@/types';
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

        addItem(product, selectedWeight);
        router.push('/cart');
  }
  if(isLoading)
    {
      return <ActivityIndicator/>;
    }
if(error)
  {
    return <Text>Failed to Fetch the product</Text>
  }

    return (
      <View style={styles.container}>
        <RemoteImage
          path={product?.image}
          fallback={dimage}
          style={styles.image}
        />
        <Stack.Screen options={{ title: product?.name }} />
        <Text>Select Weight</Text>
        <View style={styles.Weights}>
         {Weigths.map((weight) => (
          <Pressable 
          onPress={() => { setSelectedWeight(weight)}}
          style={[styles.weight, {backgroundColor:selectedWeight === weight ? 'gainsboro': 'white'}]}  key={weight}> 
            <Text style={[styles.weightText, {color:selectedWeight === weight ? 'black': 'gray'}]}>{weight}</Text>
          </Pressable>
         ))}
        </View>
        <Text style={styles.price}>${product?.price}</Text>
        <Button onPress={addToCart} text="Add to cart"/>
      </View>
    );
};
const styles= StyleSheet.create({
  container:{
    backgroundColor:'white',
    flex:1,
    padding:10,
  },
  image:{
   width:'100%',
   aspectRatio:1,
  },
  price:{
    fontWeight: 'bold',
    fontSize:18,
    color: Colors.light.tint,
    marginTop: 'auto',
  },
  Weights:{
         flexDirection:'row',
         justifyContent:'space-around',
          marginVertical:10,
  },
  weight:{
        backgroundColor:"gainsboro",
        width:50,
        aspectRatio:1,
         borderRadius:25,
         alignItems:'center',
         justifyContent:'center',

  },
  weightText:{
    fontSize:15,
    fontWeight:'500',

  }
});
export default ProductDetailsScreen;