import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function ChangePasswordScreen() {
  const router = useRouter();

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

  const getStrengthLabel = () => {
    if (!newPassword) return 'Password strength: Medium';
    if (newPassword.length < 6) return 'Password strength: Weak';
    if (newPassword.length < 10) return 'Password strength: Medium';
    return 'Password strength: Strong';
  };

  const FIELD_WIDTH = 342 * scaleWidth;
  const FIELD_HEIGHT = 48 * scaleHeight;

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
        {/* TOP ROW */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* BACK */}
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

          {/* ICONS */}
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
              onPress={() => router.push('/notifications')}
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

        {/* TITLE */}
        <View style={{ marginBottom: 120, marginLeft: 10 }}>
          <Text
            style={{
              fontSize: headerFontSize,
              fontWeight: '600',
              color: '#fff',
            }}
          >
            Change Password
          </Text>
          <Text
            style={{
              fontSize: 14 * scaleWidth,
              color: '#E5E7EB',
              marginTop: 4,
            }}
          >
            Update your account password
          </Text>
        </View>
      </View>

      {/* WHITE CARD */}
      <View
        style={{
          position: 'absolute',
          top: 230 * scaleHeight,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#fff',
          borderTopLeftRadius: CARD_RADIUS * scaleWidth,
          borderTopRightRadius: CARD_RADIUS * scaleWidth,
          paddingHorizontal: 24 * scaleWidth,
          paddingTop: 28 * scaleHeight,
          shadowColor: '#000',
          shadowOpacity: 0.06,
          shadowOffset: { width: 0, height: -2 },
          shadowRadius: 10,
          elevation: 4,
        }}
      >
        <View style={{ flex: 1 }}>
          {/* CURRENT */}
          <View style={{ marginTop: 52 }}>
            <FieldLabel text="Current Password" />
            <PasswordInput
              width={FIELD_WIDTH}
              height={FIELD_HEIGHT}
              value={currentPassword}
              onChangeText={setCurrentPassword}
              secureTextEntry={!showCurrent}
              onToggleVisibility={() => setShowCurrent(v => !v)}
            />
            <Text style={styles.helperText}>Password strength: Medium</Text>
          </View>

          {/* NEW */}
          <View style={{ marginTop: 20 }}>
            <FieldLabel text="New Password" />
            <PasswordInput
              width={FIELD_WIDTH}
              height={FIELD_HEIGHT}
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry={!showNew}
              onToggleVisibility={() => setShowNew(v => !v)}
            />

            <Text style={styles.helperText}>
              Password must be at least 6 characters long
            </Text>

            <View
              style={{
                marginTop: 25,
                height: 4,
                backgroundColor: '#E5E7EB',
                borderRadius: 2,
                overflow: 'hidden',
                width: FIELD_WIDTH,
                alignSelf: 'center',
              }}
            >
              <View
                style={{
                  height: '100%',
                  width:
                    newPassword.length === 0
                      ? '50%'
                      : newPassword.length < 6
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

            <Text
              style={[
                styles.helperText,
                { marginTop: 4, color: '#4C1D95', fontWeight: '500' },
              ]}
            >
              {getStrengthLabel()}
            </Text>
          </View>

          {/* CONFIRM */}
          <View style={{ marginTop: 20 }}>
            <FieldLabel text="Confirm New Password" />
            <PasswordInput
              width={FIELD_WIDTH}
              height={FIELD_HEIGHT}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirm}
              onToggleVisibility={() => setShowConfirm(v => !v)}
            />

            <Text style={styles.helperText}>
              Re-enter your new password
            </Text>

            {passwordsMatch && (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                  paddingLeft: 9,
                }}
              >
                <Ionicons name="checkmark-circle" size={16} color="#16A34A" />
                <Text
                  style={{
                    marginLeft: 4,
                    fontSize: 12,
                    color: '#16A34A',
                    fontWeight: '500',
                  }}
                >
                  Passwords match
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* BUTTON */}
        <TouchableOpacity
          onPress={() => router.push('/PasswordUpdateScreen')}
          style={{
            marginBottom: 70 * scaleHeight,
            backgroundColor: '#4B0082',
            borderRadius: 12,
            height: 52,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>
            Update Password
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

/* REUSABLE COMPONENTS */

const FieldLabel = ({ text }) => (
  <Text
    style={{
      fontSize: 14,
      color: '#4B5563',
      marginBottom: 6,
      fontWeight: '400',
      paddingLeft: 15,
    }}
  >
    {text}
  </Text>
);

const PasswordInput = ({
  width,
  height,
  value,
  onChangeText,
  secureTextEntry,
  onToggleVisibility,
}) => (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#E5E7EB',
      backgroundColor: '#F9FAFB',
      paddingHorizontal: 14,
      height,
      width,
      alignSelf: 'center',
    }}
  >
    <TextInput
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      style={{ flex: 1, fontSize: 14, color: '#111827' }}
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
  helperText: {
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 4,
    fontWeight: '400',
    paddingLeft: 14,
  },
});
