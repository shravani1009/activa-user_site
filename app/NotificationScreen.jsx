import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base dimensions for reference (assuming design was for ~390px width)
const BASE_WIDTH = 390;
const BASE_HEIGHT = 844;

// Responsive scaling functions
const scaleWidth = (size) => (size / BASE_WIDTH) * SCREEN_WIDTH;
const scaleHeight = (size) => (size / BASE_HEIGHT) * SCREEN_HEIGHT;

const CARD_WIDTH = scaleWidth(353);
const CARD_HEIGHT = scaleHeight(114);

export default function NotificationScreen() {
  const router = useRouter();

  const notifications = [
    {
      id: '1',
      title: 'Quiz Completed Successfully',
      description: 'You have successfully completed the quiz.',
      time: '30 mins ago',
      type: 'success',
    },
    {
      id: '2',
      title: 'Quiz Reminder',
      description: 'Don’t forget to complete your pending quiz.',
      time: '10 mins ago',
      type: 'warning',
    },
    {
      id: '3',
      title: 'Next Module Locked',
      description: 'You need to complete previous module to unlock next.',
      time: '5 mins ago',
      type: 'lock',
    },
  ];

  const renderItem = ({ item }) => <NotificationCard item={item} />;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: scaleHeight(60),
          paddingHorizontal: scaleWidth(20),
          marginBottom: scaleHeight(16),
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            width: scaleWidth(32),
            height: scaleHeight(32),
            borderRadius: scaleWidth(8),
            backgroundColor: '#E5E7EB',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Ionicons
            name="arrow-back-outline"
            size={scaleWidth(18)}
            color="#000"
            style={{ marginTop: scaleHeight(4) }}
          />
        </TouchableOpacity>

        {/* Right icons: Settings first, then Notification */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {/* Settings Icon */}
          <TouchableOpacity
            onPress={() => router.push('/SettingScreen')}
            style={{
              width: scaleWidth(40),
              height: scaleHeight(40),
              borderRadius: scaleWidth(12),
              backgroundColor: '#F3F4F6',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: scaleWidth(8),
            }}
          >
            <Ionicons
              name="settings-outline"
              size={scaleWidth(20)}
              color="#000"
              style={{ marginTop: scaleHeight(4) }}
            />
          </TouchableOpacity>

          {/* Notification Icon */}
          <TouchableOpacity
            style={{
              width: scaleWidth(40),
              height: scaleHeight(40),
              borderRadius: scaleWidth(12),
              backgroundColor: '#3E0288', // changed background
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Ionicons
              name="notifications-outline"
              size={scaleWidth(20)}
              color="#fff" // white icon for contrast
              style={{ marginTop: scaleHeight(4) }}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Title and Mark All Read Section */}
      <View
        style={{
          paddingHorizontal: scaleWidth(28),
          marginBottom: scaleHeight(24),
        }}
      >
        {/* Title */}
        <View
          style={{
            width: scaleWidth(176),
            height: scaleHeight(40),
            marginBottom: scaleHeight(10),
            justifyContent: 'center',
            marginTop: scaleHeight(14),
          }}
        >
          <Text
            style={{
              fontFamily: 'SF Compact Rounded',
              fontWeight: '600',
              fontStyle: 'SemiBold',
              fontSize: scaleWidth(30),
              lineHeight: scaleHeight(36),
              letterSpacing: 0,
              color: '#000000',
            }}
          >
            Notifications
          </Text>
        </View>

        {/* Subtitle with line exactly under text */}
        <View style={{ justifyContent: 'flex-start' }}>
          <TouchableOpacity>
            <Text
              style={{
                fontFamily: 'SF Compact Rounded',
                fontWeight: '400',
                fontSize: scaleWidth(12),
                lineHeight: scaleHeight(14),
                letterSpacing: 0,
                color: '#686D76',
              }}
            >
              Mark all read
            </Text>
          </TouchableOpacity>
          {/* Line exactly under text */}
          <View
            style={{
              height: StyleSheet.hairlineWidth,
              backgroundColor: '#000',
              width: scaleWidth(71),
              marginTop: scaleHeight(2),
            }}
          />
        </View>
      </View>

      {/* Notifications List */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingTop: 0,
          paddingBottom: scaleHeight(40),
          alignItems: 'center',
        }}
        ItemSeparatorComponent={() => <View style={{ height: scaleHeight(24) }} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const NotificationCard = ({ item }) => {
  const iconName =
    item.type === 'success'
      ? 'checkmark-circle'
      : item.type === 'warning'
      ? 'alert-circle'
      : 'lock-closed';

  const iconColor =
    item.type === 'success'
      ? '#22C55E'
      : item.type === 'warning'
      ? '#FACC15'
      : '#F97373';

  return (
    <View
      style={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        borderTopWidth: 0.5,
        borderLeftWidth: 0.5,
        borderRightWidth: scaleWidth(3),
        borderBottomWidth: scaleHeight(3),
        borderColor: '#000',
        borderRadius: scaleWidth(10),
        backgroundColor: '#fff',
        paddingHorizontal: scaleWidth(16),
        paddingVertical: scaleHeight(10),
        justifyContent: 'space-between',
      }}
    >
      {/* Title + Icon */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text
          numberOfLines={1}
          style={{
            fontSize: scaleWidth(14),
            fontWeight: '400',
            marginRight: scaleWidth(8),
            flex: 1,
            color: '#111827',
          }}
        >
          {item.title}
        </Text>
        {/* Notification icon slightly lower */}
        <Ionicons
          name={iconName}
          size={scaleWidth(18)}
          color={iconColor}
          style={{ marginTop: scaleHeight(4) }}
        />
      </View>

      {/* Description */}
      <Text
        numberOfLines={2}
        style={{ fontSize: scaleWidth(12), fontWeight: '400', color: '#4B5563' }}
      >
        {item.description}
      </Text>

      {/* Separator */}
      <View
        style={{
          marginTop: scaleHeight(8),
          marginBottom: scaleHeight(2),
          height: StyleSheet.hairlineWidth,
          backgroundColor: '#000',
        }}
      />

      {/* Time */}
      <Text style={{ fontSize: scaleWidth(10), color: '#9CA3AF' }}>{item.time}</Text>
    </View>
  );
};
