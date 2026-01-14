import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  FlatList,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const scaleWidth = SCREEN_WIDTH / 414;
const scaleHeight = SCREEN_HEIGHT / 896;
const headerFontSize = Math.min(28, SCREEN_WIDTH * 0.07);

// exact design base sizes
const CARD_WIDTH = 353;
const CARD_HEIGHT = 125;

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
      {/* Header: Back on left, Settings on right */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 20,
          marginTop: 20,
          marginBottom: 20,
          paddingHorizontal: 20 * scaleWidth,
        }}
      >
        {/* Left: Back */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            backgroundColor: '#E5E7EB',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Ionicons name="arrow-back-outline" size={18} color="#000" />
        </TouchableOpacity>

        {/* Right: Settings */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => router.push('/settings')}
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              backgroundColor: '#F3F4F6',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 8,
            }}
          >
            <Ionicons name="settings-outline" size={20} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Screen Title + Mark All Read */}
      <View
        style={{
          paddingHorizontal: 20 * scaleWidth,
          marginBottom: 16,
        }}
      >
        <Text
          style={{
            fontSize: headerFontSize,
            fontWeight: '600',
            color: '#111827',
          }}
        >
          Notifications
        </Text>

        <TouchableOpacity>
          <Text
            style={{
              marginTop: 4 * scaleHeight,
              fontSize: 12 * scaleWidth,
              fontWeight: '500',
              color: '#4C1D95',
            }}
          >
            Mark All Read
          </Text>
        </TouchableOpacity>
      </View>

      {/* Notifications List */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingTop: 16 * scaleHeight,
          paddingHorizontal: 0,
          alignItems: 'center',
          paddingBottom: 40 * scaleHeight,
        }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const NotificationCard = ({ item }) => {
  const w = CARD_WIDTH * scaleWidth;
  const h = CARD_HEIGHT * scaleHeight;

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
        width: w,
        height: h,
        borderRadius: 10,
        borderColor: '#000000',
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 3,
        borderBottomWidth: 3,
        paddingHorizontal: 16,
        paddingVertical: 10,
        marginBottom: 12 * scaleHeight,
        backgroundColor: 'white',
        justifyContent: 'space-between',
      }}
    >
      {/* title + icon */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text
          numberOfLines={1}
          style={{ fontSize: 14, fontWeight: '400', marginRight: 8, flex: 1, color: '#111827' }}
        >
          {item.title}
        </Text>
        <Ionicons name={iconName} size={18} color={iconColor} />
      </View>

      {/* description */}
      <Text
        numberOfLines={2}
        style={{ fontSize: 12, fontWeight: '400', color: '#4B5563' }}
      >
        {item.description}
      </Text>

      {/* separator line */}
      <View
        style={{
          marginTop: 8,
          marginBottom: 2,
          height: StyleSheet.hairlineWidth,
          backgroundColor: 'black',
          alignSelf: 'stretch',
        }}
      />

      {/* time */}
      <Text style={{ fontSize: 10, marginTop: 0, color: '#9CA3AF' }}>
        {item.time}
      </Text>
    </View>
  );
};
