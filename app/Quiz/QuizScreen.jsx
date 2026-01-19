import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Platform, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import MCQ from './components/mcq'
import TrueFalse from './components/truefalse'

// Sample quiz data - replace with your actual data source
const quizData = [
  {
    id: 1,
    type: 'mcq',
    text: "What is the primary goal of our company vision?",
    options: [
      { label: "To maximize profits", value: "profits" },
      { label: "To create innovative solutions that improve lives", value: "innovate" },
      { label: "To expand globally", value: "expand" },
      { label: "To compete with other companies", value: "compete" },
    ],
    correctAnswer: "innovate",
  },
  {
    id: 2,
    type: 'true_false',
    text: "The company values innovation and customer satisfaction equally.",
    correctAnswer: true,
  },
  {
    id: 3,
    type: 'mcq',
    text: "Which of the following best describes the company's approach to teamwork?",
    options: [
      { label: "Individual achievement is prioritized", value: "individual" },
      { label: "Collaboration and shared success", value: "collaboration" },
      { label: "Competitive environment", value: "competitive" },
      { label: "Independent work only", value: "independent" },
    ],
    correctAnswer: "collaboration",
  },
]

const QuizScreen = () => {
  const router = useRouter()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const currentQuestion = quizData[currentQuestionIndex]
  const totalQuestions = quizData.length
  const currentAnswer = answers[currentQuestion.id]

  const handleAnswerSelect = (answer) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer
    }))
  }

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      handleSubmit()
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  const handleSubmit = () => {
    setIsSubmitted(true)
    // Calculate score
    let score = 0
    quizData.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        score++
      }
    })
    console.log('Quiz submitted!', { answers, score, totalQuestions })
    // Navigate to results or show score
    alert(`Quiz Completed!\nScore: ${score}/${totalQuestions}`)
  }

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'mcq':
        return (
          <MCQ
            question={currentQuestion}
            selectedAnswer={currentAnswer}
            onAnswerSelect={handleAnswerSelect}
          />
        )
      case 'true_false':
        return (
          <TrueFalse
            question={currentQuestion}
            selectedAnswer={currentAnswer}
            onAnswerSelect={handleAnswerSelect}
          />
        )
      default:
        return null
    }
  }

  const isAnswerSelected = currentAnswer !== undefined && currentAnswer !== null
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1
  const isFirstQuestion = currentQuestionIndex === 0

  if (isSubmitted) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.submittedContainer}>
          <Ionicons name="checkmark-circle" size={14} color="#10B981" />
          <Text style={styles.submittedText}>Quiz Completed!</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.push('/HomeScreen')}
          >
            <Text style={styles.backButtonText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        
        <View style={styles.headerRight}>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => router.push('/SettingScreen')}
          >
            <Ionicons name="settings-outline" size={24} color="#3E0288" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}
            onPress={() => router.push('/NotificationScreen')}
          >
            <Ionicons name="notifications-outline" size={24} color="#3E0288" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Progress Indicator */}
      <View style={styles.progressContainer}>
        {quizData.map((question, index) => {
          const isCompleted = answers[question.id] !== undefined && answers[question.id] !== null
          const isCurrent = index === currentQuestionIndex
          const segmentColor = isCompleted || isCurrent ? '#3E0288' : '#E5E7EB'
          
          return (
            <View
              key={question.id}
              style={[
                styles.progressSegment,
                { backgroundColor: segmentColor }
              ]}
            />
          )
        })}
      </View>

      {/* Title Section */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Question Round</Text>
        <Text style={styles.subtitle}>
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </Text>
      </View>

      {/* Questions */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.questionBlock}>
          <Text style={styles.questionText}>{currentQuestion.text}</Text>
        </View>
        
        <View style={styles.answerContainer}>
          {renderQuestion()}
        </View>
      </ScrollView>

      {/* Submit Button */}
      <View style={styles.submitContainer}>
        <TouchableOpacity
          style={[
            styles.submitButton,
            !isAnswerSelected && styles.submitButtonDisabled
          ]}
          onPress={handleNext}
          disabled={!isAnswerSelected}
        >
          <Text style={[
            styles.submitButtonText,
            !isAnswerSelected && styles.submitButtonTextDisabled
          ]}>
            Submit Answer
          </Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation Bar
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.push('/HomeScreen')}
        >
          <View style={styles.navIconContainer}>
            <Ionicons name="home" size={24} color="#fff" />
          </View>
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="stats-chart-outline" size={24} color="#fff" />
          <Text style={styles.navLabel}>Progress</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={24} color="#fff" />
          <Text style={styles.navLabel}>Profile</Text>
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  )
}

export default QuizScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },
  backButton: {
    top: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
    gap: 4,
  },
  progressSegment: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E5E7EB',
  },
  titleContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontStyle: 'semibold',
    fontWeight: '600',
    lineHeight: 28,
    top: 46,
    left: 8,
    color: '#000000',
    marginBottom: 8,
    fontFamily: Platform.select({
      ios: 'SF Compact Rounded',
      android: 'sans-serif',
      default: 'Arial',
    }),
  },
  subtitle: {
    top: 44,
    left: 8,
    fontSize: 16,
    lineHeight: 19,
    color: '#686D76',
    fontWeight: '400',
    fontFamily: Platform.select({
      ios: 'SF Compact Rounded',
      android: 'sans-serif',
      default: 'Arial',
    }),
  },
  headerRight: {
    position: 'absolute',
    width: 79,
    height: 38,
    left: 290,
    top: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 120,
    alignItems: 'center',
  },
  questionBlock: {
    width: 353,
    minHeight: 104,
    backgroundColor: '#3E0288',
    borderRadius: 23,
    borderTopWidth: 2,
    borderRightWidth: 5,
    borderBottomWidth: 5,
    borderLeftWidth: 2,
    borderColor: '#000000',
    paddingHorizontal: 16,
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 24,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 26,
  },
  answerContainer: {
    alignItems: 'center',
    width: '100%',
  },
  submitContainer: {
    paddingHorizontal: 25,
    paddingTop: 16,
    paddingBottom: 140,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  submitButton: {
    width: '100%',
    maxWidth: 312,
    height: 45,
    borderRadius: 12,
    borderWidth: 1,
    // borderColor: '#000000',
    backgroundColor: '#3E0288',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#E5E7EB',
  },
  submitButtonText: {
    fontSize: 18,
    lineHeight: 23,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  submitButtonTextDisabled: {
    color: '#9CA3AF',
  },
  submittedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  submittedText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 20,
    marginBottom: 40,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3E0288',
    padding: 12,
    borderWidth: 2,
    borderColor: '#3E0288',
    borderRadius: 12,
  },
  bottomNav: {
    position: 'absolute',
    top: 730,
    left: 64,
    width: 265,
    height: 60,
    backgroundColor: '#3E0288',
    borderRadius: 244,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
    ...Platform.select({
      web: {
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
      },
    }),
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  navLabel: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
  },
})