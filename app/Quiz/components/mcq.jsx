import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const mcq = ({ question, selectedAnswer, onAnswerSelect, primaryColor = '#3E0288' }) => {
  return (
    <View style={styles.container}>
      {question.options.map((option, index) => {
        const isSelected = selectedAnswer === option.value;
        const circleFillColor = isSelected ? primaryColor : 'transparent';

        return (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => onAnswerSelect(option.value)}
            style={[
              styles.option,
              isSelected && { borderColor: primaryColor, borderWidth: 2 }
            ]}
          >
            <Text style={styles.optionText}>
              {option.label}
            </Text>

            {/* Circle */}
            <View
              style={[
                styles.radioButton,
                { 
                  borderColor: primaryColor,
                  backgroundColor: circleFillColor 
                }
              ]}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  option: {
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
  optionText: {
    fontFamily: 'SF Compact Rounded',
    fontWeight: '500',
    fontSize: 18,
    color: '#000',
    flex: 1,
  },
});

export default mcq;