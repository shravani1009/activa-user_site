import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function ProfileScreen() {
  const router = useRouter();
  const scrollViewRef = useRef(null);
  const inputPositions = useRef({});

  const [keyboardHeight, setKeyboardHeight] = useState(0);

  /* ---------------- Editable State ---------------- */
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [branch, setBranch] = useState('');
  const [department, setDepartment] = useState('');

  /* ---------------- Layout Constants ---------------- */
  const CARD_WIDTH = 420;
  const CARD_TOP = 220;
  const CARD_RADIUS = 60;

  const scaleWidth = SCREEN_WIDTH / 414;
  const scaleHeight = SCREEN_HEIGHT / 896;
  const headerFontSize = Math.min(28, SCREEN_WIDTH * 0.07);

  /* ---------------- Keyboard Listeners ---------------- */
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
            onPress={() => router.back()}
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              backgroundColor: 'rgba(255,255,255,0.2)',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Ionicons name="arrow-back-outline" size={18} color="#fff" />
          </TouchableOpacity>

          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => router.push('/SettingScreen')}
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                backgroundColor: 'rgba(255,255,255,0.2)',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 8,
              }}
            >
              <Ionicons name="settings-outline" size={20} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push('/SettingScreen')}
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                backgroundColor: 'rgba(255,255,255,0.2)',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 8,
              }}
            >
              <Ionicons name="notifications-outline" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Title */}
        <View style={{ marginBottom: 120, marginLeft: 10 }}>
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
              marginTop: 4,
            }}
          >
            Manage your personal information
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
          bottom: 0,
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
            scrollEnabled={keyboardHeight > 0} // scroll only when keyboard visible
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 20 * scaleWidth,
              paddingTop: 40 * scaleHeight,
              paddingBottom: keyboardHeight + 20, // add extra space for keyboard
            }}
          >
            {/* Profile Image */}
            <View style={{ alignItems: 'center', marginBottom: 18 }}>
              <Image
                source={{ uri: 'https://i.pravatar.cc/300' }}
                style={{
                  width: 96 * scaleWidth,
                  height: 96 * scaleWidth,
                  borderRadius: 48 * scaleWidth,
                  marginBottom: 12,
                }}
              />

              <TouchableOpacity
                style={{
                  backgroundColor: '#EDE9FE',
                  paddingHorizontal: 16,
                  paddingVertical: 6,
                  borderRadius: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Ionicons name="camera-outline" size={14} color="#4B0082" />
                <Text
                  style={{
                    marginLeft: 6,
                    color: '#4B0082',
                    fontSize: 12,
                    fontWeight: '500',
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
            />

            <ProfileInput
              icon="mail-outline"
              label="Email Address"
              scale={scaleWidth}
              value={email}
              onChangeText={setEmail}
              onFocus={() => handleInputFocus('email')}
              onLayout={(e) => handleInputLayout('email', e)}
            />

            <ProfileInput
              icon="business-outline"
              label="Branch"
              scale={scaleWidth}
              value={branch}
              onChangeText={setBranch}
              onFocus={() => handleInputFocus('branch')}
              onLayout={(e) => handleInputLayout('branch', e)}
            />

            <ProfileInput
              icon="briefcase-outline"
              label="Department"
              scale={scaleWidth}
              value={department}
              onChangeText={setDepartment}
              onFocus={() => handleInputFocus('department')}
              onLayout={(e) => handleInputLayout('department', e)}
            />
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
            marginBottom: 6,
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
          borderWidth: 1,
          borderColor: '#000',
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
          style={{
            flex: 1,
            marginLeft: 10 * scale,
            fontSize: 14 * scale,
            color: '#111827',
          }}
        />
      </View>
    </View>
  );
};
