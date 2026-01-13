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
            <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/settings')}>
              <Ionicons name="settings-outline" size={24} color="#3E0288" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
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
          onPress={() => router.push('/vedio')}
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

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color="#fff" />
          <View style={styles.navDot} />
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="stats-chart-outline" size={24} color="#fff" />
          <Text style={styles.navLabel}>Progress</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/profile')}>
          <Ionicons name="person-outline" size={24} color="#fff" />
          <Text style={styles.navLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
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
    marginBottom: 24,
  },
  greeting: {
    // position: 'absolute',
    left: 14,
    top: 65,
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
    top: 92,
    width: 317,
    height: 57,
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
    width: 353,
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
    width: 317,
    height: 19,
    top: 310,
    left: 23,
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
    width: 354,
    height: 125,
    left: 19,
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
  navLabel: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
  },
})
