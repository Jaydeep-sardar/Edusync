"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Check, Plus, Trash2, X, Home, Award, FlameIcon as Fire } from "lucide-react"
import Link from "next/link"

// Get current date in YYYY-MM-DD format
const getCurrentDate = () => {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`
}

// Sample initial habits
const initialHabits = [
  { id: 1, name: "Study for 30 minutes", streak: 3, completed: false },
  { id: 2, name: "Read an article", streak: 5, completed: false },
  { id: 3, name: "Practice coding", streak: 2, completed: false },
]

export default function HabitsPage() {
  const [habits, setHabits] = useState(initialHabits)
  const [newHabitName, setNewHabitName] = useState("")
  const [showAddForm, setShowAddForm] = useState(false)
  const [lastCompletedDate, setLastCompletedDate] = useState(null)
  const [showAchievement, setShowAchievement] = useState(false)
  const [achievementMessage, setAchievementMessage] = useState("")

  // Check if we need to reset completion status (new day)
  useEffect(() => {
    const currentDate = getCurrentDate()

    // If we have a stored date and it's different from today
    if (lastCompletedDate && lastCompletedDate !== currentDate) {
      // Reset all habits to not completed
      setHabits((prevHabits) =>
        prevHabits.map((habit) => ({
          ...habit,
          completed: false,
        })),
      )
    }

    // Update the last completed date to today
    setLastCompletedDate(currentDate)
  }, [lastCompletedDate])

  const addHabit = () => {
    if (newHabitName.trim() === "") return

    const newHabit = {
      id: Date.now(),
      name: newHabitName,
      streak: 0,
      completed: false,
    }

    setHabits([...habits, newHabit])
    setNewHabitName("")
    setShowAddForm(false)
  }

  const toggleHabitCompletion = (id) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) => {
        if (habit.id === id) {
          // If we're marking as complete, increment streak
          // If we're unmarking, decrement streak (but not below 0)
          const newStreak = habit.completed ? Math.max(0, habit.streak - 1) : habit.streak + 1

          // Show achievement for milestone streaks
          if (!habit.completed && [7, 14, 30, 60, 100].includes(newStreak)) {
            setAchievementMessage(`${newStreak} day streak on "${habit.name}"!`)
            setShowAchievement(true)

            // Hide achievement after 3 seconds
            setTimeout(() => {
              setShowAchievement(false)
            }, 3000)
          }

          return {
            ...habit,
            completed: !habit.completed,
            streak: newStreak,
          }
        }
        return habit
      }),
    )
  }

  const deleteHabit = (id) => {
    setHabits((prevHabits) => prevHabits.filter((habit) => habit.id !== id))
  }

  // Calculate overall progress
  const completedCount = habits.filter((habit) => habit.completed).length
  const totalHabits = habits.length
  const progressPercentage = totalHabits > 0 ? (completedCount / totalHabits) * 100 : 0

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-bold">Daily Habit Tracker</h1>
            <Link href="/" className="flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:underline">
              <Home className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </div>

          {/* Today's date */}
          <div className="flex items-center gap-2 mb-6 text-gray-600 dark:text-gray-300">
            <Calendar className="h-5 w-5" />
            <span>
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Daily Progress</span>
              <span className="text-sm font-medium">
                {completedCount}/{totalHabits} completed
              </span>
            </div>
            <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-purple-600 dark:bg-purple-500"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            {/* Completion message */}
            {completedCount === totalHabits && totalHabits > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 p-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-md text-center text-sm"
              >
                <span className="font-medium">All habits completed for today! 🎉</span>
              </motion.div>
            )}
          </div>

          {/* Habits list */}
          <div className="mb-8 space-y-3">
            {habits.length === 0 ? (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 shadow-sm">
                <div className="mb-3">
                  <Calendar className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500" />
                </div>
                <p className="mb-2">No habits added yet.</p>
                <p className="text-sm">Add your first habit to get started!</p>
              </div>
            ) : (
              habits.map((habit) => (
                <motion.div
                  key={habit.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className={`flex items-center justify-between p-4 rounded-lg border dark:border-gray-700 shadow-sm ${
                    habit.completed
                      ? "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800/30"
                      : "bg-white dark:bg-gray-800"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <motion.button
                      onClick={() => toggleHabitCompletion(habit.id)}
                      className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center border ${
                        habit.completed
                          ? "bg-purple-600 dark:bg-purple-500 border-purple-600 dark:border-purple-500 text-white"
                          : "border-gray-300 dark:border-gray-600 hover:border-purple-500 dark:hover:border-purple-500"
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {habit.completed && <Check className="h-4 w-4" />}
                    </motion.button>
                    <div>
                      <div
                        className={`font-medium ${habit.completed ? "line-through text-gray-500 dark:text-gray-400" : ""}`}
                      >
                        {habit.name}
                      </div>
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <Fire className="h-3 w-3 mr-1 text-orange-500" />
                        <span>{habit.streak} day streak</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteHabit(habit.id)}
                    className="text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </motion.div>
              ))
            )}
          </div>

          {/* Add new habit */}
          <AnimatePresence>
            {showAddForm ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 p-4 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-sm"
              >
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="font-medium">Add New Habit</h3>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="ml-auto text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newHabitName}
                    onChange={(e) => setNewHabitName(e.target.value)}
                    placeholder="Enter habit name..."
                    className="flex-1 px-3 py-2 border dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") addHabit()
                    }}
                  />
                  <motion.button
                    onClick={addHabit}
                    disabled={newHabitName.trim() === ""}
                    className={`btn btn-primary ${newHabitName.trim() === "" ? "opacity-50 cursor-not-allowed" : ""}`}
                    whileHover={newHabitName.trim() !== "" ? { scale: 1.05 } : {}}
                    whileTap={newHabitName.trim() !== "" ? { scale: 0.95 } : {}}
                  >
                    Add
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.button
                onClick={() => setShowAddForm(true)}
                className="w-full py-3 border-2 dark:border-gray-700 border-dashed border-gray-300 rounded-lg text-gray-500 dark:text-gray-400 hover:border-purple-500 dark:hover:border-purple-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center justify-center gap-2"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <Plus className="h-5 w-5" />
                <span>Add New Habit</span>
              </motion.button>
            )}
          </AnimatePresence>

          {/* Achievement popup */}
          <AnimatePresence>
            {showAchievement && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 z-50"
              >
                <Award className="h-6 w-6 text-yellow-300" />
                <div>
                  <div className="font-bold">Achievement Unlocked!</div>
                  <div>{achievementMessage}</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
