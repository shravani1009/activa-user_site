import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native'
import React, { useState, useRef, useEffect, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useFocusEffect } from '@react-navigation/native'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const BASE_WIDTH = 414;
const BASE_HEIGHT = 896;

const scaleWidth = (size) => (SCREEN_WIDTH / BASE_WIDTH) * size;
const scaleHeight = (size) => (SCREEN_HEIGHT / BASE_HEIGHT) * size;

const login = () => {
  const router = useRouter()
  const scrollViewRef = useRef(null);
  const inputPositions = useRef({});
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const [activeTab, setActiveTab] = useState('Email')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [emailError, setEmailError] = useState('')

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const handleInputFocus = (key) => {
    setTimeout(() => {
      if (inputPositions.current[key] !== undefined && scrollViewRef.current && keyboardHeight > 0) {
        // Calculate the visible area above the keyboard
        const visibleAreaTop = scaleHeight(100); // Top padding/safe area
        const visibleAreaBottom = SCREEN_HEIGHT - keyboardHeight - scaleHeight(100); // Bottom minus keyboard minus some padding
        const inputY = inputPositions.current[key];
        
        // Only scroll if input is below the visible area
        if (inputY > visibleAreaBottom - scaleHeight(150)) {
          // Position input near the top of visible area (150px from top)
          const scrollOffset = inputY - scaleHeight(150);
          scrollViewRef.current.scrollTo({
            y: Math.max(0, scrollOffset),
            animated: true,
          });
        }
      }
    }, 300);
  };

  const handleInputLayout = (key, event) => {
    const { y } = event.nativeEvent.layout;
    inputPositions.current[key] = y;
  };

  // Email validation
  const validateEmail = (emailValue) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailValue.length === 0) {
      setEmailError('');
      return true;
    }
    if (!emailRegex.test(emailValue)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    validateEmail(text);
  };

  // Reset screen when navigating back to it
  useFocusEffect(
    useCallback(() => {
      // Reset scroll position to top
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ y: 0, animated: false });
      }
      // Dismiss keyboard if open
      Keyboard.dismiss();
      // Reset keyboard height
      setKeyboardHeight(0);
      // Reset input positions
      inputPositions.current = {};
    }, [])
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>

      <View style={styles.topSection}>
        <View style={styles.gridContainer} />
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeTitle}>Welcome Back</Text>
          <Text style={styles.welcomeSubtitle}>
            It's great to see you again. Let's pick up where we left off!
          </Text>
        </View>
      </View>

      <View style={styles.bottomSection}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? scaleHeight(80) : 0}
        >
          <ScrollView
            ref={scrollViewRef}
            keyboardShouldPersistTaps="handled"
            scrollEnabled={keyboardHeight > 0}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: scaleWidth(24),
              paddingTop: scaleHeight(32),
              paddingBottom: keyboardHeight > 0 ? keyboardHeight + scaleHeight(150) : scaleHeight(20),
            }}
          >
            <Text style={styles.loginTitle}>Log In</Text>
            
            <View style={styles.inputContainer}>
              {activeTab === 'Email' ? (
                <View 
                  style={styles.inputWrapper}
                  onLayout={e => handleInputLayout('emailInput', e)}
                >
                  <Text style={styles.inputLabel}>Email Address</Text>
                  <View style={[styles.inputFieldContainer, emailError ? styles.inputFieldContainerError : null]}>
                    <TextInput
                      style={styles.inputField}
                      placeholder="Enter your email"
                      placeholderTextColor="#9CA3AF"
                      value={email}
                      onChangeText={handleEmailChange}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      onFocus={() => handleInputFocus('emailInput')}
                    />
                    <Ionicons name="mail-outline" size={scaleWidth(20)} color="#9CA3AF" style={styles.inputIcon} />
                  </View>
                  {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                </View>
              ) : (
                <View 
                  style={styles.inputWrapper}
                  onLayout={e => handleInputLayout('phoneInput', e)}
                >
                  <Text style={styles.inputLabel}>Phone Number</Text>
                  <View style={styles.inputFieldContainer}>
                    <TextInput
                      style={styles.inputField}
                      placeholder="Enter your phone"
                      placeholderTextColor="#9CA3AF"
                      value={phone}
                      onChangeText={setPhone}
                      keyboardType="phone-pad"
                      onFocus={() => handleInputFocus('phoneInput')}
                    />
                    <Ionicons name="call-outline" size={scaleWidth(20)} color="#9CA3AF" style={styles.inputIcon} />
                  </View>
                </View>
              )}
              
              <View 
                style={styles.passwordInputWrapper}
                onLayout={e => handleInputLayout('passwordInput', e)}
              >
                <Text style={styles.inputLabel}>Password</Text>
                <View style={styles.inputFieldContainer}>
                  <TextInput
                    style={styles.inputField}
                    placeholder="Enter your password"
                    placeholderTextColor="#9CA3AF"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    onFocus={() => handleInputFocus('passwordInput')}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.inputIcon}
                  >
                    <Ionicons
                      name={showPassword ? "eye-outline" : "eye-off-outline"}
                      size={scaleWidth(20)}
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
                  {rememberMe && <Ionicons name="checkmark" size={scaleWidth(14)} color="#fff" />}
                </View>
                <Text style={styles.rememberMeText}>Remember Me</Text>
              </TouchableOpacity>
              
              <TouchableOpacity onPress={() => router.push('/ForgetPasswordScreen')}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => router.push('/HomeScreen')}
            >
              <Text style={styles.loginButtonText}>Log in</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  )
}

export default login

// Only the styles object is updated for label and input spacing

const getStyles = () => StyleSheet.create({
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
    paddingHorizontal: scaleWidth(24),
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
    maxWidth: scaleWidth(217),
  },
  welcomeTitle: {
    fontSize: scaleWidth(32),
    fontWeight: 'medium',
    color: '#fff',
    lineHeight: scaleHeight(23),
    textAlign: 'center',
    marginBottom: scaleHeight(12),
    fontFamily: 'SF Compact Rounded',
    width: '100%',
    maxWidth: scaleWidth(217),
  },
  welcomeSubtitle: {
    fontSize: scaleWidth(12),
    fontWeight: 'regular',
    color: '#E8E8E8',
    textAlign: 'center',
    lineHeight: scaleHeight(14),
    opacity: 0.9,
    width: '100%',
    maxWidth: scaleWidth(198),
  },
  bottomSection: {
    flex: 0.65,
    backgroundColor: '#fff',
    borderTopLeftRadius: scaleWidth(55),
    borderTopRightRadius: scaleWidth(55),
    marginTop: scaleHeight(-35),
    zIndex: 1,
    overflow: 'hidden',
    width: '100%',
  },
  loginTitle: {
    fontSize: scaleWidth(26),
    fontWeight: 'regular',
    color: '#000000',
    textAlign: 'center',
    lineHeight: scaleHeight(28),
    marginBottom: scaleHeight(24),
    alignSelf: 'center',
  },
  inputContainer: {
    marginBottom: 0,
  },
  inputWrapper: {
    marginBottom: scaleHeight(24),
  },
  passwordInputWrapper: {
    marginBottom: scaleHeight(10),
  },
  inputLabel: {
    fontSize: scaleWidth(12),
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: scaleHeight(4), // reduced from 8 to 4 for less space
    fontFamily: 'SF Compact Rounded',
    fontStyle: 'medium',
    lineHeight: scaleHeight(18), // reduced from 23 to align better with input
    paddingLeft: scaleWidth(4), // added padding to move label slightly inside
  },
  inputFieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: scaleWidth(8),
    backgroundColor: '#fff',
    paddingHorizontal: scaleWidth(12),
    width: '100%',
    height: scaleHeight(56),
  },
  inputField: {
    flex: 1,
    height: scaleHeight(48),
    fontSize: scaleWidth(16),
    color: '#1F2937',
    paddingVertical: 0,
  },
  inputIcon: {
    marginLeft: scaleWidth(8),
    padding: scaleWidth(4),
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scaleHeight(24),
    marginTop: 0,
    width: '100%',
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  checkbox: {
    width: scaleWidth(20),
    height: scaleWidth(20),
    borderWidth: 2,
    borderColor: '#E5E5E5',
    borderRadius: scaleWidth(4),
    marginRight: scaleWidth(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#3E0288',
    borderColor: '#3E0288',
  },
  rememberMeText: {
    fontSize: scaleWidth(12),
    fontWeight: 'regular',
    color: '#686D76',
    lineHeight: scaleHeight(23),
  },
  forgotPasswordText: {
    fontSize: scaleWidth(12),
    fontWeight: 'regular',
    color: '#3E0288',
    lineHeight: scaleHeight(23),
  },
  loginButton: {
    width: scaleWidth(287),
    backgroundColor: '#3E0288',
    borderRadius: scaleWidth(8),
    height: scaleHeight(52),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scaleHeight(60),
    marginBottom: scaleHeight(24),
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
    fontSize: scaleWidth(16),
    fontWeight: '600',
    color: '#fff',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    fontSize: scaleWidth(14),
    fontWeight: '400',
    color: '#1F2937',
  },
    signUpLink: {
    fontSize: scaleWidth(14),
    fontWeight: '500',
    color: '#3E0288',
  },
  inputFieldContainerError: {
    borderColor: '#DC2626',
  },
  errorText: {
    fontSize: scaleWidth(12),
    color: '#DC2626',
    marginTop: scaleHeight(4),
    marginLeft: scaleWidth(4),
    fontFamily: 'SF Compact Rounded',
  },
});

const styles = getStyles();
