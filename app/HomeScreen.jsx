import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions, Platform } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

const { width } = Dimensions.get('window')

const HomeScreen = () => {
  const router = useRouter()
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello Alex,</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/SettingScreen')}>
              <Ionicons name="settings-outline" size={24} color="#3E0288" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/NotificationScreen')}>
              <Ionicons name="notifications-outline" size={24} color="#3E0288" />
            </TouchableOpacity>
          </View>
          <Text style={styles.subtitle}>Complete all sections to finish your onboarding process</Text>
        </View>

        {/* Overall Progress Card */}
        <View style={styles.progressCard}>
          <Text style={styles.progressCardText}>You have completed 1 of 5 modules.</Text>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBarFill, { width: '30%' }]} />
            <View style={styles.progressBarEmpty} />
          </View>
          <View style={styles.progressInfo}>
            <Text style={styles.progressLabel}>Progress</Text>
            <Text style={styles.progressPercentage}>30%</Text>
          </View>
        </View>

        {/* Your Onboarding Plan Section */}
        <Text style={styles.sectionTitle}>Your Onboarding Plan</Text>

        {/* Module 1: Company Vision & Mission */}
        <TouchableOpacity 
          style={[styles.moduleCard, styles.moduleCard1]}
          onPress={() => router.push('/VideoScreen')}
          activeOpacity={0.7}
        >
          <View style={styles.moduleHeader}>
            <View style={styles.moduleTextContainer}>
              <Text style={styles.moduleTitle}>Company Vision & Mission</Text>
              <Text style={styles.moduleDescription}>Watch the video and complete the quiz to continue</Text>
            </View>
            <TouchableOpacity style={styles.moduleIconButton}>
              <Ionicons name="arrow-up-outline" size={20} color="#3E0288" />
            </TouchableOpacity>
          </View>
          <View style={styles.moduleProgressBarContainer}>
            <View style={[styles.moduleProgressBarFill, { width: '50%' }]} />
            <View style={styles.moduleProgressBarEmpty} />
          </View>
          <View style={styles.moduleProgressInfo}>
            <Text style={styles.moduleProgressLabel}>Progress</Text>
            <Text style={styles.moduleProgressPercentage}>50%</Text>
          </View>
        </TouchableOpacity>

        {/* Module 2: Company Culture & Values */}
        <View style={[styles.moduleCard, styles.moduleCard2]}>
          <View style={styles.moduleHeader}>
            <View style={styles.moduleTextContainer}>
              <Text style={styles.moduleTitle}>Company Culture & Values</Text>
              <Text style={styles.moduleDescription}>Watch the video and complete the quiz to continue</Text>
            </View>
            <TouchableOpacity style={styles.moduleIconButton}>
              <Ionicons name="arrow-up-outline" size={20} color="#3E0288" />
            </TouchableOpacity>
          </View>
          <View style={styles.moduleProgressBarContainer}>
            <View style={[styles.moduleProgressBarFill, { width: '30%' }]} />
            <View style={styles.moduleProgressBarEmpty} />
          </View>
          <View style={styles.moduleProgressInfo}>
            <Text style={styles.moduleProgressLabel}>Progress</Text>
            <Text style={styles.moduleProgressPercentage}>30%</Text>
          </View>
        </View>

        {/* Module 3: Company Rules & Policy (Locked) */}
        <View style={[styles.moduleCard, styles.moduleCard3]}>
          <View style={styles.moduleHeader}>
            <View style={styles.moduleTextContainer}>
              <Text style={styles.moduleTitle}>Company Rules & Policy</Text>
              <Text style={styles.moduleDescription}>Watch the video and complete the quiz to continue</Text>
            </View>
            <TouchableOpacity style={styles.moduleIconButton} disabled>
              <Ionicons name="lock-closed-outline" size={20} color="#3E0288" />
            </TouchableOpacity>
          </View>
          <View style={styles.moduleProgressBarContainer}>
            <View style={styles.moduleProgressBarEmpty} />
          </View>
          <View style={styles.moduleProgressInfo}>
            <Text style={styles.moduleProgressLabel}>Locked</Text>
            <Text style={styles.moduleProgressPercentage}>0%</Text>
          </View>
        </View>

        {/* Bottom spacing for navigation bar */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    position: 'relative',
    marginBottom: 20,
  },
  greeting: {
    // position: 'absolute',
    left: 14,
    top: 40,
    width: 141,
    height: 23,
    fontSize: 30,
    fontWeight: '600',
    color: '#000000',
    lineHeight: 23,
    letterSpacing: 0,
    fontFamily: 'SF Compact Rounded',
    textAlignVertical: 'center',
  },
  subtitle: {
    position: 'absolute',
    left: 14,
    right: 14,
    top: 78,
    fontSize: 16,
    fontWeight: 'regular',
    color: '#686D76',
    lineHeight: 19,
    letterSpacing: 0,
    fontFamily: 'SF Compact Rounded',
    textAlignVertical: 'center',
  },
  headerRight: {
    position: 'absolute',
    right: 20,
    top: 35,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    width: 38,
    height: 38,
    // borderRadius: 20,
    // borderWidth: 1.5,
    borderColor: '#3E0288',
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  progressCard: {
    position: 'absolute',
    top: 168,
    left: 17,
    right: 17,
    height: 118,
    backgroundColor: '#3E0288',
    borderRadius: 23,
    borderTopWidth: 2,
    borderRightWidth: 5,
    borderBottomWidth: 5,
    borderLeftWidth: 2,
    borderStyle: 'solid',
    borderColor: '#000000',
    padding: 20,
  },
  progressCardText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  progressBarContainer: {
    flexDirection: 'row',
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    marginBottom: 12,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  progressBarEmpty: {
    flex: 1,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressLabel: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
  progressPercentage: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  sectionTitle: {
    position: 'absolute',
    left: 23,
    right: 23,
    top: 310,
    fontSize: 16,
    fontWeight: '400',
    fontStyle: 'normal',
    color: '#6B7280',
    lineHeight: 19,
    letterSpacing: 0,
    fontFamily: 'SF Compact Rounded',
    textAlignVertical: 'center',
  },
  moduleCard: {
    position: 'absolute',
    left: 19,
    right: 19,
    height: 125,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 16,
  },
  moduleCard1: {
    top: 337,
  },
  moduleCard2: {
    top: 482,
  },
  moduleCard3: {
    top: 627,
  },
  moduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  moduleTextContainer: {
    flex: 1,
    marginRight: 12,
  },
  moduleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  moduleDescription: {
    fontSize: 12,
    color: '#9CA3AF',
    lineHeight: 16,
  },
  moduleIconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#3E0288',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moduleProgressBarContainer: {
    flexDirection: 'row',
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    marginBottom: 8,
    overflow: 'hidden',
  },
  moduleProgressBarFill: {
    height: '100%',
    backgroundColor: '#3E0288',
    borderRadius: 3,
  },
  moduleProgressBarEmpty: {
    flex: 1,
    height: '100%',
    backgroundColor: '#E5E7EB',
  },
  moduleProgressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moduleProgressLabel: {
    fontSize: 12,
    color: '#1F2937',
    fontWeight: '500',
  },
  moduleProgressPercentage: {
    fontSize: 12,
    color: '#1F2937',
    fontWeight: '600',
  },
  bottomSpacing: {
    height: 100,
  },
})
