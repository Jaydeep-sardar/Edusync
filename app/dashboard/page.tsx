"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  BookOpen,
  CheckSquare,
  ChevronRight,
  FileText,
  PenTool,
  Star,
  TrendingUp,
  Award,
  BookMarked,
  Target,
  PieChart,
} from "lucide-react"

// Sample data for dashboard
const userData = {
  name: "Alex Johnson",
  streak: 12,
  totalPoints: 1250,
  level: 5,
  recentActivity: [
    { id: 1, type: "quiz", title: "Completed General Knowledge Quiz", date: "2 hours ago", score: "4/5" },
    { id: 2, type: "flashcard", title: "Reviewed French Vocabulary", date: "Yesterday", cards: 30 },
    { id: 3, type: "course", title: "Started JavaScript Basics", date: "2 days ago", progress: 15 },
    { id: 4, type: "habit", title: "Completed daily reading goal", date: "2 days ago", streak: 7 },
    { id: 5, type: "reading", title: "Finished 'Atomic Habits'", date: "3 days ago", rating: 5 },
  ],
  stats: {
    flashcards: { total: 120, mastered: 78 },
    quizzes: { completed: 15, avgScore: 82 },
    habits: { active: 4, completed: 85 },
    courses: { enrolled: 3, completed: 1 },
    books: { read: 12, pagesRead: 2840 },
  },
  weeklyActivity: [65, 45, 75, 50, 80, 45, 60],
  learningDistribution: [
    { category: "Programming", percentage: 40 },
    { category: "Languages", percentage: 25 },
    { category: "Science", percentage: 20 },
    { category: "Other", percentage: 15 },
  ],
  goals: [
    { id: 1, title: "Complete JavaScript Course", progress: 65, dueDate: "June 15, 2023" },
    { id: 2, title: "Read 20 books this year", progress: 60, dueDate: "December 31, 2023" },
    { id: 3, title: "Learn 500 French words", progress: 30, dueDate: "August 30, 2023" },
  ],
}

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false)

  // Ensure hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-12">
      {/* Hero section */}
      <section className="bg-gradient-to-r from-purple-700 to-purple-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back, {userData.name}!</h1>
                <p className="text-purple-200">Track your progress and continue your learning journey</p>
              </div>
              <div className="flex gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold">{userData.streak}</div>
                  <div className="text-sm text-purple-200">Day Streak</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold">{userData.totalPoints}</div>
                  <div className="text-sm text-purple-200">Total Points</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold">{userData.level}</div>
                  <div className="text-sm text-purple-200">Level</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard content */}
      <div className="container mx-auto px-4 -mt-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main content - 2/3 width */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
              >
                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <QuickActionCard
                    title="Flashcards"
                    icon={<FileText className="h-6 w-6" />}
                    href="/flashcards"
                    color="bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400"
                  />
                  <QuickActionCard
                    title="Quiz"
                    icon={<PenTool className="h-6 w-6" />}
                    href="/quiz"
                    color="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                  />
                  <QuickActionCard
                    title="Habits"
                    icon={<CheckSquare className="h-6 w-6" />}
                    href="/habits"
                    color="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                  />
                  <QuickActionCard
                    title="Reading"
                    icon={<BookOpen className="h-6 w-6" />}
                    href="/reading"
                    color="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                  />
                </div>
              </motion.div>

              {/* Weekly activity chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Weekly Activity</h2>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
                    <span>15% increase</span>
                  </div>
                </div>
                <div className="h-64">
                  <div className="h-full flex items-end justify-between gap-2">
                    {userData.weeklyActivity.map((value, index) => (
                      <div key={index} className="relative flex-1 flex flex-col items-center">
                        <motion.div
                          className="w-full bg-purple-600 dark:bg-purple-500 rounded-t-md"
                          initial={{ height: 0 }}
                          animate={{ height: `${value}%` }}
                          transition={{ duration: 1, delay: 0.1 * index }}
                        />
                        <div className="absolute bottom-0 transform translate-y-full mt-2 text-xs text-gray-500 dark:text-gray-400">
                          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Learning distribution */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
              >
                <h2 className="text-xl font-semibold mb-4">Learning Distribution</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center justify-center h-48">
                      <PieChart className="h-32 w-32 text-gray-300 dark:text-gray-600" />
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    {userData.learningDistribution.map((item, index) => (
                      <div key={index} className="mb-4">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">{item.category}</span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">{item.percentage}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full ${
                              index === 0
                                ? "bg-purple-600 dark:bg-purple-500"
                                : index === 1
                                  ? "bg-blue-600 dark:bg-blue-500"
                                  : index === 2
                                    ? "bg-green-600 dark:bg-green-500"
                                    : "bg-pink-600 dark:bg-pink-500"
                            }`}
                            initial={{ width: 0 }}
                            animate={{ width: `${item.percentage}%` }}
                            transition={{ duration: 1, delay: 0.2 * index }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Goals */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Learning Goals</h2>
                  <button className="text-sm text-purple-600 dark:text-purple-400 hover:underline">Add Goal</button>
                </div>
                <div className="space-y-4">
                  {userData.goals.map((goal) => (
                    <div key={goal.id} className="border dark:border-gray-700 rounded-lg p-4">
                      <div className="flex justify-between mb-2">
                        <h3 className="font-medium">{goal.title}</h3>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Due: {goal.dueDate}</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-2">
                        <motion.div
                          className="h-full bg-purple-600 dark:bg-purple-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${goal.progress}%` }}
                          transition={{ duration: 1 }}
                        />
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">{goal.progress}% completed</span>
                        <button className="text-purple-600 dark:text-purple-400 hover:underline">Update</button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar - 1/3 width */}
            <div className="space-y-6">
              {/* Stats cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="grid grid-cols-2 gap-4"
              >
                <StatCard
                  title="Flashcards"
                  value={userData.stats.flashcards.mastered}
                  total={userData.stats.flashcards.total}
                  icon={<FileText className="h-5 w-5" />}
                  color="bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400"
                />
                <StatCard
                  title="Quiz Score"
                  value={`${userData.stats.quizzes.avgScore}%`}
                  total={`${userData.stats.quizzes.completed} taken`}
                  icon={<PenTool className="h-5 w-5" />}
                  color="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                />
                <StatCard
                  title="Habits"
                  value={userData.stats.habits.completed}
                  total="this month"
                  icon={<CheckSquare className="h-5 w-5" />}
                  color="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                />
                <StatCard
                  title="Books Read"
                  value={userData.stats.books.read}
                  total={`${userData.stats.books.pagesRead} pages`}
                  icon={<BookOpen className="h-5 w-5" />}
                  color="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                />
              </motion.div>

              {/* Recent activity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
              >
                <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                <div className="space-y-4">
                  {userData.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex gap-3">
                      <div
                        className={`
                        flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
                        ${
                          activity.type === "quiz"
                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                            : activity.type === "flashcard"
                              ? "bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400"
                              : activity.type === "course"
                                ? "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
                                : activity.type === "habit"
                                  ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                                  : "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                        }
                      `}
                      >
                        {activity.type === "quiz" ? (
                          <PenTool className="h-5 w-5" />
                        ) : activity.type === "flashcard" ? (
                          <FileText className="h-5 w-5" />
                        ) : activity.type === "course" ? (
                          <BookMarked className="h-5 w-5" />
                        ) : activity.type === "habit" ? (
                          <CheckSquare className="h-5 w-5" />
                        ) : (
                          <BookOpen className="h-5 w-5" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{activity.title}</div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500 dark:text-gray-400">{activity.date}</span>
                          {activity.score && <span className="text-blue-600 dark:text-blue-400">{activity.score}</span>}
                          {activity.cards && (
                            <span className="text-pink-600 dark:text-pink-400">{activity.cards} cards</span>
                          )}
                          {activity.progress && (
                            <span className="text-amber-600 dark:text-amber-400">{activity.progress}% complete</span>
                          )}
                          {activity.streak && (
                            <span className="text-green-600 dark:text-green-400">{activity.streak} day streak</span>
                          )}
                          {activity.rating && (
                            <span className="flex items-center text-yellow-500">
                              <Star className="h-4 w-4 fill-current" />
                              <span className="ml-1">{activity.rating}</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 text-center text-sm text-purple-600 dark:text-purple-400 hover:underline">
                  View All Activity
                </button>
              </motion.div>

              {/* Achievements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
              >
                <h2 className="text-xl font-semibold mb-4">Recent Achievements</h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-lg border border-amber-100 dark:border-amber-900/30">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                      <Award className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium">7 Day Streak</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Consistent learning for a week</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-100 dark:border-blue-900/30">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <Target className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium">Quiz Master</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Scored 100% on 5 quizzes</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-100 dark:border-purple-900/30">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium">Bookworm</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Read 10 books this year</div>
                    </div>
                  </div>
                </div>
                <button className="w-full mt-4 text-center text-sm text-purple-600 dark:text-purple-400 hover:underline">
                  View All Achievements
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function QuickActionCard({ title, icon, href, color }) {
  return (
    <Link href={href} className="block group">
      <div className="border dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-all duration-200 hover:-translate-y-1">
        <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center mb-3`}>{icon}</div>
        <div className="font-medium">{title}</div>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
          <span>Go to</span>
          <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  )
}

function StatCard({ title, value, total, icon, color }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-8 h-8 rounded-lg ${color} flex items-center justify-center`}>{icon}</div>
        <div className="text-sm font-medium">{title}</div>
      </div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs text-gray-500 dark:text-gray-400">{total}</div>
    </div>
  )
}
