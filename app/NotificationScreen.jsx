// import React from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
//   Dimensions,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Ionicons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';

// const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// // Base dimensions for reference (assuming design was for ~390px width)
// const BASE_WIDTH = 390;
// const BASE_HEIGHT = 844;

// // Responsive scaling functions
// const scaleWidth = (size) => (size / BASE_WIDTH) * SCREEN_WIDTH;
// const scaleHeight = (size) => (size / BASE_HEIGHT) * SCREEN_HEIGHT;

// const CARD_WIDTH = scaleWidth(353);
// const CARD_HEIGHT = scaleHeight(114);

// export default function NotificationScreen() {
//   const router = useRouter();
  
//   // Calculate card container boundaries (cards are centered)
//   const cardLeftPadding = (SCREEN_WIDTH - CARD_WIDTH) / 2;
//   // Account for card's right border (borderRightWidth: scaleWidth(3))
//   const cardRightEdge = cardLeftPadding + CARD_WIDTH + scaleWidth(3);
//   // Align notification icon's right edge with card's visual right edge
//   const headerRightPadding = SCREEN_WIDTH - cardRightEdge;

//   const notifications = [
//     {
//       id: '1',
//       title: 'Quiz Completed Successfully',
//       description: 'You have passed the quiz and can now proceed',
//       description2: 'to the next module.',
//       time: '30 mins ago',
//       type: 'success',
//     },
//     {
//       id: '2',
//       title: 'Quiz Reminder',
//       description: 'Please complete the pending quiz to stay',
//       description2: 'on track with your training schedule.',
//       time: '10 mins ago',
//       type: 'warning',
//     },
//     {
//       id: '3',
//       title: 'Next Module Locked',
//       description: 'Complete the current quiz to unlock',
//       description2: 'the next training module.',
//       time: '5 mins ago',
//       type: 'lock',
//     },
//   ];

//   const renderItem = ({ item }) => <NotificationCard item={item} />;

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
//       {/* Header */}
//       <View
//         style={{
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           paddingTop: scaleHeight(40), // moved icons slightly higher
//           paddingLeft: cardLeftPadding,
//           paddingRight: headerRightPadding,
//           marginBottom: scaleHeight(16),
//         }}
//       >
//         <TouchableOpacity
//           onPress={() => router.back()}
//           style={{
//             width: scaleWidth(32),
//             height: scaleHeight(32),
//             borderRadius: scaleWidth(8),
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}
//         >
//           <Ionicons
//             name="arrow-back-outline"
//             size={scaleWidth(18)}
//             color="#000"
//             style={{ marginTop: scaleHeight(0) }} // slightly moved up
//           />
//         </TouchableOpacity>

//         <View style={{ flexDirection: 'row' }}>
//           <TouchableOpacity
//             onPress={() => router.push('/SettingScreen')}
//             style={{
//               width: 40,
//               height: 40,
//               borderRadius: 20,
//               backgroundColor: 'rgba(62, 2, 136, 0.05)',
//               alignItems: 'center',
//               justifyContent: 'center',
//               marginLeft: 8,
//             }}
//           >
//             <Ionicons name="settings-outline" size={20} color="#3E0288" />
//           </TouchableOpacity>

//           <TouchableOpacity
//             onPress={() => router.push('/NotificationScreen')}
//             style={{
//               width: 40,
//               height: 40,
//               borderRadius: 20,
//               borderWidth: 1,
//               borderColor: '#E5E7EB',
//               backgroundColor: '#3E0288',
//               alignItems: 'center',
//               justifyContent: 'center',
//               marginLeft: 8,
//             }}
//           >
//             <Ionicons name="notifications-outline" size={20} color="#fff" />
//           </TouchableOpacity>
          
//         </View>
//       </View>

//       {/* Title and Mark All Read Section */}
//       <View
//         style={{
//           paddingHorizontal: scaleWidth(28),
//           marginBottom: scaleHeight(24),
//           marginTop: -scaleHeight(8), // reduce space between back arrow and title
//         }}
//       >
//         {/* Title */}
//         <View
//           style={{
//             width: scaleWidth(176),
//             height: scaleHeight(40),
//             marginBottom: scaleHeight(10),
//             justifyContent: 'center',
//             marginTop: scaleHeight(4),
//           }}
//         >
//           <Text
//             style={{
//               fontFamily: 'SF Compact Rounded',
//               fontWeight: '600',
//               fontStyle: 'SemiBold',
//               fontSize: scaleWidth(30),
//               lineHeight: scaleHeight(36),
//               letterSpacing: 0,
//               color: '#000000',
//             }}
//           >
//             Notifications
//           </Text>
//         </View>

//         {/* Subtitle with line exactly under text */}
//         <View style={{ justifyContent: 'flex-start' }}>
//           <TouchableOpacity>
//             <Text
//               style={{
//                 marginTop:-scaleHeight(5),
//                 fontFamily: 'SF Compact Rounded',
//                 fontWeight: '400',
//                 fontSize: scaleWidth(12),
//                 lineHeight: scaleHeight(14),
//                 letterSpacing: 0,
//                 color: '#686D76',
//                 textDecorationLine: 'underline',
//               }}
//             >
//               Mark all read
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Notifications List */}
//       <FlatList
//         data={notifications}
//         keyExtractor={(item) => item.id}
//         renderItem={renderItem}
//         contentContainerStyle={{
//           paddingTop: 0,
//           paddingBottom: scaleHeight(40),
//           paddingLeft: cardLeftPadding,
//           paddingRight: cardLeftPadding,
//         }}
//         ItemSeparatorComponent={() => <View style={{ height: scaleHeight(24) }} />}
//         showsVerticalScrollIndicator={false}
//       />
//     </SafeAreaView>
//   );
// }

// const NotificationCard = ({ item }) => {
//   const iconName =
//     item.type === 'success'
//       ? 'checkmark-circle'
//       : item.type === 'warning'
//       ? 'alert-circle'
//       : 'lock-closed';

//   const iconColor =
//     item.type === 'success'
//       ? '#22C55E'
//       : item.type === 'warning'
//       ? '#FACC15'
//       : '#F97373';

//   return (
//     <View
//       style={{
//         width: CARD_WIDTH,
//         height: CARD_HEIGHT,
//         borderTopWidth: 0.5,
//         borderLeftWidth: 0.5,
//         borderRightWidth: scaleWidth(3),
//         borderBottomWidth: scaleHeight(3),
//         borderColor: '#000',
//         borderRadius: scaleWidth(10),
//         backgroundColor: '#fff',
//         paddingHorizontal: scaleWidth(16),
//         paddingVertical: scaleHeight(10),
//         justifyContent: 'space-between',
//       }}
//     >
//       {/* Title + Icon */}
//       <View
//         style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//         }}
//       >
//         <Text
//           numberOfLines={1}
//           style={{
//             fontSize: scaleWidth(14),
//             fontWeight: '400',
//             marginRight: scaleWidth(8),
//             flex: 1,
//             color: '#000000',
//             fontFamily: 'SF Compact Rounded',

//           }}
//         >
//           {item.title}
//         </Text>
//         {/* Notification icon slightly lower */}
//         <Ionicons
//           name={iconName}
//           size={scaleWidth(18)}
//           color={iconColor}
//           style={{ marginTop: scaleHeight(4) }}
//         />
//       </View>

//       {/* Description */}
//       <View style={{ width: 260 }}>
//         <Text
//           numberOfLines={2}
//           style={{ 
//             fontSize: scaleWidth(12), 
//             fontWeight: '400', 
//             color: '#6B7280',
//             flexWrap: 'wrap',
//           }}
//         >
//           {item.description} {item.description2 || ''}
//         </Text>
//       </View>

//       {/* Separator */}
//       <View
//         style={{
//           marginTop: scaleHeight(8),
//           marginBottom: scaleHeight(2),
//           marginHorizontal: -scaleWidth(16),
//           height: StyleSheet.hairlineWidth,
//           backgroundColor: '#080808',
//           width: CARD_WIDTH,
//         }}
//       />

//       {/* Time */}
//       <Text style={{ fontSize: scaleWidth(10),color: '6B7280' }}>{item.time}</Text>
//     </View>
//   );
// };


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

// Responsive scaling factors (matching ProfileScreen/ChangePasswordScreen pattern)
const scaleWidth = SCREEN_WIDTH / 414;
const scaleHeight = SCREEN_HEIGHT / 896;

// Design System - Fixed values
const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

const LAYOUT = {
  // Responsive card width with max limit
  cardWidth: Math.min(SCREEN_WIDTH - 48 * scaleWidth, 353 * scaleWidth),
  cardHeight: 114 * scaleHeight,
  containerPadding: 24 * scaleWidth,
  headerHeight: 40 * scaleHeight,
  iconSize: 40 * scaleWidth,
};

const COLORS = {
  primary: '#3E0288',
  white: '#FFFFFF',
  black: '#000000',
  border: '#E5E7EB',
  textPrimary: '#000000',
  textSecondary: '#6B7280',
  textTertiary: '#686D76',
  success: '#22C55E',
  warning: '#FACC15',
  error: '#F97373',
};

export default function NotificationScreen() {
  const router = useRouter();

  const notifications = [
    {
      id: '1',
      title: 'Quiz Completed Successfully',
      description: 'You have passed the quiz and can now proceed to the next module.',
      time: '30 mins ago',
      type: 'success',
    },
    {
      id: '2',
      title: 'Quiz Reminder',
      description: 'Please complete the pending quiz to stay on track with your training schedule.',
      time: '10 mins ago',
      type: 'warning',
    },
    {
      id: '3',
      title: 'Next Module Locked',
      description: 'Complete the current quiz to unlock the next training module.',
      time: '5 mins ago',
      type: 'lock',
    },
  ];

  const renderItem = ({ item }) => <NotificationCard item={item} />;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back-outline" size={18 * scaleWidth} color={COLORS.black} />
        </TouchableOpacity>

        <View style={styles.headerActions}>
          <TouchableOpacity
            onPress={() => router.push('/SettingScreen')}
            style={styles.settingsButton}
          >
            <Ionicons name="settings-outline" size={20 * scaleWidth} color={COLORS.primary} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/NotificationScreen')}
            style={styles.notificationButton}
          >
            <Ionicons name="notifications-outline" size={20 * scaleWidth} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Title Section */}
      <View style={styles.titleSection}>
        <Text style={styles.title}>Notifications</Text>
        <TouchableOpacity>
          <Text style={styles.markAllRead}>Mark all read</Text>
        </TouchableOpacity>
      </View>

      {/* Notifications List */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
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
      ? COLORS.success
      : item.type === 'warning'
      ? COLORS.warning
      : COLORS.error;

  return (
    <View style={styles.card}>
      {/* Title + Icon */}
      <View style={styles.cardHeader}>
        <Text numberOfLines={1} style={styles.cardTitle}>
          {item.title}
        </Text>
        <Ionicons name={iconName} size={18 * scaleWidth} color={iconColor} />
      </View>

      {/* Description */}
      <Text numberOfLines={2} style={styles.cardDescription}>
        {item.description}
      </Text>

      {/* Separator */}
      <View style={styles.cardSeparator} />

      {/* Time */}
      <Text style={styles.cardTime}>{item.time}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: LAYOUT.headerHeight,
    paddingHorizontal: LAYOUT.containerPadding,
    marginBottom: SPACING.md * scaleHeight,
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
  settingsButton: {
    width: LAYOUT.iconSize,
    height: LAYOUT.iconSize,
    borderRadius: 20 * scaleWidth,
    backgroundColor: 'rgba(62, 2, 136, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: SPACING.sm * scaleWidth,
  },
  notificationButton: {
    width: LAYOUT.iconSize,
    height: LAYOUT.iconSize,
    borderRadius: 20 * scaleWidth,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: SPACING.sm * scaleWidth,
  },
  titleSection: {
    paddingHorizontal: 28 * scaleWidth,
    marginBottom: SPACING.lg * scaleHeight,
  },
  title: {
    fontFamily: 'SF Compact Rounded',
    fontWeight: '600',
    fontSize: 30 * scaleWidth,
    lineHeight: 36 * scaleHeight,
    color: COLORS.textPrimary,
    marginBottom: 10 * scaleHeight,
  },
  markAllRead: {
    fontFamily: 'SF Compact Rounded',
    fontWeight: '400',
    fontSize: 12 * scaleWidth,
    lineHeight: 14 * scaleHeight,
    color: COLORS.textTertiary,
    textDecorationLine: 'underline',
  },
  listContent: {
    paddingHorizontal: LAYOUT.containerPadding,
    paddingBottom: 40 * scaleHeight,
  },
  separator: {
    height: SPACING.lg * scaleHeight,
  },
  card: {
    width: LAYOUT.cardWidth,
    minHeight: LAYOUT.cardHeight,
    borderTopWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRightWidth: 3 * scaleWidth,
    borderBottomWidth: 3 * scaleHeight,
    borderColor: COLORS.black,
    borderRadius: 10 * scaleWidth,
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.md * scaleWidth,
    paddingVertical: 10 * scaleHeight,
    alignSelf: 'center',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm * scaleHeight,
  },
  cardTitle: {
    fontSize: 14 * scaleWidth,
    fontWeight: '400',
    fontFamily: 'SF Compact Rounded',
    color: COLORS.textPrimary,
    flex: 1,
    marginRight: SPACING.sm * scaleWidth,
  },
  cardDescription: {
    fontSize: 12 * scaleWidth,
    fontWeight: '400',
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm * scaleHeight,
    lineHeight: 16 * scaleHeight,
  },
  cardSeparator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.black,
    marginHorizontal: -SPACING.md * scaleWidth,
    marginBottom: SPACING.xs * scaleHeight,
  },
  cardTime: {
    fontSize: 10 * scaleWidth,
    color: COLORS.textSecondary,
  },
});
