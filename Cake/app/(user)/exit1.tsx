
import React from 'react';
import { Alert, BackHandler, View, Button, StyleSheet } from 'react-native';
import { useAuth } from '../providers/AuthProvider';
import { Redirect } from 'expo-router';


const AppExitConfirmation = () => {
  const handleExit = () => {
    Alert.alert(
      'Exit App',
      'Are you sure you want to exit the app?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Exit', onPress: () => BackHandler.exitApp() },
      ],
      { cancelable: false }
    );
  };
  
  const isAdmin = useAuth();
 if(isAdmin.isAdmin)
  {
    console.log(isAdmin.isAdmin);
    return<Redirect href={'/'}/>
  }
  return (
    <View style={styles.container}>
      <Button title="Exit App" onPress={handleExit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppExitConfirmation;
