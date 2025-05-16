"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, RotateCcw, ThumbsDown, ThumbsUp, Home, Sparkles } from "lucide-react"
import Link from "next/link"
import confetti from "canvas-confetti"

// Sample flashcard data
const initialFlashcards = [
  { id: 1, question: "What is the capital of France?", answer: "Paris" },
  { id: 2, question: "What is the largest planet in our solar system?", answer: "Jupiter" },
  { id: 3, question: "Who wrote 'Romeo and Juliet'?", answer: "William Shakespeare" },
  { id: 4, question: "What is the chemical symbol for gold?", answer: "Au" },
  { id: 5, question: "What year did World War II end?", answer: "1945" },
]

export default function FlashcardsPage() {
  const [flashcards, setFlashcards] = useState(initialFlashcards)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [knownCards, setKnownCards] = useState([])
  const [unknownCards, setUnknownCards] = useState([])
  const [direction, setDirection] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)
  const [allCardsReviewed, setAllCardsReviewed] = useState(false)

  // Using a ref to track if we're in the middle of a transition
  const isTransitioning = useRef(false)
  const confettiCanvasRef = useRef(null)

  const currentCard = flashcards[currentIndex]

  // Check if all cards have been reviewed
  useEffect(() => {
    if (knownCards.length + unknownCards.length === flashcards.length && !allCardsReviewed) {
      setAllCardsReviewed(true)

      // Trigger confetti if more than 70% of cards are known
      if (knownCards.length / flashcards.length >= 0.7) {
        setShowCelebration(true)

        // Trigger confetti
        const canvas = confettiCanvasRef.current
        if (canvas) {
          const myConfetti = confetti.create(canvas, {
            resize: true,
            useWorker: true,
          })

          myConfetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          })
        }
      }
    }
  }, [knownCards, unknownCards, flashcards.length, allCardsReviewed])

  const handleFlip = () => {
    if (!isTransitioning.current) {
      setFlipped(!flipped)
    }
  }

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1 && !isTransitioning.current) {
      isTransitioning.current = true
      setDirection(1)
      setFlipped(false)

      // Small delay to allow flip animation to complete
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1)
        isTransitioning.current = false
      }, 300)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0 && !isTransitioning.current) {
      isTransitioning.current = true
      setDirection(-1)
      setFlipped(false)

      setTimeout(() => {
        setCurrentIndex(currentIndex - 1)
        isTransitioning.current = false
      }, 300)
    }
  }

  const handleKnown = () => {
    if (!isTransitioning.current) {
      const newKnownCards = [...knownCards]
      if (!newKnownCards.includes(currentCard.id)) {
        newKnownCards.push(currentCard.id)
      }

      // Remove from unknown if it was there
      const newUnknownCards = unknownCards.filter((id) => id !== currentCard.id)

      setKnownCards(newKnownCards)
      setUnknownCards(newUnknownCards)
      handleNext()
    }
  }

  const handleUnknown = () => {
    if (!isTransitioning.current) {
      const newUnknownCards = [...unknownCards]
      if (!newUnknownCards.includes(currentCard.id)) {
        newUnknownCards.push(currentCard.id)
      }

      // Remove from known if it was there
      const newKnownCards = knownCards.filter((id) => id !== currentCard.id)

      setUnknownCards(newUnknownCards)
      setKnownCards(newKnownCards)
      handleNext()
    }
  }

  const resetCards = () => {
    setCurrentIndex(0)
    setFlipped(false)
    setKnownCards([])
    setUnknownCards([])
    setAllCardsReviewed(false)
    setShowCelebration(false)
  }

  // Calculate progress
  const progress = {
    total: flashcards.length,
    known: knownCards.length,
    unknown: unknownCards.length,
    remaining: flashcards.length - knownCards.length - unknownCards.length,
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-bold">Flashcards</h1>
            <Link href="/" className="flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:underline">
              <Home className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </div>

          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2 text-sm">
              <span>
                Progress: {knownCards.length + unknownCards.length} / {flashcards.length}
              </span>
              <button
                onClick={resetCards}
                className="flex items-center gap-1 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Reset</span>
              </button>
            </div>
            <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="flex h-full">
                <motion.div
                  className="bg-green-500 h-full transition-all duration-300"
                  initial={{ width: 0 }}
                  animate={{ width: `${(knownCards.length / flashcards.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
                <motion.div
                  className="bg-red-500 h-full transition-all duration-300"
                  initial={{ width: 0 }}
                  animate={{ width: `${(unknownCards.length / flashcards.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
              <span>Known: {knownCards.length}</span>
              <span>Unknown: {unknownCards.length}</span>
              <span>Remaining: {progress.remaining}</span>
            </div>
          </div>

          {/* Flashcard */}
          <div className="relative h-64 sm:h-80 mb-8">
            {allCardsReviewed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 shadow-md p-6"
              >
                <div className="text-purple-600 dark:text-purple-400 mb-4">
                  <Sparkles className="h-12 w-12 mx-auto" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Review Complete!</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  You've reviewed all {flashcards.length} cards.
                  <br />
                  {knownCards.length} known · {unknownCards.length} to review
                </p>
                <button onClick={resetCards} className="btn btn-primary flex items-center gap-2">
                  <RotateCcw className="h-4 w-4" />
                  <span>Start Over</span>
                </button>
              </motion.div>
            ) : (
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{
                    x: direction * 300,
                    opacity: 0,
                  }}
                  animate={{
                    x: 0,
                    opacity: 1,
                  }}
                  exit={{
                    x: direction * -300,
                    opacity: 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <div onClick={handleFlip} className="w-full h-full perspective-1000 cursor-pointer">
                    <motion.div
                      animate={{ rotateY: flipped ? 180 : 0 }}
                      transition={{ duration: 0.6, type: "spring", stiffness: 300, damping: 20 }}
                      className="w-full h-full relative preserve-3d"
                    >
                      {/* Front of card (Question) */}
                      <div
                        className={`absolute w-full h-full backface-hidden rounded-xl border dark:border-gray-700 shadow-md p-6 flex flex-col items-center justify-center bg-white dark:bg-gray-800 ${flipped ? "opacity-0" : "opacity-100"}`}
                      >
                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">Question</div>
                        <div className="text-xl text-center font-medium">{currentCard.question}</div>
                        <div className="mt-auto text-sm text-gray-400 dark:text-gray-500">Click to flip</div>
                      </div>

                      {/* Back of card (Answer) */}
                      <div
                        className={`absolute w-full h-full backface-hidden rounded-xl border dark:border-gray-700 shadow-md p-6 flex flex-col items-center justify-center bg-purple-50 dark:bg-purple-900/20 rotate-y-180 ${flipped ? "opacity-100" : "opacity-0"}`}
                      >
                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">Answer</div>
                        <div className="text-xl text-center font-medium">{currentCard.answer}</div>
                        <div className="mt-auto text-sm text-gray-400 dark:text-gray-500">Click to flip back</div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          {/* Navigation and buttons */}
          {!allCardsReviewed && (
            <div className="flex items-center justify-between">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={`btn btn-outline flex items-center gap-1 ${currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <ChevronLeft className="h-5 w-5" />
                <span>Previous</span>
              </button>

              <div className="flex gap-3">
                <motion.button
                  onClick={handleUnknown}
                  className="btn flex items-center gap-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ThumbsDown className="h-4 w-4" />
                  <span>Don't Know</span>
                </motion.button>
                <motion.button
                  onClick={handleKnown}
                  className="btn flex items-center gap-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ThumbsUp className="h-4 w-4" />
                  <span>Know</span>
                </motion.button>
              </div>

              <button
                onClick={handleNext}
                disabled={currentIndex === flashcards.length - 1}
                className={`btn btn-outline flex items-center gap-1 ${currentIndex === flashcards.length - 1 ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <span>Next</span>
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}

          {/* Card counter */}
          {!allCardsReviewed && (
            <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
              Card {currentIndex + 1} of {flashcards.length}
            </div>
          )}
        </div>
      </div>

      {/* Hidden canvas for confetti */}
      <canvas
        ref={confettiCanvasRef}
        className={`fixed inset-0 pointer-events-none z-50 ${showCelebration ? "block" : "hidden"}`}
      />
    </div>
  )
}
