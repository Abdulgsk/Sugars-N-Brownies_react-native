import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Redirect, Tabs } from 'expo-router';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useAuth } from '../providers/AuthProvider';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={20} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const{isAdmin} = useAuth();

  if(!isAdmin)
    {
      <Redirect href={'/'}/>
    }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.background,
        tabBarInactiveTintColor: 'gainsboro',
        tabBarStyle:{
          backgroundColor : Colors.light.tint,
        },
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
        <Tabs.Screen name='index' options={{href: null}}/>
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu',
          headerShown: false, 
          tabBarIcon: ({ color }) => <TabBarIcon name="cutlery" color={color=Colors.dark.tint} />,
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color=Colors.dark.tint} />,
        }}
      />
      <Tabs.Screen
        name="exit"
        options={{
          title: 'exit',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="sign-out" color={color=Colors.dark.tint} />,
        }}
      />
    </Tabs>
  );
}
