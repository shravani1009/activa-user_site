import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const truefalse = ({ question, selectedAnswer, onAnswerSelect, primaryColor = '#3E0288' }) => {
  const lightShade = '#F3E8FF';

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onAnswerSelect(true)}
        style={[
          styles.button,
          { backgroundColor: selectedAnswer === true ? lightShade : '#fff' }
        ]}
      >
        {/* Circle */}
        <View
          style={[
            styles.radioButton,
            { 
              borderColor: primaryColor,
              backgroundColor: selectedAnswer === true ? primaryColor : 'transparent'
            }
          ]}
        />

        <Text style={styles.buttonText}>
          True
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onAnswerSelect(false)}
        style={[
          styles.button,
          { backgroundColor: selectedAnswer === false ? lightShade : '#fff' }
        ]}
      >
        {/* Circle */}
        <View
          style={[
            styles.radioButton,
            { 
              borderColor: primaryColor,
              backgroundColor: selectedAnswer === false ? primaryColor : 'transparent'
            }
          ]}
        />

        <Text style={styles.buttonText}>
          False
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 170,
    height: 49,
    borderRadius: 15,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 5,
    borderLeftWidth: 5,
    borderColor: '#000',
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  radioButton: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'SF Compact Rounded',
    fontWeight: '500',
    fontSize: 16,
    color: '#000',
    flex: 1,
  },
});

export default truefalse;
