import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs, Redirect } from 'expo-router';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useAuth } from '../providers/AuthProvider';


function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={20} style={{ marginBottom: -3, color: props.color }} name={props.name} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { session } = useAuth();
  const isAdmin = useAuth();

  if (!session) {
    return <Redirect href={'sign-in'} />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="cutlery" color={Colors.light.tint} />,
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={Colors.light.tint} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
         // headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={Colors.light.tint} />,
        }}
      />
        <Tabs.Screen
          name="exit1"
          options={{
            title: 'Exit',
            headerShown: false,
            tabBarIcon: ({ color }) => <TabBarIcon name="sign-out" color={Colors.light.tint} />,
          }}
        />
      
    </Tabs>
  );
}
