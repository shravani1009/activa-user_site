import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function ChangePasswordScreen() {
  const router = useRouter();
  const scrollViewRef = useRef(null);
  const inputPositions = useRef({});
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const CARD_RADIUS = 60;
  const scaleWidth = SCREEN_WIDTH / 414;
  const scaleHeight = SCREEN_HEIGHT / 896;
  const headerFontSize = Math.min(28, SCREEN_WIDTH * 0.07);

  // Container and padding calculations
  // Reference screen: 414px width, 20px padding
  // Calculate padding to maintain same relative position on all screens
  const REFERENCE_SCREEN_WIDTH = 414;
  const REFERENCE_PADDING = 20;
  // Calculate horizontal padding to maintain input box position
  const HORIZONTAL_PADDING = (REFERENCE_PADDING / REFERENCE_SCREEN_WIDTH) * SCREEN_WIDTH;
  // Calculate field width to match the width between back arrow and notification icon
  const FIELD_WIDTH = SCREEN_WIDTH - (HORIZONTAL_PADDING * 2);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const passwordsMatch =
    newPassword.length > 0 && newPassword === confirmPassword;

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
    }, 250);
  };

  const handleInputLayout = (key, event) => {
    const { y } = event.nativeEvent.layout;
    inputPositions.current[key] = y;
  };

  const getStrengthLabel = () => {
    if (!newPassword) return '';
    if (newPassword.length < 6) return 'Password Strength: Weak';
    if (newPassword.length < 10) return 'Password Strength: Medium';
    return 'Password strength: Strong';
  };

  const styles = getStyles(scaleWidth, scaleHeight);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#3e0288' }}>
      {/* HEADER */}
      <View
          style={{
            height: 260 * scaleHeight,
            paddingHorizontal: HORIZONTAL_PADDING,
            paddingTop: 30 * scaleHeight,
            justifyContent: 'space-between',
          }}
      >
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
              width: 32 * scaleWidth, 
              height: 32 * scaleHeight, 
              borderRadius: 8 * scaleWidth,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Ionicons name="arrow-back-outline" size={18 * scaleWidth} color="#fff" />
          </TouchableOpacity>

          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => router.push('/SettingScreen')}
              style={styles.iconBtn}
            >
              <Ionicons name="settings-outline" size={20 * scaleWidth} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push('/NotificationScreen')}
              style={[styles.iconBtn, { backgroundColor: 'transparent' }]}
            >
              <Ionicons name="notifications-outline" size={20 * scaleWidth} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ marginBottom: 120 * scaleHeight, marginLeft: 10 * scaleWidth, marginTop: 20 * scaleHeight }}>
          <Text style={{ fontSize: headerFontSize, fontWeight: '600', color: '#fff' }}>
            Change Password
          </Text>
          <Text style={styles.subtitle}>Reset Your Password</Text>
        </View>
      </View>

      {/* WHITE CARD */}
      <View style={styles.card}>
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
              paddingHorizontal: HORIZONTAL_PADDING,
              paddingTop: 100 * scaleHeight,
              paddingBottom: keyboardHeight + 20 * scaleHeight,
            }}
          >
            {/* CURRENT */}
            <View 
              style={{ 
                width: FIELD_WIDTH
              }}
              onLayout={e => handleInputLayout('currentPassword', e)}
            >
              <FieldLabel text="Current Password" />
              <PasswordInput
                placeholder="Enter current password"
                value={currentPassword}
                onChangeText={setCurrentPassword}
                secureTextEntry={!showCurrent}
                onToggleVisibility={() => setShowCurrent(v => !v)}
                onFocus={() => handleInputFocus('currentPassword')}
                scaleWidth={scaleWidth}
                scaleHeight={scaleHeight}
              />
            </View>

            {/* NEW */}
            <View
              style={{ 
                marginTop: 25 * scaleHeight, 
                width: FIELD_WIDTH
              }}
              onLayout={e => handleInputLayout('newPassword', e)}
            >
              <FieldLabel text="New Password" />
              <PasswordInput
                placeholder="Enter new password"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={!showNew}
                onToggleVisibility={() => setShowNew(v => !v)}
                onFocus={() => handleInputFocus('newPassword')}
                scaleWidth={scaleWidth}
                scaleHeight={scaleHeight}
              />

              <Text style={styles.helperText}>
                Must be at least 8 characters,include numbers and symbols
              </Text>

              {newPassword.length > 0 && (
                <>
                  <View style={styles.strengthBar}>
                    <View
                      style={{
                        height: '100%',
                        width:
                          newPassword.length < 6
                            ? '25%'
                            : newPassword.length < 10
                            ? '60%'
                            : '100%',
                        backgroundColor:
                          newPassword.length < 6
                            ? '#F97373'
                            : newPassword.length < 10
                            ? '#F59E0B'
                            : '#4C1D95',
                      }}
                    />
                  </View>

                  <Text style={[styles.helperText2, { fontWeight: '500' }]}>
                    {getStrengthLabel()}
                  </Text>
                </>
              )}
            </View>

            {/* CONFIRM */}
            <View
              style={{ 
                marginTop: 25 * scaleHeight, 
                width: FIELD_WIDTH
              }}
              onLayout={e => handleInputLayout('confirmPassword', e)}
            >
              <FieldLabel text="Confirm New Password" />
              <PasswordInput
                placeholder="Re-enter new password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirm}
                onToggleVisibility={() => setShowConfirm(v => !v)}
                onFocus={() => handleInputFocus('confirmPassword')}
                scaleWidth={scaleWidth}
                scaleHeight={scaleHeight}
              />

              <Text style={styles.helperText}>Re-enter the new password</Text>

              {passwordsMatch && (
                <View style={styles.matchRow}>
                  <Ionicons name="checkmark-circle" size={16 * scaleWidth} color="#16A34A" />
                  <Text style={styles.matchText}>Password match</Text>
                </View>
              )}
            </View>

            <TouchableOpacity
              onPress={() => router.push('/PasswordUpdateScreen')}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Update Password</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}

/* REUSABLE COMPONENTS */

const FieldLabel = ({ text }) => (
  <Text style={styles.label}>{text}</Text>
);

const PasswordInput = ({
  value,
  onChangeText,
  secureTextEntry,
  onToggleVisibility,
  onFocus,
  placeholder,
  scaleWidth,
  scaleHeight,
}) => (
  <View style={styles.inputWrapper}>
    <TextInput
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      onFocus={onFocus}
      placeholder={placeholder}
      placeholderTextColor="#9CA3AF"
      style={styles.input}
    />
    <TouchableOpacity onPress={onToggleVisibility}>
      <Ionicons
        name={secureTextEntry ? 'eye-off-outline' : 'eye-outline'}
        size={20 * scaleWidth}
        color="#9CA3AF"
      />
    </TouchableOpacity>
  </View>
);

const getStyles = (scaleWidth, scaleHeight) => StyleSheet.create({
  card: {
    position: 'absolute',
    top: 220 * scaleHeight,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 60 * scaleWidth,
    borderTopRightRadius: 60 * scaleWidth,
    overflow: 'hidden',
    elevation: 4,
  },
  label: {
    fontSize: 14 * scaleWidth,
    marginBottom: 6 * scaleHeight,
    paddingLeft: 0,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 6 * scaleWidth,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 14 * scaleWidth,
    height: 48 * scaleHeight,
    width: '100%', // Fill container width to match space between back arrow and notification icon
  },
  input: { 
    flex: 1,
    fontSize: 14 * scaleWidth,
    color: '#000',
  },
  helperText: { 
    fontSize: 10 * scaleWidth, 
    color: '#9CA3AF', 
    paddingLeft: 0, 
    marginTop: 5 * scaleHeight 
  },
  helperText2: { 
    fontSize: 14 * scaleWidth, 
    color: '#3E0288', 
    paddingLeft: 0 
  },
  strengthBar: {
    marginTop: 25 * scaleHeight,
    height: 4 * scaleHeight,
    backgroundColor: '#E5E7EB',
    borderRadius: 2 * scaleWidth,
    overflow: 'hidden',
    width: '100%', // Fill container width to match input box
  },
  matchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10 * scaleHeight,
    paddingLeft: 0,
  },
  matchText: {
    marginLeft: 4 * scaleWidth,
    fontSize: 12 * scaleWidth,
    color: '#16A34A',
    fontWeight: '500',
  },
  button: {
    marginTop: 50 * scaleHeight,
    marginBottom: 70 * scaleHeight,
    backgroundColor: '#3E0288',
    borderRadius: 6 * scaleWidth,
    height: 48 * scaleHeight,
    width: 305 * scaleWidth,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 16 * scaleWidth, 
    fontWeight: '600' 
  },
  subtitle: {
    fontSize: 16 * scaleWidth,
    color: '#E5E7EB',
    marginTop: 4 * scaleHeight,
  },
  iconBtn: {
    width: 40 * scaleWidth,
    height: 40 * scaleWidth,
    borderRadius: 20 * scaleWidth,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    backgroundColor: 'rgba(227,227,227,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8 * scaleWidth,
  },
});const styles = getStyles(SCREEN_WIDTH / 414, SCREEN_HEIGHT / 896);

