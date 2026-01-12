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
    </Stack>
  );
}
