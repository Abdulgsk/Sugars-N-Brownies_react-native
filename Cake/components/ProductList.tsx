import { StyleSheet, Text, View ,Pressable} from 'react-native';
import Colors from '@/constants/Colors';
import { Link, useSegments } from 'expo-router';
import { Tables } from '@/database.types';
import RemoteImage from './Remoteimage';

type ProductListprop  ={
    product: Tables<'products'>;
}
export const dimage ='https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png'
const ProductList = ( {product}:ProductListprop ) =>{

  const segments =useSegments();
  return (
    <Link href={`/${segments[0]}/menu/${product.id}`} asChild>
     <Pressable style={styles.container}>
    <RemoteImage
        path={product.image}
        fallback={dimage}
        style={styles.image}
        resizeMode='contain'
      />
    <Text style={styles.title}>{product.name}</Text>
    <Text style={styles.price}>{product.price}</Text>
     </Pressable>
    </Link>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  image:{
    width:'100%',
    aspectRatio:1
  },
  container: {
   
    margin: 5,
    color:'white',
    backgroundColor:'white',
    padding:10,
    borderRadius:20,
    flex:1,
    maxWidth:'50%'
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10
  },
  price: {
    fontWeight: 'bold',
    width: '80%',
    color:Colors.light.tint,
    justifyContent:'center',
    alignItems:'center'
  },
});
