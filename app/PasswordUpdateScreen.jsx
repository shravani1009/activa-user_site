// PasswordUpdatedScreen.jsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function PasswordUpdatedScreen() {
  const router = useRouter();
  
  // Responsive scaling
  const scaleWidth = SCREEN_WIDTH / 414;
  const scaleHeight = SCREEN_HEIGHT / 896;

  return (
    <View style={styles.container}>
      {/* Checkmark Icon */}
      <Ionicons
        name="checkmark-circle"
        size={52 * scaleWidth}
        color="white"
        style={[styles.icon, { top: 280 * scaleHeight }]}
      />

      {/* Title */}
      <Text style={[styles.title, { fontSize: 24 * scaleWidth, marginTop: 350 * scaleHeight }]}>Password Updated</Text>

      {/* Subtitle */}
      <Text style={[styles.subtitle, { fontSize: 12 * scaleWidth, lineHeight: 18 * scaleHeight, marginTop: 5 * scaleHeight }]}>Your password has been successfully updated.</Text>

      {/* Back Button */}
      <TouchableOpacity
        style={[styles.button, { 
          paddingVertical: 14 * scaleHeight, 
          paddingHorizontal: 40 * scaleWidth, 
          borderRadius: 10 * scaleWidth,
          width: 252 * scaleWidth,
          height: 48 * scaleHeight,
          marginTop: 30 * scaleHeight
        }]}
        onPress={() => router.push('/ProfileScreen')}
      >
        <Text style={[styles.buttonText, { fontSize: 16 * scaleWidth }]}>Back to Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4B0082', 
  },
  icon: {
    position: 'absolute',
    alignSelf: 'center', 
  },
  title: {
    fontFamily: 'SF Compact Rounded',
    fontWeight: '500',
    color: 'white',
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'SF Compact Rounded',
    fontWeight: '500',
    color: 'white',
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'white',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'SF Compact Rounded',
    fontWeight: '600',
    color: '#3E0288',
  },
});
