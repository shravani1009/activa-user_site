import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const truefalse = ({ question, selectedAnswer, onAnswerSelect, primaryColor = '#3E0288' }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onAnswerSelect(true)}
        style={[
          styles.button,
          selectedAnswer === true && { borderColor: primaryColor, borderWidth: 2 }
        ]}
      >
        <Text style={styles.buttonText}>
          True
        </Text>

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
      </TouchableOpacity>
      
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onAnswerSelect(false)}
        style={[
          styles.button,
          selectedAnswer === false && { borderColor: primaryColor, borderWidth: 2 }
        ]}
      >
        <Text style={styles.buttonText}>
          False
        </Text>

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
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: 353,
    height: 49,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  radioButton: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    marginLeft: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'SF Compact Rounded',
    fontWeight: '500',
    fontSize: 18,
    color: '#000',
    flex: 1,
  },
});

export default truefalse;
