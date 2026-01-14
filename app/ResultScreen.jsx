import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function ResultScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { width } = Dimensions.get('window');
  const headerFontSize = Math.min(28, width * 0.07);

  const { questions = [], answers = [], correctAnswers = [], topicId, sectionId, sectionName } = route.params || {};

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Colors
  const primary = '#3E0288';
  const correct = '#16A34A';
  const wrong = '#DC2626';
  const skipped = '#F59E0B';
  const black = '#111827';
  const muted = '#6B7280';

  const cardShadow = {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  };

  const correctCount = answers.reduce((acc, ans, i) => {
    if (ans !== null && ans !== undefined && ans === correctAnswers[i]) return acc + 1;
    return acc;
  }, 0);

  const skippedCount = answers.filter(a => a === null || a === undefined || a === '').length;
  const wrongCount = questions.length - correctCount - skippedCount;
  const totalQuestions = questions.length;

  useEffect(() => {
    if (topicId && !submitted && totalQuestions > 0) {
      const submitResults = async () => {
        try {
          setSubmitting(true);
          await submitQuizResultsAPI(topicId, correctCount, totalQuestions);
          setSubmitted(true);
          console.log('Quiz results submitted successfully');
        } catch (error) {
          console.error('Error submitting quiz results:', error);
        } finally {
          setSubmitting(false);
        }
      };
      submitResults();
    }
  }, [topicId, correctCount, totalQuestions, submitted]);

  const getAnswerText = (answer, q) => {
    if (answer === null || answer === undefined || answer === '') return 'Not Answered';
    if (q.type === 'mcq' && q.options) return q.options[answer];
    if (q.type === 'truefalse') return answer === 0 ? 'True' : 'False';
    return String(answer);
  };

  const getCorrectAnswerText = (answer, q) => {
    if (q.type === 'mcq' && q.options) return q.options[answer];
    if (q.type === 'truefalse') return answer === 0 ? 'True' : 'False';
    return String(answer);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
      {submitting && (
        <View style={{ 
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.3)',
          justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
          <ActivityIndicator size="large" color={primary} />
          <Text style={{ marginTop: 12, color: '#FFFFFF' }}>Submitting results...</Text>
        </View>
      )}
      <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 28 }}>
        
        {/* Header & Navigation */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: '#E5E7EB', justifyContent: 'center', alignItems: 'center' }}
          >
            <Ionicons name="arrow-back-outline" size={18} color={primary} />
          </TouchableOpacity>

          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('SettingsScreen')}
              style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: '#E5E7EB', justifyContent: 'center', alignItems: 'center', marginLeft: 8 }}
            >
              <Ionicons name="settings-outline" size={18} color={primary} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Notification')}
              style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: '#E5E7EB', justifyContent: 'center', alignItems: 'center', marginLeft: 8 }}
            >
              <Ionicons name="notifications-outline" size={18} color={primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Result Summary Header */}
        <Text style={{ fontSize: headerFontSize, fontWeight: '600', color: black, marginBottom: 24 }}>
          Result Summary
        </Text>

        {/* Stats */}
        <View style={{ flexDirection: 'row', backgroundColor: primary, borderRadius: 16, paddingVertical: 18, marginBottom: 28, ...cardShadow }}>
          <Stat label="Correct" value={correctCount} />
          <Stat label="Wrong" value={wrongCount} />
          <Stat label="Skipped" value={skippedCount} />
        </View>

        {/* Question Review */}
        <Text style={{ fontSize: 20, fontWeight: '800', color: primary, marginBottom: 16 }}>
          Question Review
        </Text>

        {questions.map((q, index) => {
          const userAnswer = answers[index];
          const correctAnswer = correctAnswers[index];

          const isSkipped = userAnswer === null || userAnswer === undefined || userAnswer === '';
          const isCorrect = userAnswer === correctAnswer && !isSkipped;
          const statusColor = isSkipped ? skipped : isCorrect ? correct : wrong;
          const statusIcon = isSkipped ? 'help-circle-outline' : isCorrect ? 'checkmark-circle-outline' : 'close-circle-outline';

          return (
            <View key={index} style={{ backgroundColor: '#FFFFFF', borderRadius: 16, padding: 18, marginBottom: 16, ...cardShadow }}>
              <Text style={{ fontSize: 16, fontWeight: '700', color: black, marginBottom: 10 }}>
                {index + 1}. {q.question}
              </Text>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                <Ionicons name={statusIcon} size={18} color={statusColor} />
                <Text style={{ marginLeft: 6, fontSize: 14, fontWeight: '700', color: statusColor }}>
                  {isSkipped ? 'Skipped' : isCorrect ? 'Correct' : 'Incorrect'}
                </Text>
              </View>

              <View style={{ borderLeftWidth: 4, borderLeftColor: primary, paddingLeft: 12, marginBottom: 10 }}>
                <Text style={{ fontSize: 13, color: muted }}>Your Answer</Text>
                <Text style={{ fontSize: 15, fontWeight: '600', color: black }}>{getAnswerText(userAnswer, q)}</Text>
              </View>

              {!isCorrect && (
                <View style={{ borderLeftWidth: 4, borderLeftColor: correct, paddingLeft: 12 }}>
                  <Text style={{ fontSize: 13, color: muted }}>Correct Answer</Text>
                  <Text style={{ fontSize: 15, fontWeight: '600', color: black }}>{getCorrectAnswerText(correctAnswer, q)}</Text>
                </View>
              )}
            </View>
          );
        })}

        {/* Back to Topics Button */}
        <TouchableOpacity
          onPress={() => {
            if (sectionId && sectionName) {
              navigation.navigate('TopicScreen', { sectionId, sectionName });
            } else {
              navigation.goBack();
              setTimeout(() => navigation.goBack(), 100);
              setTimeout(() => navigation.goBack(), 200);
            }
          }}
          style={{
            backgroundColor: primary,
            borderRadius: 12,
            paddingVertical: 16,
            paddingHorizontal: 24,
            marginTop: 20,
            marginBottom: 20,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            ...cardShadow,
          }}
        >
          <Ionicons name="arrow-back" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
          <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600' }}>Back to Topics</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const Stat = ({ label, value }) => (
  <View style={{ alignItems: 'center', flex: 1 }}>
    <Text style={{ fontSize: 22, fontWeight: '800', color: '#FFFFFF' }}>{value}</Text>
    <Text style={{ fontSize: 13, fontWeight: '600', color: 'rgba(255,255,255,0.85)' }}>{label}</Text>
  </View>
);
