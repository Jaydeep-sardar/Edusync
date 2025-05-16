"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, XCircle, RotateCcw, ArrowRight, Home, Award, Clock } from "lucide-react"
import Link from "next/link"
import confetti from "canvas-confetti"

// Sample quiz data
const quizData = {
  title: "General Knowledge Quiz",
  questions: [
    {
      id: 1,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correctAnswer: "Mars",
    },
    {
      id: 2,
      question: "What is the largest ocean on Earth?",
      options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      correctAnswer: "Pacific Ocean",
    },
    {
      id: 3,
      question: "Who painted the Mona Lisa?",
      options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
      correctAnswer: "Leonardo da Vinci",
    },
    {
      id: 4,
      question: "What is the chemical symbol for water?",
      options: ["WO", "H2O", "W", "HO2"],
      correctAnswer: "H2O",
    },
    {
      id: 5,
      question: "Which country is home to the kangaroo?",
      options: ["New Zealand", "South Africa", "Australia", "Brazil"],
      correctAnswer: "Australia",
    },
  ],
}

export default function QuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [timer, setTimer] = useState(30)
  const [timerActive, setTimerActive] = useState(true)
  const [confettiCanvas, setConfettiCanvas] = useState(null)

  const currentQuestion = quizData.questions[currentQuestionIndex]

  // Timer effect
  useEffect(() => {
    let interval

    if (timerActive && timer > 0 && !isAnswerSubmitted) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1)
      }, 1000)
    } else if (timer === 0 && !isAnswerSubmitted) {
      handleSubmitAnswer()
    }

    return () => clearInterval(interval)
  }, [timer, timerActive, isAnswerSubmitted])

  // Confetti effect for high scores
  useEffect(() => {
    if (quizCompleted && score / quizData.questions.length >= 0.8) {
      const canvas = document.createElement("canvas")
      canvas.style.position = "fixed"
      canvas.style.inset = "0"
      canvas.style.width = "100%"
      canvas.style.height = "100%"
      canvas.style.pointerEvents = "none"
      canvas.style.zIndex = "100"
      document.body.appendChild(canvas)

      setConfettiCanvas(canvas)

      const myConfetti = confetti.create(canvas, {
        resize: true,
        useWorker: true,
      })

      myConfetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })

      return () => {
        document.body.removeChild(canvas)
      }
    }
  }, [quizCompleted, score, quizData.questions.length])

  const handleSelectAnswer = (answer) => {
    if (!isAnswerSubmitted) {
      setSelectedAnswer(answer)
    }
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null && timer > 0) return

    setIsAnswerSubmitted(true)
    setTimerActive(false)

    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore((prevScore) => prevScore + 1)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1)
      setSelectedAnswer(null)
      setIsAnswerSubmitted(false)
      setTimer(30)
      setTimerActive(true)
    } else {
      setQuizCompleted(true)
    }
  }

  const restartQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setIsAnswerSubmitted(false)
    setScore(0)
    setQuizCompleted(false)
    setTimer(30)
    setTimerActive(true)

    // Clean up confetti
    if (confettiCanvas) {
      document.body.removeChild(confettiCanvas)
      setConfettiCanvas(null)
    }
  }

  // Calculate percentage score
  const percentageScore = Math.round((score / quizData.questions.length) * 100)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-bold">{quizData.title}</h1>
            <Link href="/" className="flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:underline">
              <Home className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </div>

          {!quizCompleted ? (
            <>
              {/* Progress bar */}
              <div className="mb-6">
                <div className="flex justify-between mb-2 text-sm">
                  <span>
                    Question {currentQuestionIndex + 1} of {quizData.questions.length}
                  </span>
                  <div
                    className={`font-medium flex items-center gap-1 ${timer <= 10 ? "text-red-500 dark:text-red-400" : "text-gray-700 dark:text-gray-300"}`}
                  >
                    <Clock className="h-4 w-4" />
                    <span>{timer}s</span>
                  </div>
                </div>
                <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="bg-purple-600 dark:bg-purple-500 h-full transition-all duration-300"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestionIndex + 1) / quizData.questions.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Question */}
              <div className="mb-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentQuestionIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-xl font-medium mb-6">{currentQuestion.question}</h2>

                    {/* Options */}
                    <div className="space-y-3">
                      {currentQuestion.options.map((option, index) => (
                        <motion.button
                          key={index}
                          onClick={() => handleSelectAnswer(option)}
                          className={`w-full text-left p-4 rounded-lg border dark:border-gray-700 transition-all duration-200 ${
                            selectedAnswer === option
                              ? isAnswerSubmitted
                                ? option === currentQuestion.correctAnswer
                                  ? "bg-green-100 dark:bg-green-900/30 border-green-500 dark:border-green-500"
                                  : "bg-red-100 dark:bg-red-900/30 border-red-500 dark:border-red-500"
                                : "bg-purple-100 dark:bg-purple-900/30 border-purple-500 dark:border-purple-500"
                              : isAnswerSubmitted && option === currentQuestion.correctAnswer
                                ? "bg-green-100 dark:bg-green-900/30 border-green-500 dark:border-green-500"
                                : "hover:bg-gray-50 dark:hover:bg-gray-800 border-gray-200 dark:border-gray-700"
                          }`}
                          disabled={isAnswerSubmitted}
                          whileHover={!isAnswerSubmitted ? { scale: 1.02 } : {}}
                          whileTap={!isAnswerSubmitted ? { scale: 0.98 } : {}}
                        >
                          <div className="flex items-center justify-between">
                            <span>{option}</span>
                            {isAnswerSubmitted && (
                              <>
                                {option === currentQuestion.correctAnswer ? (
                                  <CheckCircle className="h-5 w-5 text-green-500" />
                                ) : selectedAnswer === option ? (
                                  <XCircle className="h-5 w-5 text-red-500" />
                                ) : null}
                              </>
                            )}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Actions */}
              <div className="flex justify-between">
                {!isAnswerSubmitted ? (
                  <motion.button
                    onClick={handleSubmitAnswer}
                    disabled={selectedAnswer === null}
                    className={`btn btn-primary w-full ${selectedAnswer === null ? "opacity-50 cursor-not-allowed" : ""}`}
                    whileHover={selectedAnswer !== null ? { scale: 1.02 } : {}}
                    whileTap={selectedAnswer !== null ? { scale: 0.98 } : {}}
                  >
                    Submit Answer
                  </motion.button>
                ) : (
                  <motion.button
                    onClick={handleNextQuestion}
                    className="btn btn-primary w-full flex items-center justify-center gap-1"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {currentQuestionIndex < quizData.questions.length - 1 ? (
                      <>
                        <span>Next Question</span>
                        <ArrowRight className="h-4 w-4" />
                      </>
                    ) : (
                      <span>See Results</span>
                    )}
                  </motion.button>
                )}
              </div>
            </>
          ) : (
            // Quiz completed - show results
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="mb-6">
                <motion.div
                  className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-purple-100 dark:bg-purple-900/30 mb-4"
                  initial={{ scale: 0.8, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.2,
                  }}
                >
                  <span className="text-4xl font-bold text-purple-600 dark:text-purple-400">{percentageScore}%</span>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  <h2 className="text-2xl font-bold mb-2">Quiz Completed!</h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    You scored {score} out of {quizData.questions.length} questions correctly.
                  </p>
                </motion.div>
              </div>

              {/* Score feedback */}
              <motion.div
                className="mb-8 p-6 rounded-lg inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {percentageScore >= 80 ? (
                  <div className="flex flex-col items-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-100 dark:border-green-900/30">
                    <Award className="h-12 w-12 text-green-500 dark:text-green-400 mb-3" />
                    <p className="text-green-600 dark:text-green-400 font-medium text-lg">
                      Excellent work! You've mastered this topic.
                    </p>
                  </div>
                ) : percentageScore >= 60 ? (
                  <div className="flex flex-col items-center p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-100 dark:border-blue-900/30">
                    <Award className="h-12 w-12 text-blue-500 dark:text-blue-400 mb-3" />
                    <p className="text-blue-600 dark:text-blue-400 font-medium text-lg">
                      Good job! You're on the right track.
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center p-6 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-lg border border-orange-100 dark:border-orange-900/30">
                    <Award className="h-12 w-12 text-orange-500 dark:text-orange-400 mb-3" />
                    <p className="text-orange-600 dark:text-orange-400 font-medium text-lg">
                      Keep practicing! You'll improve with time.
                    </p>
                  </div>
                )}
              </motion.div>

              <motion.button
                onClick={restartQuiz}
                className="btn btn-primary flex items-center gap-2 mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RotateCcw className="h-4 w-4" />
                <span>Retry Quiz</span>
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
