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
  const [activeTab, setActiveTab] = useState('transcript')

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
            onPress={() => router.push('/SettingScreen')}
          >
            <Ionicons name="settings-outline" size={24} color="#3E0288" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={24} color="#3E0288" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Video Player Section - At the top */}
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

      {/* Video Details Section */}
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

      {/* Next Button - Fixed at bottom */}
      <View style={styles.nextButtonContainer}>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNext}
          activeOpacity={0.7}
        >
          <Text style={styles.nextButtonText}>Next</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
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
    paddingTop: Platform.OS === 'ios' ? 10 : 20,
    paddingBottom: 12,
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
    top: Platform.OS === 'ios' ? 10 : 20,
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
  videoContainer: {
    width: width,
    height: width * 0.5625, // 16:9 aspect ratio
    alignSelf: 'center',
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#000',
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
  detailsScrollView: {
    flex: 1,
  },
  detailsContent: {
    paddingBottom: 100,
  },
  detailsHeader: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
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
    paddingTop: 16,
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
    paddingBottom: Platform.OS === 'ios' ? 20 : 30,
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

