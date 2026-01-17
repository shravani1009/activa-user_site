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
        // Ensure we don't scroll above the card's top boundary
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

  const getStrengthLabel = () => {
    if (!newPassword) return '';
    if (newPassword.length < 6) return 'Password Strength: Weak';
    if (newPassword.length < 10) return 'Password Strength: Medium';
    return 'Password strength: Strong';
  };

  const FIELD_WIDTH = 342;
  const FIELD_HEIGHT = 48;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#3e0288' }}>
      {/* HEADER */}
      <View
        style={{
          height: 260 * scaleHeight,
          paddingHorizontal: 20 * scaleWidth,
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
            style={{ width: 32, height: 32, borderRadius: 8 }}
          >
            <Ionicons name="arrow-back-outline" size={18} color="#fff" />
          </TouchableOpacity>

          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => router.push('/SettingScreen')}
              style={styles.iconBtn}
            >
              <Ionicons name="settings-outline" size={20} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push('/NotificationScreen')}
              style={[styles.iconBtn, { backgroundColor: 'transparent' }]}
            >
              <Ionicons name="notifications-outline" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ marginBottom: 120, marginLeft: 12, marginTop: 20}}>
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
              paddingHorizontal: 26,
              paddingTop: 100,
              paddingBottom: keyboardHeight + 20,
            }}
          >
            {/* CURRENT */}
            <View onLayout={e => handleInputLayout('currentPassword', e)}>
              <FieldLabel text="Current Password" />
              <PasswordInput
                placeholder="Enter current password"
                value={currentPassword}
                onChangeText={setCurrentPassword}
                secureTextEntry={!showCurrent}
                onToggleVisibility={() => setShowCurrent(v => !v)}
                onFocus={() => handleInputFocus('currentPassword')}
              />
              <Text style={styles.helperText}>Password Strength: Medium</Text>
            </View>

            {/* NEW */}
            <View
              style={{ marginTop: 25 }}
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
              style={{ marginTop: 25 }}
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
              />

              <Text style={styles.helperText}>Re-enter the new password</Text>

              {passwordsMatch && (
                <View style={styles.matchRow}>
                  <Ionicons name="checkmark-circle" size={16} color="#16A34A" />
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
        size={20}
        color="#9CA3AF"
      />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    top: 210,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    overflow: 'hidden',
    elevation: 4,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    paddingLeft: 0,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 6,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 14,
    height: 48,
    width: 342,
  },
  input: { flex: 1 },
  helperText: { fontSize: 10, color: '#9CA3AF', paddingLeft: 0, marginTop: 5},
  helperText2: { fontSize: 14, color: '#3E0288', paddingLeft: 0 },
  strengthBar: {
    marginTop: 25,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    overflow: 'hidden',
    width: 342,
  },
  matchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingLeft: 0,
  },
  matchText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#16A34A',
    fontWeight: '500',
  },
  button: {
    marginTop: 50,
    marginBottom: 70,
    backgroundColor: '#3E0288',
    borderRadius: 6,
    height: 48,
    width: 305,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  subtitle: {
    fontSize: 16,
    color: '#E5E7EB',
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    backgroundColor: 'rgba(227,227,227,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
});
