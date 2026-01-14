import React from 'react'
import { Stack, useRouter, usePathname } from 'expo-router'
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context'

function BottomNavigator() {
  const router = useRouter()
  const pathname = usePathname()
  const insets = useSafeAreaInsets()

  // Show bottom nav ONLY on these screens
<<<<<<< Updated upstream
  const showOnScreens = ['/HomeScreen',]
=======
  const showOnScreens = ['/HomeScreen']
>>>>>>> Stashed changes
  if (!showOnScreens.includes(pathname)) {
    return null
  }

  const isHomeScreen = pathname === '/HomeScreen'

  return (
    <View style={[styles.bottomNav, { bottom: Math.max(insets.bottom, 20) }]}>
      <TouchableOpacity 
        style={styles.navItem}
        onPress={() => router.push('/HomeScreen')}
      >
        <Ionicons name="home" size={24} color="#fff" />
        {isHomeScreen && <View style={styles.navDot} />}
        <Text style={styles.navLabel}>Home</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.navItem}>
        <Ionicons name="stats-chart-outline" size={24} color="#fff" />
        <Text style={styles.navLabel}>Progress</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.navItem} 
        onPress={() => router.push('/ProfileScreen')}
      >
        <Ionicons name="person-outline" size={24} color="#fff" />
        <Text style={styles.navLabel}>Profile</Text>
      </TouchableOpacity>
    </View>
  )
}
  
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack 
        screenOptions={{ 
          headerShown: false,
          contentStyle: {
            backgroundColor: '#fff',
          },
        }}>
        <Stack.Screen name="index" options={{ title: 'Index' }} />
        <Stack.Screen name="LoginScreen" options={{ title: 'Login' }} />
        <Stack.Screen name="HomeScreen" options={{title:'Home'}}/>
        <Stack.Screen name="SettingScreen" options={{ title: 'Settings', headerShown: false }} />
        <Stack.Screen name="VideoScreen" options={{ title: 'vedio', headerShown: false }} />
        <Stack.Screen name="Quiz/QuizScreen" options={{ title: 'Quiz', headerShown: false }} />
        <Stack.Screen name="ProfileScreen" options={{ title: 'Profile', headerShown: false }} />
        <Stack.Screen name="ChangePasswordScreen" options={{ title: 'Change Password', headerShown: false }} />
        <Stack.Screen name="NotificationScreen" options={{ title: 'Notification', headerShown: false }} />
        <Stack.Screen name="PasswordUpdateScreen" options={{ title: 'Password Update', headerShown: false }} />
        <Stack.Screen name="ForgetPasswordScreen" options={{ title: 'Forget Password', headerShown: false }} />
      </Stack>
      <BottomNavigator />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    position: 'absolute',
    left: '15%',
    right: '15%',
    height: 60,
    backgroundColor: '#3E0288',
    borderRadius: 244,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
    ...Platform.select({
      web: {
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
      },
    }),
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#fff',
    marginTop: 4,
    marginBottom: 2,
  },
  navLabel: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
  },
})
