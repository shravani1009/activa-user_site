import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Platform, StatusBar, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Video, ResizeMode } from 'expo-av'
import * as ScreenOrientation from 'expo-screen-orientation'

const { width, height } = Dimensions.get('window')

const VideoScreen = () => {
  const router = useRouter()
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isVideoCompleted, setIsVideoCompleted] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [activeTab, setActiveTab] = useState('transcript')
  const [screenDimensions, setScreenDimensions] = useState(Dimensions.get('screen'))
  const [playbackStatus, setPlaybackStatus] = useState({
    positionMillis: 0,
    durationMillis: 0,
    isLoaded: false,
  })
  const [showCaptions, setShowCaptions] = useState(true)
  const controlsTimeoutRef = useRef(null)
  const isManuallyToggling = useRef(false)

  useEffect(() => {
    // Auto-hide controls after 3 seconds when playing
    if (isPlaying && showControls) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false)
      }, 3000)
    }
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
    }
  }, [isPlaying, showControls])

  useEffect(() => {
    // Listen for dimension changes (orientation changes)
    const checkOrientation = async () => {
      // Don't interfere if we're manually toggling fullscreen
      if (isManuallyToggling.current) {
        return
      }
      
      try {
        const orientation = await ScreenOrientation.getOrientationAsync()
        const isLandscape = 
          orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
          orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT
        
        if (isLandscape && !isFullscreen) {
          setIsFullscreen(true)
        } else if (!isLandscape && isFullscreen) {
          setIsFullscreen(false)
        }
      } catch (error) {
        // Ignore orientation check errors
      }
    }

    const subscription = Dimensions.addEventListener('change', ({ screen }) => {
      setScreenDimensions(screen)
      checkOrientation()
    })
    return () => subscription?.remove()
  }, [isFullscreen])

  const formatTime = (millis) => {
    if (!millis) return '00:00'
    const totalSeconds = Math.floor(millis / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }

  const handlePlayPause = async () => {
    if (videoRef.current) {
      if (isPlaying) {
        await videoRef.current.pauseAsync()
        setIsPlaying(false)
      } else {
        await videoRef.current.playAsync()
        setIsPlaying(true)
      }
      setShowControls(true)
    }
  }

  const handleSeek = async (position) => {
    if (videoRef.current && playbackStatus.isLoaded) {
      await videoRef.current.setPositionAsync(position)
    }
  }

  const handleRewind = async () => {
    if (videoRef.current && playbackStatus.isLoaded) {
      const newPosition = Math.max(0, playbackStatus.positionMillis - 10000) // Rewind 10 seconds
      await videoRef.current.setPositionAsync(newPosition)
    }
  }

  const handleFastForward = async () => {
    if (videoRef.current && playbackStatus.isLoaded) {
      const newPosition = Math.min(
        playbackStatus.durationMillis,
        playbackStatus.positionMillis + 10000
      ) // Fast forward 10 seconds
      await videoRef.current.setPositionAsync(newPosition)
    }
  }

  const handleVideoEnd = () => {
    setIsVideoCompleted(true)
    setIsPlaying(false)
    setShowControls(true)
  }

  const toggleControls = () => {
    setShowControls(!showControls)
  }

  const handleFullscreen = async () => {
    isManuallyToggling.current = true
    try {
      if (!isFullscreen) {
        // Enter fullscreen (landscape)
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
        setIsFullscreen(true)
        setShowControls(true)
      } else {
        // Exit fullscreen (portrait) - unlock first, then lock to portrait
        await ScreenOrientation.unlockAsync()
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
        setIsFullscreen(false)
        setShowControls(true)
      }
    } catch (error) {
      console.log('Error changing orientation:', error)
      // Fallback: unlock and toggle state if orientation lock fails
      try {
        await ScreenOrientation.unlockAsync()
      } catch (unlockError) {
        console.log('Error unlocking orientation:', unlockError)
      }
      setIsFullscreen(false)
      setShowControls(true)
    } finally {
      // Reset the flag after a short delay to allow orientation to settle
      setTimeout(() => {
        isManuallyToggling.current = false
      }, 500)
    }
  }


  // Cleanup orientation lock on unmount
  useEffect(() => {
    return () => {
      ScreenOrientation.unlockAsync().catch(() => {})
    }
  }, [])

  const handleNext = () => {
    // Navigate to next screen or quiz
    router.push('/Quiz/QuizScreen')
  }

  // Sample video details data
  const videoDetails = {
    title: "Setting up your ML application",
    course: "Improving Deep Neural Networks: Hyperparameter Tuning, Regularization and Optimization",
    transcript: [
      { time: "00:00", text: "Welcome to this course on the practical aspects of deep learning. Perhaps now you've learned how to implement a neural network. In this week, you'll learn the practical aspects of how to make your neural network work well." },
      { time: "00:12", text: "Ranging from things like hyperparameter tuning to how to set up your data, to how to make sure your optimization algorithm runs quickly so that you get your learning algorithm to learn in a reasonable amount of time." },
      { time: "00:24", text: "In this first week, we'll first talk about how the cellular machine learning problem, then we'll talk about randomization, then we'll talk about some tricks for making sure your neural network implementation is correct. With that, let's get started." },
      { time: "00:36", text: "Making good choices in how you set up your training, development, and test sets can make a huge difference in helping you quickly find a good high-performance neural network. When training a neural network, you have to make a lot of decisions, such as how many layers will your neural network have?" },
    ],
    notes: "Key points: Setting up training/dev/test sets is crucial for neural network performance. Consider the number of layers, learning rate, and other hyperparameters.",
    summary: "This lecture covers the importance of properly setting up training, development, and test sets for machine learning applications. It emphasizes how good choices in data setup can significantly impact neural network performance."
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'transcript':
        return (
          <View style={styles.tabContent}>
            {videoDetails.transcript.map((item, index) => (
              <View key={index} style={styles.transcriptItem}>
                <Text style={styles.transcriptTime}>{item.time}</Text>
                <Text style={styles.transcriptText}>{item.text}</Text>
              </View>
            ))}
          </View>
        )
      case 'notes':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.tabContentText}>{videoDetails.notes}</Text>
          </View>
        )
      case 'summary':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.tabContentText}>{videoDetails.summary}</Text>
          </View>
        )
      default:
        return null
    }
  }

  return (
    <SafeAreaView style={[styles.container, isFullscreen && styles.containerFullscreen]} edges={[]}>
      <StatusBar 
        barStyle={isFullscreen ? "light-content" : "dark-content"} 
        hidden={isFullscreen}
      />
      
      {/* Video Player Section - At the top */}
      <View style={[
        styles.videoContainer, 
        isFullscreen && {
          ...styles.videoContainerFullscreen,
          width: screenDimensions.width,
          height: screenDimensions.height,
        }
      ]}>
        <TouchableOpacity 
          style={styles.videoTouchable}
          activeOpacity={1}
          onPress={toggleControls}
        >
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
              if (status.isLoaded) {
                setPlaybackStatus({
                  positionMillis: status.positionMillis || 0,
                  durationMillis: status.durationMillis || 0,
                  isLoaded: true,
                })
              }
              if (status.didJustFinish) {
                handleVideoEnd()
              }
            }}
          />
        </TouchableOpacity>
        
        {/* Video Controls Overlay */}
        {showControls && (
          <SafeAreaView 
            style={styles.controlsOverlay}
            edges={isFullscreen ? ['top', 'bottom', 'left', 'right'] : []}
          >
            {/* Top Bar Controls */}
            <View style={[styles.topControlsBar, isFullscreen && styles.topControlsBarFullscreen]}>
              <TouchableOpacity 
                style={styles.topControlButton}
                onPress={() => router.back()}
                activeOpacity={0.7}
              >
                <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
              </TouchableOpacity>
              
              <View style={styles.topControlsRight}>
                <TouchableOpacity 
                  style={styles.topControlButton}
                  onPress={() => setShowCaptions(!showCaptions)}
                  activeOpacity={0.7}
                >
                  <Ionicons name="text-outline" size={22} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.topControlButton}
                  activeOpacity={0.7}
                >
                  <Ionicons name="cast-outline" size={22} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.topControlButton}
                  onPress={() => router.push('/SettingScreen')}
                  activeOpacity={0.7}
                >
                  <Ionicons name="settings-outline" size={22} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Center Controls */}
            <View style={styles.centerControls}>
              <TouchableOpacity 
                style={styles.centerControlButton}
                onPress={handleRewind}
                activeOpacity={0.7}
              >
                <Ionicons name="play-skip-back" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.centerPlayButton}
                onPress={handlePlayPause}
                activeOpacity={0.8}
              >
                <View style={styles.playButtonCircle}>
                  <Ionicons 
                    name={isPlaying ? "pause" : "play"} 
                    size={32} 
                    color="#000" 
                  />
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.centerControlButton}
                onPress={handleFastForward}
                activeOpacity={0.7}
              >
                <Ionicons name="play-skip-forward" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            {/* Bottom Controls Bar */}
            <View style={[styles.bottomControlsBar, isFullscreen && styles.bottomControlsBarFullscreen]}>
              <View style={styles.progressContainer}>
                <TouchableOpacity
                  style={styles.progressBar}
                  activeOpacity={1}
                  onPress={(e) => {
                    if (playbackStatus.durationMillis > 0) {
                      const { locationX } = e.nativeEvent
                      const progressBarWidth = width - 16 - 24 // container width minus padding and fullscreen button
                      const percentage = Math.max(0, Math.min(1, locationX / progressBarWidth))
                      const newPosition = percentage * playbackStatus.durationMillis
                      handleSeek(newPosition)
                    }
                  }}
                >
                  <View 
                    style={[
                      styles.progressFill,
                      {
                        width: playbackStatus.durationMillis > 0
                          ? `${(playbackStatus.positionMillis / playbackStatus.durationMillis) * 100}%`
                          : '0%'
                      }
                    ]}
                  />
                  <View
                    style={[
                      styles.progressThumb,
                      {
                        left: playbackStatus.durationMillis > 0
                          ? `${(playbackStatus.positionMillis / playbackStatus.durationMillis) * 100}%`
                          : '0%'
                      }
                    ]}
                  />
                </TouchableOpacity>
                <View style={styles.timeContainer}>
                  <Text style={styles.timeText}>
                    {formatTime(playbackStatus.positionMillis)} / {formatTime(playbackStatus.durationMillis)}
                  </Text>
                </View>
              </View>
              
              <TouchableOpacity 
                style={styles.fullscreenButton}
                onPress={handleFullscreen}
                activeOpacity={0.7}
              >
                <Ionicons 
                  name={isFullscreen ? "contract" : "expand"} 
                  size={24} 
                  color="#FFFFFF" 
                />
              </TouchableOpacity>
            </View>

            {/* Captions */}
      
          </SafeAreaView>
        )}
      </View>

      {/* Video Details Section */}
      {!isFullscreen && (
        <ScrollView 
          style={styles.detailsScrollView}
          contentContainerStyle={styles.detailsContent}
          showsVerticalScrollIndicator={false}
        >
        {/* Video Title */}
        <View style={styles.detailsHeader}>
          <Text style={styles.videoTitle}>{videoDetails.title}</Text>
          <Text style={styles.courseName}>{videoDetails.course}</Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'transcript' && styles.activeTab]}
            onPress={() => setActiveTab('transcript')}
          >
            <Text style={[styles.tabText, activeTab === 'transcript' && styles.activeTabText]}>
              Transcript
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'notes' && styles.activeTab]}
            onPress={() => setActiveTab('notes')}
          >
            <Text style={[styles.tabText, activeTab === 'notes' && styles.activeTabText]}>
              Notes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'summary' && styles.activeTab]}
            onPress={() => setActiveTab('summary')}
          >
            <Text style={[styles.tabText, activeTab === 'summary' && styles.activeTabText]}>
              Summary
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {renderTabContent()}
        </ScrollView>
      )}

      {/* Next Button - Fixed at bottom */}
      {!isFullscreen && (
        <SafeAreaView style={styles.nextButtonContainer} edges={['bottom']}>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNext}
            activeOpacity={0.7}
          >
            <Text style={styles.nextButtonText}>Next</Text>
            <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </SafeAreaView>
      )}
    </SafeAreaView>
  )
}

export default VideoScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  containerFullscreen: {
    backgroundColor: '#000000',
    width: '100%',
    height: '100%',
  },
  videoContainer: {
    width: width,
    height: width * 0.75, // Increased height for larger video player
    alignSelf: 'center',
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#000',
  },
  videoContainerFullscreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 9999,
  },
  videoTouchable: {
    width: '100%',
    height: '100%',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  controlsOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  topControlsBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingBottom: 16,
  },
  topControlsBarFullscreen: {
    paddingTop: Platform.OS === 'ios' ? 10 : 10,
  },
  topControlsRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  topControlButton: {
    width: 50,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 18,
    paddingBottom: 4,
  },
  centerControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
    flex: 1,
  },
  centerControlButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerPlayButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButtonCircle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  bottomControlsBar: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === 'ios' ? 20 : 16,
    paddingTop: 12,
    gap: 12,
  },
  bottomControlsBarFullscreen: {
    paddingBottom: Platform.OS === 'ios' ? 10 : 10,
  },
  progressContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 18,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    position: 'relative',
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3E0288',
    borderRadius: 2,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  progressThumb: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#3E0288',
    position: 'absolute',
    top: -4,
    marginLeft: -6,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  timeText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontFamily: Platform.select({
      ios: 'SF Compact Rounded',
      android: 'sans-serif',
      default: 'Arial',
    }),
  },
  fullscreenButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 3,
  },
  captionsContainer: {
    position: 'absolute',
    bottom: 60,
    left: 16,
    right: 16,
    alignItems: 'center',
  },
  captionText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    fontFamily: Platform.select({
      ios: 'SF Compact Rounded',
      android: 'sans-serif',
      default: 'Arial',
    }),
  },
  detailsScrollView: {
    flex: 1,
  },
  detailsContent: {
    paddingBottom: 100,
  },
  detailsHeader: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  videoTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
    fontFamily: Platform.select({
      ios: 'SF Compact Rounded',
      android: 'sans-serif',
      default: 'Arial',
    }),
  },
  courseName: {
    fontSize: 14,
    lineHeight: 20,
    color: '#686D76',
    fontWeight: '400',
    fontFamily: Platform.select({
      ios: 'SF Compact Rounded',
      android: 'sans-serif',
      default: 'Arial',
    }),
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#3E0288',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#686D76',
    fontFamily: Platform.select({
      ios: 'SF Compact Rounded',
      android: 'sans-serif',
      default: 'Arial',
    }),
  },
  activeTabText: {
    color: '#3E0288',
    fontWeight: '600',
  },
  tabContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  transcriptItem: {
    marginBottom: 20,
  },
  transcriptTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3E0288',
    marginBottom: 8,
    fontFamily: Platform.select({
      ios: 'SF Compact Rounded',
      android: 'sans-serif',
      default: 'Arial',
    }),
  },
  transcriptText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#000000',
    fontWeight: '400',
    fontFamily: Platform.select({
      ios: 'SF Compact Rounded',
      android: 'sans-serif',
      default: 'Arial',
    }),
  },
  tabContentText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#000000',
    fontWeight: '400',
    fontFamily: Platform.select({
      ios: 'SF Compact Rounded',
      android: 'sans-serif',
      default: 'Arial',
    }),
  },
  nextButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 0 : 10,
    paddingTop: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    ...Platform.select({
      web: {
        boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.1)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 8,
      },
    }),
  },
  nextButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#3E0288',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
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
  nextButtonText: {
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

