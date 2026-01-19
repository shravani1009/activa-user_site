

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


const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

const LAYOUT = {
  headerHeight: 260,
  cardBorderRadius: 60,
  cardTopPosition: 220,
  containerPadding: 24,
  containerWidth: SCREEN_WIDTH - (SPACING.lg * 2), // Responsive width
  iconContainerSize: 32,
  iconSize: 18,
  buttonSize: 40,
};

const COLORS = {
  primary: '#3e0288',
  white: '#FFFFFF',
  border: '#E5E7EB',
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  error: '#E91B1B',
};

export default function SettingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Responsive scaling
  const scaleWidth = SCREEN_WIDTH / 414;
  const scaleHeight = SCREEN_HEIGHT / 896;
  const headerFontSize = Math.min(28, SCREEN_WIDTH * 0.07);

  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [languageDropdownVisible, setLanguageDropdownVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [dropdownAnim] = useState(new Animated.Value(0));

  const togglePush = () => setPushEnabled(prev => !prev);
  const toggleEmail = () => setEmailEnabled(prev => !prev);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ja', name: '日本語' }
  ];

  const handleLanguageChange = (langCode, langName) => {
    setSelectedLanguage(langName);
    setLanguageDropdownVisible(false);
  };

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
    outputRange: [0, languages.length * 42],
  });

  const styles = getStyles(scaleWidth, scaleHeight);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* PURPLE HEADER */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back-outline" size={18 * scaleWidth} color={COLORS.white} />
          </TouchableOpacity>

          <View style={styles.headerActions}>
            <TouchableOpacity
              onPress={() => router.push('/SettingScreen')}
              style={styles.iconBtn}
            >
              <Ionicons name="settings-outline" size={20 * scaleWidth} color={COLORS.white} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push('/NotificationScreen')}
              style={[styles.iconBtn, styles.iconBtnTransparent]}
            >
              <Ionicons name="notifications-outline" size={20 * scaleWidth} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Title - Positioned at bottom of purple container */}
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Setting</Text>
          <Text style={styles.headerSubtitle}>Choose Your Preferences</Text>
        </View>
      </View>

      {/* WHITE CARD CONTENT */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{
          paddingBottom: insets.bottom + SPACING.lg * scaleHeight,
        }}
      >
        {/* Notification Preferences */}
        <SectionTitle label="Notification Preferences" />
        <View style={styles.settingsCard}>
          <SettingsRow
            customIcon={
              <Image
                source={require('../assets/images/notify.svg')}
                style={styles.iconImage}
                contentFit="contain"
              />
            }
            label="Push Notifications"
            rightComponent={<PurpleSwitch value={pushEnabled} onValueChange={togglePush} />}
          />
          <Separator />
          <SettingsRow
            customIcon={
              <Image
                source={require('../assets/images/email.svg')}
                style={styles.iconImage}
                contentFit="contain"
              />
            }
            label="Email Notifications"
            rightComponent={<PurpleSwitch value={emailEnabled} onValueChange={toggleEmail} />}
          />
        </View>

        {/* App Preferences */}
        <SectionTitle label="App Preferences" style={styles.sectionSpacing} />
        <View style={styles.settingsCard}>
          <TouchableOpacity onPress={toggleDropdown} activeOpacity={0.7}>
            <SettingsRow
              customIcon={
                <Image
                  source={require('../assets/images/language.svg')}
                  style={styles.iconImage}
                  contentFit="contain"
                />
              }
              label="Language"
              rightComponent={
                <View style={styles.languageSelector}>
                  <Text style={styles.secondaryText}>{selectedLanguage}</Text>
                  <Ionicons
                    name={languageDropdownVisible ? 'chevron-up' : 'chevron-down'}
                    size={18}
                    color={COLORS.textTertiary}
                    style={styles.chevronIcon}
                  />
                </View>
              }
            />
          </TouchableOpacity>

          {/* Dropdown list */}
          {languageDropdownVisible && (
            <Animated.View style={[styles.dropdown, { height: dropdownHeight }]}>
              {languages.map(lang => (
                <TouchableOpacity
                  key={lang.code}
                  style={styles.dropdownItem}
                  onPress={() => handleLanguageChange(lang.code, lang.name)}
                >
                  <Text style={styles.dropdownText}>{lang.name}</Text>
                </TouchableOpacity>
              ))}
            </Animated.View>
          )}
        </View>

        {/* Account Settings */}
        <SectionTitle label="Account Settings" style={styles.sectionSpacing} />
        <View style={styles.settingsCard}>
          <TouchableOpacity 
            activeOpacity={0.7} 
            onPress={() => router.push('/ChangePasswordScreen')}
          >
            <SettingsRow
              customIcon={
                <Image
                  source={require('../assets/images/password.svg')}
                  style={styles.iconImage}
                  contentFit="contain"
                />
              }
              label="Change Password"
              rightComponent={
                <Ionicons name="chevron-forward" size={18} color={COLORS.textTertiary} />
              }
            />
          </TouchableOpacity>

          <Separator />

          <TouchableOpacity activeOpacity={0.7}>
            <SettingsRow
              customIcon={
                <Image
                  source={require('../assets/images/help.svg')}
                  style={styles.iconImage}
                  contentFit="contain"
                />
              }
              label="Help & Support"
              rightComponent={
                <Ionicons name="chevron-forward" size={18} color={COLORS.textTertiary} />
              }
            />
          </TouchableOpacity>
        </View>

        {/* Logout Row */}
        <View style={styles.logoutContainer}>
          <TouchableOpacity activeOpacity={0.7} onPress={() => { /* logout logic */ }}>
            <View style={styles.logoutRow}>
              <View style={styles.iconContainer}>
                <Ionicons name="log-out-outline" size={18} color={COLORS.error} />
              </View>
              <Text style={styles.logoutText}>Log Out</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* Reusable Components */
const SectionTitle = ({ label, style }) => (
  <Text style={[styles.sectionTitle, style]}>
    {label}
  </Text>
);

const SettingsRow = ({ customIcon, label, rightComponent }) => (
  <View style={styles.row}>
    <View style={styles.rowLeft}>
      <View style={styles.iconContainer}>
        {customIcon}
      </View>
      <Text style={styles.primaryText}>{label}</Text>
    </View>
    {rightComponent}
  </View>
);

const Separator = () => (
  <View style={styles.separator} />
);

const PurpleSwitch = ({ value, onValueChange }) => (
  <Switch
    value={value}
    onValueChange={onValueChange}
    trackColor={{ false: COLORS.border, true: '#6D28D9' }}
    thumbColor={COLORS.white}
    ios_backgroundColor={COLORS.border}
  />
);

const getStyles = (scaleWidth, scaleHeight) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  header: {
    height: LAYOUT.headerHeight * scaleHeight,
    paddingHorizontal: 20 * scaleWidth,
    paddingTop: 30 * scaleHeight,
    justifyContent: 'space-between',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    width: 32 * scaleWidth,
    height: 32 * scaleHeight,
    borderRadius: 8 * scaleWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerActions: {
    flexDirection: 'row',
  },
  iconBtn: {
    width: LAYOUT.buttonSize * scaleWidth,
    height: LAYOUT.buttonSize * scaleWidth,
    borderRadius: 20 * scaleWidth,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    backgroundColor: 'rgba(227,227,227,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: SPACING.sm * scaleWidth,
  },
  iconBtnTransparent: {
    backgroundColor: 'transparent',
  },
  headerTitleContainer: {
    marginBottom: 120 * scaleHeight,
    marginLeft: 10 * scaleWidth,
  },
  headerTitle: {
    fontSize: 28 * scaleWidth,
    fontWeight: '600',
    color: COLORS.white,
  },
  headerSubtitle: {
    fontSize: 14 * scaleWidth,
    color: COLORS.border,
    marginTop: 4 * scaleHeight,
  },
  scrollView: {
    position: 'absolute',
    top: LAYOUT.cardTopPosition * scaleHeight,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: LAYOUT.cardBorderRadius * scaleWidth,
    borderTopRightRadius: LAYOUT.cardBorderRadius * scaleWidth,
    paddingHorizontal: LAYOUT.containerPadding * scaleWidth,
    paddingTop: LAYOUT.containerPadding * scaleHeight,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 8,
  },
  sectionTitle: {
    fontSize: 14,
    color: COLORS.textTertiary,
    fontWeight: '400',
    letterSpacing: 0,
    marginBottom: 4,
    marginTop: SPACING.sm,
  },
  sectionSpacing: {
    marginTop: 18,
  },
  settingsCard: {
    width: LAYOUT.containerWidth,
    minHeight: 60,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.sm,
    paddingBottom: 6,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 0.75,
    overflow: 'visible',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.sm,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: LAYOUT.iconContainerSize,
    height: LAYOUT.iconContainerSize,
    marginRight: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    width: LAYOUT.iconSize,
    height: LAYOUT.iconSize,
  },
  primaryText: {
    fontSize: 14,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  secondaryText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: -SPACING.md,
  },
  languageSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chevronIcon: {
    marginLeft: 4,
  },
  dropdown: {
    position: 'absolute',
    top: 50,
    right: 0,
    width: 120,
    backgroundColor: COLORS.white,
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
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  dropdownText: {
    fontSize: 14,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  logoutContainer: {
    width: LAYOUT.containerWidth,
    alignSelf: 'center',
    paddingHorizontal: SPACING.md,
    marginTop: 12,
  },
  logoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  logoutText: {
    fontSize: 14,
    color: COLORS.error,
    fontWeight: '500',
  },
});

const styles = getStyles(SCREEN_WIDTH / 414, SCREEN_HEIGHT / 896);

