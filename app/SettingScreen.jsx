import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Switch,
  StyleSheet,
  ScrollView,
  Animated,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function SettingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const CARD_RADIUS = 60;
  const scaleWidth = SCREEN_WIDTH / 414;
  const scaleHeight = SCREEN_HEIGHT / 896;
  const headerFontSize = Math.min(28, SCREEN_WIDTH * 0.07);

  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const [languageDropdownVisible, setLanguageDropdownVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const togglePush = () => setPushEnabled(prev => !prev);
  const toggleEmail = () => setEmailEnabled(prev => !prev);
  const toggleDark = () => setDarkMode(prev => !prev);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ja', name: '日本語' }
  ];

  const handleLanguageChange = (langCode, langName) => {
    setSelectedLanguage(langName);
    setLanguageDropdownVisible(false);
  };

  // Animation for dropdown
  const [dropdownAnim] = useState(new Animated.Value(0));

  const toggleDropdown = () => {
    setLanguageDropdownVisible(prev => !prev);
    Animated.timing(dropdownAnim, {
      toValue: languageDropdownVisible ? 0 : 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const dropdownHeight = dropdownAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, languages.length * 42], // height per item
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#3e0288' }}>
      {/* PURPLE HEADER */}
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

        {/* Title - Positioned at bottom of purple container */}
        <View style={{ marginBottom: 120, marginLeft: 10 }}>
          <Text
            style={{
              fontSize: headerFontSize,
              fontWeight: '600',
              color: '#fff',
            }}
          >
            Setting
          </Text>
          <Text
            style={{
              fontSize: 14 * scaleWidth,
              color: '#E5E7EB',
              marginTop: 4,
            }}
          >
            Choose Your Preferences
          </Text>
        </View>
      </View>

      {/* WHITE CARD CONTENT */}
      <ScrollView
        style={{
          position: 'absolute',
          top: 220 * scaleHeight,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#fff',
          borderTopLeftRadius: CARD_RADIUS * scaleWidth,
          borderTopRightRadius: CARD_RADIUS * scaleWidth,
          paddingHorizontal: 24 * scaleWidth,
          paddingTop: 24 * scaleHeight,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 4 },
          shadowRadius: 8,
          elevation: 8,
        }}
        contentContainerStyle={{
          paddingBottom: insets.bottom,
        }}
      >
        {/* Notification Preferences */}
        <SectionTitle label="Notification Preferences" />
        <View style={styles.notificationContainer}>
          <SettingsRow
            customIcon={
              <Image
                source={require('../assets/images/notify.svg')}
                style={{ width: 18, height: 18 }}
                contentFit="contain"
              />
            }
            label="Push Notifications"
            rightComponent={<PurpleSwitch value={pushEnabled} onValueChange={togglePush} />}
            showSeparator={true}
          />
        <View style={{ height: 1, backgroundColor: '#E5E7EB', width: '100%' }} />


        <SettingsRow
            customIcon={
              <Image
                source={require('../assets/images/email.svg')}
                style={{ width: 18, height: 18 }}
                contentFit="contain"
              />
            }
            label="Email Notifications"
            rightComponent={<PurpleSwitch value={emailEnabled} onValueChange={toggleEmail} />}
            showSeparator={false}
          />
        </View>

        {/* App Preferences */}
        <SectionTitle label="App Preferences" style={{ marginTop: 18 }} />
        <View style={styles.notificationContainer}>
          <TouchableOpacity onPress={toggleDropdown} activeOpacity={0.7}>
            <SettingsRow
              customIcon={
                <Image
                  source={require('../assets/images/language.svg')}
                  style={{ width: 18, height: 18 }}
                  contentFit="contain"
                />
              }
              label="Language"
              rightComponent={
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.secondaryText}>{selectedLanguage}</Text>
                  <Ionicons
                    name={languageDropdownVisible ? 'chevron-up' : 'chevron-down'}
                    size={18}
                    color="#9CA3AF"
                    style={{ marginLeft: 4 }}
                  />
                </View>
              }
              showSeparator={true}
            />
          </TouchableOpacity>

          {/* Right-aligned dropdown list */}
          {languageDropdownVisible && (
            <Animated.View style={[styles.rightDropdownContainer, { height: dropdownHeight }]}>
              {languages.map(lang => (
                <TouchableOpacity
                  key={lang.code}
                  style={styles.rightDropdownItem}
                  onPress={() => {
                    handleLanguageChange(lang.code, lang.name);
                  }}
                >
                  <Text style={styles.dropdownText}>{lang.name}</Text>
                </TouchableOpacity>
              ))}
            </Animated.View>
          )}
          <View style={{ height: 1, backgroundColor: '#E5E7EB', width: '100%' }} />


          <SettingsRow
            customIcon={
              <Image
                source={require('../assets/images/mode.svg')}
                style={{ width: 18, height: 18 }}
                contentFit="contain"
              />
            }
            label="Dark Mode"
            rightComponent={<PurpleSwitch value={darkMode} onValueChange={toggleDark} />}
            showSeparator={false}
          />
        </View>

        {/* Account Settings */}
        <SectionTitle label="Account Settings" style={{ marginTop: 18 }} />
        <View style={styles.notificationContainer}>
          <TouchableOpacity activeOpacity={0.7} onPress={() => router.push('/ChangePasswordScreen')}>
            <SettingsRow
              customIcon={
                <Image
                  source={require('../assets/images/password.svg')}
                  style={{ width: 18, height: 18 }}
                  contentFit="contain"
                />
              }
              label="Change Password"
              rightComponent={<Ionicons name="chevron-forward" size={18} color="#9CA3AF" />}
              showSeparator={true}
            />
          </TouchableOpacity>

          <View style={{ height: 1, backgroundColor: '#E5E7EB', width: '100%' }} />
          <SettingsRow
            customIcon={
              <Image
                source={require('../assets/images/help.svg')}
                style={{ width: 18, height: 18 }}
                contentFit="contain"
              />
            }
            label="Help & Support"
            rightComponent={<Ionicons name="chevron-forward" size={18} color="#9CA3AF" />}
            showSeparator={false}
          />
        </View>

        {/* Logout Row - Aligned without container */}
        <View style={{ width: 358, alignSelf: 'center', paddingHorizontal: 16, marginTop: 12 }}>
          <TouchableOpacity activeOpacity={0.7} onPress={() => { /* logout logic */ }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 8 }}>
              <View style={{ width: 32, height: 32, marginRight: 14, justifyContent: 'center', alignItems: 'center' }}>
                <Ionicons name="log-out-outline" size={18} color="#E91B1B" />
              </View>
              <Text style={[styles.primaryText, { color: '#E91B1B' }]}>Log Out</Text>
            </View>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

/* Reusable components */
const SectionTitle = ({ label, style }) => (
  <Text
    style={[
      { fontSize: 14, color: '#9CA3AF', fontWeight: '400', letterSpacing:0, marginBottom: 4, marginTop: 8 },
      style,
    ]}
  >
    {label}
  </Text>
);

const SettingsRow = ({ icon, iconBg, iconColor = '#6D28D9', label, rightComponent, labelStyle, showSeparator = false, customIcon }) => (
  <View style={showSeparator ? { borderBottomWidth: 1, borderBottomColor: '#E5E7EB' } : {}}>
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {customIcon ? (
          <View style={{ width: 32, height: 32, marginRight: 14, justifyContent: 'center', alignItems: 'center' }}>
            {customIcon}
          </View>
        ) : (
          <View style={{ width: 32, height: 32, borderRadius: 10, backgroundColor: iconBg, justifyContent: 'center', alignItems: 'center', marginRight: 14 }}>
            <Ionicons name={icon} size={18} color={iconColor} />
          </View>
        )}
        <Text style={[styles.primaryText, labelStyle]}>{label}</Text>
      </View>
      {rightComponent}
    </View>
  </View>
);

const PurpleSwitch = ({ value, onValueChange }) => (
  <Switch
    value={value}
    onValueChange={onValueChange}
    trackColor={{ false: '#E5E7EB', true: '#6D28D9' }}
    thumbColor="#ffffff"
    ios_backgroundColor="#E5E7EB"
  />
);

const styles = StyleSheet.create({
  primaryText: { fontSize: 14, color: '#111827', fontWeight: '500' },
  secondaryText: { fontSize: 13, color: '#6B7280', fontWeight: '500' },
  rightDropdownContainer: {
    position: 'absolute',
    top: 50,
    right: 0,
    width: 120,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 2,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    zIndex: 1000,
    overflow: 'hidden',
  },
  rightDropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  dropdownText: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '500',
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

  notificationContainer: {
    width: 358,
    minHeight: 115,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 6,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 0.75,
  },
});

