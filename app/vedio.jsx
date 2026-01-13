import React, { useState, useRef } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Platform, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Video, ResizeMode } from 'expo-av'

const { width } = Dimensions.get('window')

const VideoScreen = () => {
  const router = useRouter()
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isVideoCompleted, setIsVideoCompleted] = useState(false)
  const [showPlayButton, setShowPlayButton] = useState(true)

  const handlePlayPause = async () => {
    if (videoRef.current) {
      if (isPlaying) {
        await videoRef.current.pauseAsync()
        setIsPlaying(false)
        setShowPlayButton(true)
      } else {
        await videoRef.current.playAsync()
        setIsPlaying(true)
        setShowPlayButton(false)
      }
    }
  }

  const handleVideoEnd = () => {
    setIsVideoCompleted(true)
    setIsPlaying(false)
    setShowPlayButton(true)
  }

  const handleTakeQuiz = () => {
    router.push('/Quiz/quiz')
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        
        <View style={styles.headerRight}>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => router.push('/settings')}
          >
            <Ionicons name="settings-outline" size={24} color="#3E0288" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={24} color="#3E0288" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Title Section */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Our Vision</Text>
        <Text style={styles.subtitle}>Complete the video to unlock the quiz</Text>
      </View>

      {/* Video Player Section */}
      <View style={styles.videoContainer}>
        <Video
          ref={videoRef}
          style={styles.video}
          source={{
            uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          }}
          resizeMode={ResizeMode.COVER}
          shouldPlay={false}
          isLooping={false}
          useNativeControls={false}
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              handleVideoEnd()
            }
          }}
        />
        
        {showPlayButton && (
          <TouchableOpacity 
            style={styles.playButtonOverlay}
            onPress={handlePlayPause}
            activeOpacity={0.8}
          >
            <View style={styles.playButtonCircle}>
              <Ionicons name="play" size={40} color="#000" />
            </View>
          </TouchableOpacity>
        )}
      </View>

      {/* Take Quiz Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.quizButton}
          onPress={handleTakeQuiz}
          activeOpacity={0.7}
        >
          <Text style={styles.quizButtonText}>Take Quiz</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.push('/home')}
        >
          
            <Ionicons name="home" size={24} color="#fff" />
            <View style={styles.navDot} />
          
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="stats-chart-outline" size={24} color="#fff" />
          <Text style={styles.navLabel}>Progress</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={24} color="#fff" />
          <Text style={styles.navLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default VideoScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  backButton: {
    top:50,
    // left:2,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerRight: {
    position: 'absolute',
    width: 79,
    height: 38,
    left: 270,
    top: 65,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconButton: {
    width: 38,
    height: 38,
    borderColor: '#3E0288',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  title: {
    fontSize: 30,
    fontStyle: 'semibold',
    fontWeight: '600',
    lineHeight: 23,
    top:46,
    left:8,
    // left:20,
    color: '#000000',
    marginBottom: 8,
    fontFamily: Platform.select({
      ios: 'SF Compact Rounded',
      android: 'sans-serif',
      default: 'Arial',
    }),
  },
  subtitle: {
    top:44,
    left:8,
    fontSize: 16,
    lineHeight: 19,
    color: '#686D76',
    fontWeight: '400',
    fontFamily: Platform.select({
      ios: 'SF Compact Rounded',
      android: 'sans-serif',
      default: 'Arial',
    }),
  },
  videoContainer: {
    top:50,
    width: width - 40,
    height: (width - 40) * 0.5625, // 16:9 aspect ratio
    alignSelf: 'center',
    borderRadius: 12,
    overflow: 'hidden',
    borderTopWidth: 2,
    borderRightWidth: 5,
    borderBottomWidth: 5,
    borderLeftWidth: 2,
    borderColor: '#000000',
    marginBottom: 24,
    position: 'relative',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  playButtonOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  playButtonCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    top: 450,
    left: 53,
  },
  quizButton: {
    width: 287,
    height: 45,
    backgroundColor: '#3E0288',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      web: {
        boxShadow: '0 2px 8px rgba(62, 2, 136, 0.3)',
      },
      default: {
        shadowColor: '#3E0288',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
      },
    }),
  },
  quizButtonDisabled: {
    backgroundColor: '#9CA3AF',
    opacity: 0.6,
  },
  quizButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: Platform.select({
      ios: 'SF Compact Rounded',
      android: 'sans-serif',
      default: 'Arial',
    }),
  },
  bottomNav: {
    position: 'absolute',
    top: 700,
    left: 64,
    width: 265,
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
  navIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  navLabel: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
  },
})

