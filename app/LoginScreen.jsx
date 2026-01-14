import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions, Platform, Animated, Keyboard } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
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
  const emailShift = useRef(new Animated.Value(0)).current
  const passwordShift = useRef(new Animated.Value(0)).current

  // Reset animations when keyboard is dismissed
  const resetAnimations = () => {
    Animated.parallel([
      Animated.timing(emailShift, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(passwordShift, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start()
  }

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        resetAnimations()
      }
    )

    return () => {
      keyboardDidHideListener.remove()
    }
  }, [])

  const handleEmailFocus = () => {
    Animated.parallel([
      Animated.timing(emailShift, {
        toValue: -10,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(passwordShift, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start()
  }

  const handleEmailBlur = () => {
    Animated.timing(emailShift, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start()
  }

  const handlePasswordFocus = () => {
    Animated.parallel([
      Animated.timing(emailShift, {
        toValue: -30,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(passwordShift, {
        toValue: -55,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start()
  }

  const handlePasswordBlur = () => {
    Animated.parallel([
      Animated.timing(emailShift, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(passwordShift, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start()
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Top Section - Purple Background */}
      <View style={styles.topSection}>
        {/* Grid Pattern Background */}
        <View style={styles.gridContainer}>
       
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
      <TouchableOpacity
          style={styles.goButton}
          onPress={() => router.push('/HomeScreen')}
        >
        <Text style={styles.loginTitle}>Log In</Text>
        </TouchableOpacity>
        
        {/* Input Fields */}
        <View style={styles.inputContainer}>
          {activeTab === 'Email' ? (
            <Animated.View style={[styles.inputWrapper, { transform: [{ translateY: emailShift }] }]}>
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
                  onFocus={handleEmailFocus}
                  onBlur={handleEmailBlur}
                />
                <Ionicons name="mail-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
              </View>
            </Animated.View>
          ) : (
            <Animated.View style={[styles.inputWrapper, { transform: [{ translateY: emailShift }] }]}>
              <Text style={styles.inputLabel}>Phone Number</Text>
              <View style={styles.inputFieldContainer}>
                <TextInput
                  style={styles.inputField}
                  placeholder="Enter your phone"
                  placeholderTextColor="#9CA3AF"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                  onFocus={handleEmailFocus}
                  onBlur={handleEmailBlur}
                />
                <Ionicons name="call-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
              </View>
            </Animated.View>
          )}
          
          <Animated.View style={[styles.passwordInputWrapper, { transform: [{ translateY: passwordShift }] }]}>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.inputFieldContainer}>
              <TextInput
                style={styles.inputField}
                placeholder="Enter your password"
                placeholderTextColor="#9CA3AF"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                onFocus={handlePasswordFocus}
                onBlur={handlePasswordBlur}
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
          </Animated.View>
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
          
          <TouchableOpacity onPress={() => router.push('/ForgetPasswordScreen')}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        
        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={() => router.push('/HomeScreen')}>
          <Text style={styles.loginButtonText}>Log in</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default login
// Only the styles object is updated for label and input spacing

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3E0288',
  },
  topSection: {
    flex: 0.35,
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
    width: '100%',
    maxWidth: 217,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: 'medium',
    color: '#fff',
    lineHeight:23,
    textAlign: 'center',
    marginBottom: 12,
    fontFamily: 'SF Compact Rounded',
    width: '100%',
    maxWidth: 217,
  },
  welcomeSubtitle: {
    fontSize: 12,
    fontWeight: 'regular',
    color: '#E8E8E8',
    textAlign: 'center',
    lineHeight: 14,
    opacity: 0.9,
    width: '100%',
    maxWidth: 198,
  },
  bottomSection: {
    flex: 0.65,
    backgroundColor: '#fff',
    borderTopLeftRadius: 55,
    borderTopRightRadius: 55,
    paddingHorizontal: 24,
    paddingTop: 32,
    marginTop: -35,
    zIndex: 1,
    overflow: 'hidden',
    width: '100%',
    paddingBottom: 0,
    marginBottom: 0,
  },
  loginTitle: {
    fontSize: 26,
    fontWeight: 'regular',
    color: '#000000',
    textAlign: 'center',
    lineHeight:28,
    marginBottom: 24,
    alignSelf: 'center',
  },
  inputContainer: {
    marginBottom: 0,
  },
  inputWrapper: {
    marginBottom: 24,
  },
  passwordInputWrapper: {
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 4, // reduced from 8 to 4 for less space
    fontFamily: 'SF Compact Rounded',
    fontStyle: 'medium',
    lineHeight: 18, // reduced from 23 to align better with input
    paddingLeft: 4, // added padding to move label slightly inside
  },
  inputFieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    width: '100%',
    height: 56,
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
    marginTop: 0,
    width: '100%',
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#E5E5E5',
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
    fontSize: 12,
    fontWeight: 'regular',
    color: '#686D76',
    lineHeight: 23,
  },
  forgotPasswordText: {
    fontSize: 12,
    fontWeight: 'regular',
    color: '#3E0288',
    lineHeight: 23,
  },
  loginButton: {
    width:287,
    backgroundColor: '#3E0288',
    borderRadius: 8,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 24,
    alignSelf: 'center',
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
