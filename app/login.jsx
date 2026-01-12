import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions, Platform } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

const login = () => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('Email')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Section - Purple Background */}
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
        
        {/* Welcome Text */}
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeTitle}>Welcome Back</Text>
          <Text style={styles.welcomeSubtitle}>
            It's great to see you again. Let's pick up where we left off!
          </Text>
        </View>
      </View>
      
      {/* Bottom Section - White Background with Login Form */}
      <View style={styles.bottomSection}>
        <Text style={styles.loginTitle}>Log In</Text>
        
        {/* Email/Phone Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Email' && styles.activeTab]}
            onPress={() => setActiveTab('Email')}
          >
            <Text style={[styles.tabText, activeTab === 'Email' && styles.activeTabText]}>
              Email
            </Text>
            {activeTab === 'Email' && <View style={styles.tabUnderline} />}
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Phone' && styles.activeTab]}
            onPress={() => setActiveTab('Phone')}
          >
            <Text style={[styles.tabText, activeTab === 'Phone' && styles.activeTabText]}>
              Phone
            </Text>
            {activeTab === 'Phone' && <View style={styles.tabUnderline} />}
          </TouchableOpacity>
        </View>
        
        {/* Input Fields */}
        <View style={styles.inputContainer}>
          {activeTab === 'Email' ? (
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <View style={styles.inputFieldContainer}>
                <TextInput
                  style={styles.inputField}
                  placeholder="Enter your email"
                  placeholderTextColor="#9CA3AF"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <Ionicons name="mail-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
              </View>
            </View>
          ) : (
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Phone Number</Text>
              <View style={styles.inputFieldContainer}>
                <TextInput
                  style={styles.inputField}
                  placeholder="Enter your phone"
                  placeholderTextColor="#9CA3AF"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                />
                <Ionicons name="call-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
              </View>
            </View>
          )}
          
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.inputFieldContainer}>
              <TextInput
                style={styles.inputField}
                placeholder="Enter your password"
                placeholderTextColor="#9CA3AF"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.inputIcon}
              >
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color="#9CA3AF"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
        {/* Remember Me and Forgot Password */}
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={styles.rememberMeContainer}
            onPress={() => setRememberMe(!rememberMe)}
          >
            <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
              {rememberMe && <Ionicons name="checkmark" size={14} color="#fff" />}
            </View>
            <Text style={styles.rememberMeText}>Remember Me</Text>
          </TouchableOpacity>
          
          <TouchableOpacity>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        
        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Log in</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topSection: {
    flex: 0.4,
    backgroundColor: '#3E0288',
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
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
    backgroundColor: '#A78BFA',
    opacity: 0.2,
  },
  gridLineHorizontal: {
    position: 'absolute',
    width: '100%',
    height: 1,
    backgroundColor: '#A78BFA',
    opacity: 0.2,
  },
  welcomeContainer: {
    alignItems: 'center',
    zIndex: 1,
  },
  welcomeTitle: {
    fontSize: 40,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 12,
    fontFamily: 'Jura',
  },
  welcomeSubtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#fff',
    textAlign: 'center',
    lineHeight: 22,
    opacity: 0.9,
  },
  bottomSection: {
    flex: 0.6,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 32,
    marginTop: -20,
    zIndex: 1,
  },
  loginTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 24,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tab: {
    flex: 1,
    paddingBottom: 12,
    alignItems: 'center',
  },
  activeTab: {
    position: 'relative',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#9CA3AF',
  },
  activeTabText: {
    color: '#1F2937',
    fontWeight: '600',
  },
  tabUnderline: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#3E0288',
  },
  inputContainer: {
    marginBottom: 12,
  },
  inputWrapper: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 8,
  },
  inputFieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
  },
  inputField: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: '#1F2937',
    paddingVertical: 0,
  },
  inputIcon: {
    marginLeft: 8,
    padding: 4,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderRadius: 4,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#3E0288',
    borderColor: '#3E0288',
  },
  rememberMeText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#1F2937',
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#3E0288',
  },
  loginButton: {
    backgroundColor: '#3E0288',
    borderRadius: 8,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    ...Platform.select({
      web: {
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      },
    }),
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#1F2937',
  },
  signUpLink: {
    fontSize: 14,
    fontWeight: '500',
    color: '#3E0288',
  },
})
