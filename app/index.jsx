import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Platform } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'

const { width, height } = Dimensions.get('window')

// Responsive scaling factors 
const scaleWidth = width / 414
const scaleHeight = height / 896

const index = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Section - Purple Background with Illustration */}
      <View style={styles.topSection}>


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
        <View
          style={{
            width: 84 * scaleWidth,             // outer ring diameter
            height: 84 * scaleWidth,
            borderRadius: 42 * scaleWidth,      // make it circular
            borderWidth: 4 * scaleWidth,        // thickness of the purple ring
            borderColor: '#3E0288', // purple color for the outer ring
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            style={styles.goButton}
            onPress={() => router.push('/LoginScreen')}
          >
            <Text style={styles.goButtonText}>Go</Text>
          </TouchableOpacity>
        </View>

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
    paddingTop: 40 * scaleHeight,
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
    marginTop: 10 * scaleHeight,
    alignItems: 'center',
    marginBottom: 25 * scaleHeight,
  },
  title: {
    fontSize: 40 * scaleWidth,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Jura',

  },
  illustrationContainer: {
    width: width * 0.95,
    height: height * 0.42,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -1 * scaleHeight,
  },
  illustration: {
    width: '100%',
    height: '100%',
  },
  bottomSection: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30 * scaleWidth,
    borderTopRightRadius: 30 * scaleWidth,
    paddingHorizontal: 24 * scaleWidth,
    paddingTop: 10 * scaleHeight,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -20 * scaleHeight,
    zIndex: 1,
  },
  ctaText: {
    fontSize: 28 * scaleWidth,
    fontWeight: '600',
    fontFamily: 'SF Compact Rounded',
    lineHeight: 31 * scaleHeight,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#3E0288',
    paddingBottom: 20 * scaleHeight,
  },
  goButton: {
    width: 68 * scaleWidth,
    height: 68 * scaleWidth,
    borderRadius: 36 * scaleWidth,
    backgroundColor: '#3E0288',
    
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      web: {
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 * scaleHeight },
        shadowOpacity: 0.3,
        shadowRadius: 8 * scaleWidth,
        elevation: 8,
      },
    }),
  },
  goButtonText: {
    color: '#fff',
    fontSize: 18 * scaleWidth,
    fontWeight: '600',
  },
})