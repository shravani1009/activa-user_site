// PasswordUpdatedScreen.jsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function PasswordUpdatedScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Checkmark Icon */}
      <Ionicons
        name="checkmark-circle"
        size={52} // exact width & height
        color="white"
        style={styles.icon}
      />

      {/* Title */}
      <Text style={styles.title}>Password Updated</Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>Your password has been successfully updated.</Text>

      {/* Back Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/ProfileScreen')}
      >
        <Text style={styles.buttonText}>Back to Profile</Text>
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
    top: 268, 
    
    left: 171,
  },
  title: {
    fontFamily: 'SF Compact Rounded',
    fontWeight: '500',
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    marginTop: 350, 
  },
  subtitle: {
    fontFamily: 'SF Compact Rounded',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 18,
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 40,
  },
  buttonText: {
    fontFamily: 'SF Compact Rounded',
    fontSize: 16,
    fontWeight: '600',
    color: '#4B0082',
  },
});
