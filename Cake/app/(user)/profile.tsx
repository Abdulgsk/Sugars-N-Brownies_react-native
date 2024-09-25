import React from 'react';
import { Text, View } from '@/components/Themed';
import { supabase } from '../lib/supabase';
import { Button } from 'react-native-elements';
import { Alert, StyleSheet } from 'react-native';

const ProfileScreen = () => {
  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          onPress: async () => {
            await supabase.auth.signOut();
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Button title='Sign Out' onPress={handleSignOut} buttonStyle={styles.signOutButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 60,
    backgroundColor: '#fff', // Adjust background color as needed
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  signOutButton: {
    backgroundColor: '#FF6347', // Adjust button color as needed
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default ProfileScreen;
