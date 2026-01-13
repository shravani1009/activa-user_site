import React from 'react'
import { Stack } from 'expo-router'

export default function RootLayout() {
  return (
    <Stack 
      screenOptions={{ 
        headerShown: false,
        contentStyle: {
          backgroundColor: '#fff',
        },
      }}>
      <Stack.Screen name="index" options={{ title: 'Index' }} />
      <Stack.Screen name="login" options={{ title: 'Login' }} />
      <Stack.Screen name="home" options={{title:'Home'}}/>
      <Stack.Screen name="settings" options={{ title: 'Settings', headerShown: false }} />
      <Stack.Screen name="vedio" options={{ title: 'vedio', headerShown: false }} />
      <Stack.Screen name="Quiz/quiz" options={{ title: 'Quiz', headerShown: false }} />
      <Stack.Screen name="profile" options={{ title: 'Profile', headerShown: false }} />
    </Stack>
  );
}
