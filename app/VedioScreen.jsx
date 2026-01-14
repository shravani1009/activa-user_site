import React, { useState, useRef } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Platform, StatusBar, ScrollView } from 'react-native'
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
    router.push('/Quiz/QuizScreen')
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" />
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
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
              onPress={() => router.push('/SettingScreen')}
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
      </ScrollView>
    </SafeAreaView>
  )
}

export default VideoScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    position: 'relative',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerRight: {
    position: 'absolute',
    right: 20,
    top: 65,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
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
    paddingLeft: 28,
    marginBottom: 24,
    marginTop: 20,
  },
  title: {
    fontSize: 30,
    fontStyle: 'semibold',
    fontWeight: '600',
    lineHeight: 23,
    color: '#000000',
    marginBottom: 8,
    fontFamily: Platform.select({
      ios: 'SF Compact Rounded',
      android: 'sans-serif',
      default: 'Arial',
    }),
  },
  subtitle: {
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
    marginTop: 20,
    paddingHorizontal: '15%',
    alignItems: 'center',
  },
  quizButton: {
    width: '100%',
    maxWidth: 287,
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
})

