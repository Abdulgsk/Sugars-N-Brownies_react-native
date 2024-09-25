import { View, Text, StyleSheet, TextInput, Image ,Alert} from 'react-native'
import React, { useEffect, useState } from 'react'
import Button from '@/components/Button';
import { dimage } from '@/components/ProductList';
import Colors from '@/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { UseProduct, useDeleteProduct, useInsertProduct, useUpdateProduct } from '@/api/products';
import { randomUUID } from 'expo-crypto';
import { supabase } from '@/app/lib/supabase';
import { decode } from 'base64-arraybuffer';
import * as FileSystem from 'expo-file-system'


const CreateProductScreen = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState<string | null>(null);

    const [errors, setErrors] = useState('');
 
    const { id : idString } = useLocalSearchParams();  
    const id = parseFloat(typeof idString === 'string' ? idString : idString?.[0] ?? '');
    const isUpdating = !!idString;

    const { mutate : insertProduct } = useInsertProduct();
    const { mutate : updateProduct } = useUpdateProduct();
    const {data : updatingProduct} = UseProduct(id);
    const {mutate : deleteProduct} = useDeleteProduct();
    console.log(updatingProduct);

    const router = useRouter();

    useEffect(() =>{
        if(updatingProduct)
          {
                 if (updatingProduct.name !== null && updatingProduct.name !== undefined)
                 setName(updatingProduct.name);
                 if (updatingProduct.price !== null && updatingProduct.price !== undefined)
                 setPrice(updatingProduct.price.toString());
                 setImage(updatingProduct.image);
          }
    }, [updatingProduct])

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };

    const resetFields = () =>{
        setName('');
        setPrice('');
    };

    const validateInput = () =>{
        setErrors('');
        if(!name){
            setErrors('Name is Required');
            return false;
        }
        if(!price){
            setErrors('Price is Required');
            return false;
        }
        if(isNaN(parseFloat(price))){
            setErrors('Price is not a Number');
            return false; 
        }
        return true;
    };
    const onSubmit = () =>{
        if(isUpdating)
          {
            onUpdate();
          }
        else{
          onCreate();
        }

    };
    const onCreate = async() => {
      if(!validateInput())
        {
          return;
        }

        const imagePath = await uploadImage();
            insertProduct({name , price: parseFloat(price),image : imagePath},{
              onSuccess: () =>{
                resetFields();
                router.back();
              }
            });
        

    };
    const onUpdate =async () => {
        if(!validateInput())
            {
                return;
            }
            const imagePath = await uploadImage();
        updateProduct(
          {id ,name , price: parseFloat(price),image : imagePath },
          {
            onSuccess: () =>{
              resetFields();
              router.back();

          }
        }
        );
    };
    const onDelete = () =>{
      deleteProduct(id ,{ onSuccess: () =>{
             resetFields();
              router.replace('/(admin)');
      }               
      });
    };
    const confrimDelete =() =>{
            Alert.alert("Confrim","Are You Sure You Want To Delete This Item",[
              {
                text : 'Cancel',
              },
              {
                text : 'Delete',
                style : 'destructive',
                onPress : onDelete,
              }
            ]);
    };

    const uploadImage = async () => {
      if (!image?.startsWith('file://')) {
        return;
      }
    
      const base64 = await FileSystem.readAsStringAsync(image, {
        encoding: 'base64',
      });
      const filePath = `${randomUUID()}.png`;
      const contentType = 'image/png' || 'image/jpg';
      const { data, error } = await supabase.storage
        .from('product_images')
        .upload(filePath, decode(base64), { contentType });
      
        console.log(error);
        if (data) {
        return data.path;
      }
    };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{title: isUpdating? 'Update Item' : "Create Item"}}/>
        <Image source={{uri : image || dimage }} style={styles.image}/>
        <Text onPress={pickImage} style={styles.textButton}>Select Image</Text>
      <Text style={styles.lable}>Name</Text>
      <TextInput 
      value={name}
      onChangeText={setName}
      placeholder='name' style={styles.input}/>
      <Text style={styles.lable}>Price ($)</Text>
      <TextInput 
      value={price}
      onChangeText={setPrice}
      placeholder='9.99' style={styles.input} keyboardType='numeric'/>

      <Text style={{ color:'red'}}>{errors}</Text>
      <Button onPress={onSubmit} text={isUpdating? 'Update' :'Create'}/>
      {isUpdating && <Text onPress={confrimDelete} style={styles.textButton}>Delete</Text>}
    </View>
  )
};
 const styles = StyleSheet.create({
   container:{
    flex:1,
    justifyContent:'center',
    padding: 10,

   },
   input:{
    backgroundColor:'white',
    padding:10,
    borderRadius:5,
    marginTop:5,
    marginBottom:20,
   },
   lable:{
    color : Colors.light.tint,
    fontSize: 16,

   },
   image:{
    aspectRatio:1,
    width: '50%',
    alignSelf: 'center',

   },
   textButton:{
    alignSelf: 'center',
    color: 'gray',
    fontWeight: 'bold',
    marginVertical: 10,
   },
 });
export default CreateProductScreen