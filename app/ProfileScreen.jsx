import React, { useRef, useState, useEffect, useCallback } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { useFocusEffect } from '@react-navigation/native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function ProfileScreen() {
  const router = useRouter();
  const scrollViewRef = useRef(null);
  const inputPositions = useRef({});
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const insets = useSafeAreaInsets();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [branch, setBranch] = useState('');
  const [department, setDepartment] = useState('');
  const [startDate, setStartDate] = useState('');
  const CARD_WIDTH = 420;
  const CARD_TOP = 220;
  const CARD_RADIUS = 60;
  const scaleWidth = SCREEN_WIDTH / 414;
  const scaleHeight = SCREEN_HEIGHT / 896;
  const headerFontSize = Math.min(28, SCREEN_WIDTH * 0.07);


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
    // Skip auto-scroll for startDate input
    if (key === 'startDate') {
      return;
    }
    setTimeout(() => {
      if (inputPositions.current[key] !== undefined && scrollViewRef.current) {
        const scrollOffset = inputPositions.current[key] - (SCREEN_HEIGHT * 0.15);
        scrollViewRef.current.scrollTo({
          y: Math.max(0, scrollOffset),
          animated: true,
        });
      }
    }, 250); // slightly lower timeout works better on Android
  };

  const handleInputLayout = (key, event) => {
    const { y } = event.nativeEvent.layout;
    inputPositions.current[key] = y;
  };

  // Validation function to allow only numbers
  const validateNumbersOnly = (text) => {
    // Remove all non-numeric characters
    return text.replace(/[^0-9]/g, '');
  };

  // Handler for phone number input with validation
  const handlePhoneChange = (text) => {
    const validatedText = validateNumbersOnly(text);
    setBranch(validatedText);
  };

  // Handler for date input with automatic DD/MM/YYYY formatting
  const handleDateChange = (text) => {
    // Remove all non-numeric characters
    const numbersOnly = text.replace(/[^0-9]/g, '');
    
    // Limit to 8 digits (DDMMYYYY)
    const limitedNumbers = numbersOnly.slice(0, 8);
    
    // Format as DD/MM/YYYY
    let formatted = '';
    if (limitedNumbers.length > 0) {
      formatted = limitedNumbers.slice(0, 2); // Day
      if (limitedNumbers.length > 2) {
        formatted += '/' + limitedNumbers.slice(2, 4); // Month
      }
      if (limitedNumbers.length > 4) {
        formatted += '/' + limitedNumbers.slice(4, 8); // Year
      }
    }
    
    setStartDate(formatted);
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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#3e0288' }}>
      {/* ---------------- Header ---------------- */}
      <View
        style={{
          height: 260 * scaleHeight,
          paddingHorizontal: 20 * scaleWidth,
          paddingTop: 30 * scaleHeight,
          backgroundColor: '#3e0288',
          justifyContent: 'space-between',
        }}
      >
        {/* Top Row */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            onPress={() => router.push('/HomeScreen')}
            style={{
              width: 32 * scaleWidth,
              height: 32 * scaleHeight,
              borderRadius: 8 * scaleWidth,
              // backgroundColor: 'rgba(255,255,255,0.2)',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Ionicons name="arrow-back-outline" size={18 * scaleWidth} color="#fff" />
          </TouchableOpacity>

          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => router.push('/SettingScreen')}
              style={{
                width: 40 * scaleWidth,
                height: 40 * scaleWidth,
                borderRadius: 20 * scaleWidth,
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.3)',
                backgroundColor: 'transparent',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 8 * scaleWidth,
              }}
            >
              <Ionicons name="settings-outline" size={20 * scaleWidth} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push('/NotificationScreen')}
              style={{
                width: 40 * scaleWidth,
                height: 40 * scaleWidth,
                borderRadius: 20 * scaleWidth,
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.3)',
                backgroundColor: 'transparent',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 8 * scaleWidth,
              }}
            >
              <Ionicons name="notifications-outline" size={20 * scaleWidth} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Title */}
        <View style={{ marginBottom: 120 * scaleHeight, marginLeft: 10 * scaleWidth, marginTop: 20 * scaleHeight }}>
          <Text
            style={{
              fontSize: headerFontSize,
              fontWeight: '600',
              color: '#fff',
            }}
          >
            Profile
          </Text>
          <Text
            style={{
              fontSize: 14 * scaleWidth,
              color: '#E5E7EB',
              marginTop: 1 * scaleHeight,
            }}
          >
            Employee Information
          </Text>
        </View>
      </View>

      {/* ---------------- White Card ---------------- */}
      <View
        style={{
          position: 'absolute',
          top: CARD_TOP * scaleHeight,
          alignSelf: 'center',
          width: CARD_WIDTH * scaleWidth,
          bottom: -insets.bottom,
          backgroundColor: '#fff',
          borderTopLeftRadius: CARD_RADIUS * scaleWidth,
          borderTopRightRadius: CARD_RADIUS * scaleWidth,
          overflow: 'hidden',
        }}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
        >
          <ScrollView
            ref={scrollViewRef}
            keyboardShouldPersistTaps="handled"
            scrollEnabled={keyboardHeight > 0}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 20 * scaleWidth,
              paddingTop: 40 * scaleHeight,
              paddingBottom: keyboardHeight > 0 ? keyboardHeight + 20 * scaleHeight + insets.bottom : Math.max(60 * scaleHeight, 20 * scaleHeight + insets.bottom), 
            }}
          >
            {/* Profile Image */}
            <View style={{ alignItems: 'center', marginBottom: 18 * scaleHeight, marginTop: -12 * scaleHeight}}>
              <Image
                source={{ uri: 'https://i.pravatar.cc/300' }}
                style={{
                  width: 96 * scaleWidth,
                  height: 96 * scaleWidth,
                  borderRadius: 48 * scaleWidth,
                  marginBottom: 12 * scaleHeight,
                }}
              />

              <TouchableOpacity
                style={{
                  backgroundColor: '#EDE9FE',
                  paddingHorizontal: 18 * scaleWidth,
                  paddingVertical: 8 * scaleHeight,
                  borderRadius: 8 * scaleWidth,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Image
                  source={require('../assets/images/camera.svg')}
                  style={{ width: 14 * scaleWidth, height: 14 * scaleWidth }}
                  contentFit="contain"
                />
                <Text
                  style={{
                    marginLeft: 6 * scaleWidth,
                    color: '#3E0288',
                    fontSize: 12 * scaleWidth,
                    fontWeight: '400',
                    fontFamily: 'SF Compact Rounded',
                    // lineHeight:23,
                  }}
                >
                  Change Photo
                </Text>
              </TouchableOpacity>
            </View>

            {/* Editable Inputs */}
            <ProfileInput
              icon="person-outline"
              label="Full Name"
              scale={scaleWidth}
              value={fullName}
              onChangeText={setFullName}
              onFocus={() => handleInputFocus('fullName')}
              onLayout={(e) => handleInputLayout('fullName', e)}
              borderTopWidth={0.5}
              borderRightWidth={2}
              borderBottomWidth={2}
              borderLeftWidth={0.5}
              reduceSpacing={true}
             
            />

            <ProfileInput
              icon="mail-outline"
              label="Email Address"
              scale={scaleWidth}
              value={email}
              onChangeText={handleEmailChange}
              onFocus={() => handleInputFocus('email')}
              onLayout={(e) => handleInputLayout('email', e)}
              borderTopWidth={0.5}
              borderRightWidth={2}
              borderBottomWidth={2}
              borderLeftWidth={0.5}
              reduceSpacing={true}
              error={emailError}
            />

            <ProfileInput
              icon="call-outline"
              label="Phone Number"
              scale={scaleWidth}
              value={branch}
              onChangeText={handlePhoneChange}
              onFocus={() => handleInputFocus('branch')}
              onLayout={(e) => handleInputLayout('branch', e)}
              borderTopWidth={0.5}
              borderRightWidth={2}
              borderBottomWidth={2}
              borderLeftWidth={0.5}
              reduceSpacing={true}
              keyboardType="phone-pad"
            />

            <ProfileInput
              icon="briefcase-outline"
              label="Department"
              scale={scaleWidth}
              value={department}
              onChangeText={setDepartment}
              onFocus={() => handleInputFocus('department')}
              onLayout={(e) => handleInputLayout('department', e)}
              borderTopWidth={0.5}
              borderRightWidth={2}
              borderBottomWidth={2}
              borderLeftWidth={0.5}
              reduceSpacing={true}
            />
            <View style={{ marginTop: -8 * scaleHeight }}>
              <ProfileInput
                icon="calendar-number-outline"
                label="Start Date"
                scale={scaleWidth}
                value={startDate}
                onChangeText={handleDateChange}
                onFocus={() => handleInputFocus('startDate')}
                onLayout={(e) => handleInputLayout('startDate', e)}
                borderTopWidth={0.5}
                borderRightWidth={2}
                borderBottomWidth={2}
                borderLeftWidth={0.5}
                reduceSpacing={true}
                placeholder="DD/MM/YYYY"
                keyboardType="numeric"
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}

/* ---------------- Input Component ---------------- */
const ProfileInput = ({
  icon,
  label,
  scale,
  value,
  onChangeText,
  onFocus,
  onLayout,
  borderTopWidth,
  borderRightWidth,
  borderBottomWidth,
  borderLeftWidth,
  keyboardType,
  placeholder,
  error,
}) => {
  return (
    <View
      style={{ marginBottom: 18 * scale, alignItems: 'center' }}
      onLayout={onLayout}
    >
      <View style={{ width: 329 * scale }}>
        <Text
          style={{
            fontSize: 12 * scale,
            color: '#6B7280',
            marginBottom: 6 * scale,
          }}
        >
          {label}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: 329 * scale,
          height: 52 * scale,
          borderWidth: borderTopWidth !== undefined ? 0 : 1,
          borderTopWidth: borderTopWidth !== undefined ? borderTopWidth : undefined,
          borderRightWidth: borderRightWidth !== undefined ? borderRightWidth : undefined,
          borderBottomWidth: borderBottomWidth !== undefined ? borderBottomWidth : undefined,
          borderLeftWidth: borderLeftWidth !== undefined ? borderLeftWidth : undefined,
          borderColor: error ? '#DC2626' : '#000',
          borderRadius: 15 * scale,
          paddingHorizontal: 14 * scale,
          backgroundColor: '#fff',
        }}
      >
        <Ionicons name={icon} size={18 * scale} color="#3E0288" />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          onFocus={onFocus}
          keyboardType={keyboardType}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          style={{
            flex: 1,
            marginLeft: 10 * scale,
            fontSize: 14 * scale,
            color: '#111827',
          }}
        />
      </View>
      {error ? (
        <View style={{ width: 329 * scale, marginTop: 4 * scale }}>
          <Text
            style={{
              fontSize: 12 * scale,
              color: '#DC2626',
              marginLeft: 4 * scale,
              fontFamily: 'SF Compact Rounded',
            }}
          >
            {error}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

