import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const CARD_WIDTH = 353;
const CARD_HEIGHT = 140;

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

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back-outline" size={18} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsBtn}>
          <Ionicons name="settings-outline" size={20} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NotificationCard item={item} />}
        contentContainerStyle={{ paddingBottom: 40 }}
        ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
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
    <View style={styles.card}>
      {/* Title Row */}
      <View style={styles.titleRow}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText} numberOfLines={2}>
            {item.title}
          </Text>
        </View>
        <Ionicons name={iconName} size={18} color={iconColor} />
      </View>

      {/* Subtitle */}
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitleText} numberOfLines={2}>
          {item.description}
        </Text>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Time */}
      <Text style={styles.timeText}>{item.time}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 20,
  },

  backBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },

  settingsBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderTopWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRightWidth: 3,
    borderBottomWidth: 3,
    borderColor: '#000',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },

  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  /* 🔹 TITLE SPECS */
  titleContainer: {
    width: 317,
    height: 75,
    justifyContent: 'center',
  },

  titleText: {
    fontFamily: 'SF Compact Rounded',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 19,
    letterSpacing: 0,
    color: '#111827',
  },

  /* 🔹 SUBTITLE SPECS */
  subtitleContainer: {
    width: 267,
    height: 75,
    justifyContent: 'center',
  },

  subtitleText: {
    fontFamily: 'SF Compact Rounded',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 14,
    letterSpacing: 0,
    color: '#4B5563',
  },

  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#000',
    marginVertical: 6,
  },

  timeText: {
    fontSize: 10,
    color: '#9CA3AF',
  },
});  