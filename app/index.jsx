import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Platform } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'

const { width, height } = Dimensions.get('window')

const index = () => {
  const router = useRouter()
  
  return (
    <SafeAreaView style={styles.container}>
      {/* Top Section - Purple Background with Illustration */}
      <View style={styles.topSection}>
        {/* Grid Pattern Background */}
        <View style={styles.gridContainer}>
          {/* Vertical lines */}
          {Array.from({ length: 10 }).map((_, i) => (
            <View
              key={`v-${i}`}
              style={[
                styles.gridLineVertical,
                { left: `${(i + 1) * 10}%` }
              ]}
            />
          ))}
          {/* Horizontal lines */}
          {Array.from({ length: 10 }).map((_, i) => (
            <View
              key={`h-${i}`}
              style={[
                styles.gridLineHorizontal,
                { top: `${(i + 1) * 10}%` }
              ]}
            />
          ))}
        </View>
        
        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Learning</Text>
          <Text style={styles.title}>Journey Loop</Text>
        </View>
        
        {/* Illustration Section */}
        <View style={styles.illustrationContainer}>
          <Image
            source={require('../assets/images/networking.svg')}
            style={styles.illustration}
            contentFit="contain"
          />
        </View>
      </View>
      
      {/* Bottom Section - White Background with CTA */}
      <View style={styles.bottomSection}>
        <Text style={styles.ctaText}>
          Log in or sign up to begin your onboarding process through guided video training.
        </Text>
        <TouchableOpacity
          style={styles.goButton}
          onPress={() => router.push('/LoginScreen')}
        >
          <Text style={styles.goButtonText}>Go</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topSection: {
    flex: 2,
    backgroundColor: '#3E0288', // Dark purple
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 40,
  },
  gridContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  gridLineVertical: {
    position: 'absolute',
    width: 1,
    height: '100%',
    backgroundColor: '#A78BFA', // Lighter purple for grid
    opacity: 0.2,
  },
  gridLineHorizontal: {
    position: 'absolute',
    width: '100%',
    height: 1,
    backgroundColor: '#A78BFA', // Lighter purple for grid
    opacity: 0.2,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Jura',
    
  },
  illustrationContainer: {
    width: width * 0.95,
    height: height * 0.4,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -10,
  },
  illustration: {
    width: '100%',
    height: '100%',
  },
  bottomSection: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -20,
    zIndex: 1,
  },
  ctaText: {
    fontSize: 28,
    fontWeight: '600',
    fontFamily: 'SF Compact Rounded',
    lineHeight: 31,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#3E0288',
    paddingBottom: 20,
  },
  goButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#3E0288',
    borderWidth: 3,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      web: {
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
      },
    }),
  },
  goButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
})