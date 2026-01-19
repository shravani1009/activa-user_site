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
  const showOnScreens = ['/HomeScreen']
  if (!showOnScreens.includes(pathname)) {
    return null
  }

  const isHomeScreen = pathname === '/HomeScreen'
  const isProfileScreen = pathname === '/ProfileScreen'

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: 'home',
      activeIcon: 'home',
      route: '/HomeScreen',
      isActive: isHomeScreen,
    },
    {
      id: 'progress',
      label: 'Progress',
      icon: 'stats-chart-outline',
      activeIcon: 'stats-chart',
      route: null, // Add route when Progress screen is created
      isActive: false,
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: 'person-outline',
      activeIcon: 'person',
      route: '/ProfileScreen',
      isActive: isProfileScreen,
    },
  ]

  return (
    <View style={[styles.bottomNav, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      {navItems.map((item) => {
        const iconName = item.isActive ? item.activeIcon : item.icon
        const iconColor = item.isActive ? '#3E0288' : '#6B7280'
        const labelColor = item.isActive ? '#3E0288' : '#6B7280'

        const handlePress = () => {
          if (item.route && !item.isActive) {
            router.push(item.route)
          }
        }

        return (
          <TouchableOpacity
            key={item.id}
            style={styles.navItem}
            onPress={handlePress}
            activeOpacity={0.7}
            disabled={item.isActive}
          >
            <Ionicons name={iconName} size={24} color={iconColor} />
            <Text style={[styles.navLabel, { color: labelColor }]}>{item.label}</Text>
          </TouchableOpacity>
        )
      })}
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
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    paddingTop: 8,
    paddingHorizontal: 8,
    minHeight: 60,
    ...Platform.select({
      web: {
        boxShadow: '0 -1px 3px rgba(0, 0, 0, 0.1)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 8,
      },
    }),
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    minHeight: 50,
  },
  navLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 4,
    textAlign: 'center',
  },
})
