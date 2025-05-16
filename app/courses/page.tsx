"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Clock, Filter, Search, Star, X, Home, BookOpen } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Sample course data
const coursesData = [
  {
    id: 1,
    title: "Introduction to JavaScript",
    description: "Learn the basics of JavaScript programming language.",
    image: "/placeholder.svg?height=200&width=300",
    category: "Programming",
    level: "Beginner",
    duration: 120, // in minutes
    rating: 4.5,
    instructor: "John Smith",
    featured: true,
  },
  {
    id: 2,
    title: "Advanced React Patterns",
    description: "Master advanced React patterns and techniques for building scalable applications.",
    image: "/placeholder.svg?height=200&width=300",
    category: "Programming",
    level: "Advanced",
    duration: 240,
    rating: 4.8,
    instructor: "Sarah Johnson",
    featured: true,
  },
  {
    id: 3,
    title: "Data Science Fundamentals",
    description: "Introduction to data science concepts, tools, and methodologies.",
    image: "/placeholder.svg?height=200&width=300",
    category: "Data Science",
    level: "Intermediate",
    duration: 180,
    rating: 4.2,
    instructor: "Michael Chen",
    featured: false,
  },
  {
    id: 4,
    title: "Digital Marketing Essentials",
    description: "Learn the core concepts of digital marketing and social media strategies.",
    image: "/placeholder.svg?height=200&width=300",
    category: "Marketing",
    level: "Beginner",
    duration: 90,
    rating: 4.0,
    instructor: "Emily Rodriguez",
    featured: false,
  },
  {
    id: 5,
    title: "Machine Learning Basics",
    description: "Introduction to machine learning algorithms and applications.",
    image: "/placeholder.svg?height=200&width=300",
    category: "Data Science",
    level: "Intermediate",
    duration: 210,
    rating: 4.7,
    instructor: "David Kim",
    featured: true,
  },
  {
    id: 6,
    title: "UX/UI Design Principles",
    description: "Learn the fundamental principles of user experience and interface design.",
    image: "/placeholder.svg?height=200&width=300",
    category: "Design",
    level: "Beginner",
    duration: 150,
    rating: 4.3,
    instructor: "Lisa Wong",
    featured: false,
  },
]

// Get unique categories
const categories = [...new Set(coursesData.map((course) => course.category))]
// Get unique levels
const levels = [...new Set(coursesData.map((course) => course.level))]
// Duration ranges
const durationRanges = [
  { label: "< 2 hours", value: "0-120" },
  { label: "2-4 hours", value: "120-240" },
  { label: "> 4 hours", value: "240-999" },
]

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedLevels, setSelectedLevels] = useState([])
  const [selectedDurations, setSelectedDurations] = useState([])
  const [showFilters, setShowFilters] = useState(false)
  const [featuredCourseIndex, setFeaturedCourseIndex] = useState(0)
  const [mounted, setMounted] = useState(false)

  // Ensure hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  // Auto-rotate featured courses
  useEffect(() => {
    const featuredCourses = coursesData.filter((course) => course.featured)
    if (featuredCourses.length <= 1) return

    const interval = setInterval(() => {
      setFeaturedCourseIndex((prev) => (prev + 1) % featuredCourses.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Filter courses based on selected filters and search query
  const filteredCourses = coursesData.filter((course) => {
    // Search filter
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase())

    // Category filter
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(course.category)

    // Level filter
    const matchesLevel = selectedLevels.length === 0 || selectedLevels.includes(course.level)

    // Duration filter
    const matchesDuration =
      selectedDurations.length === 0 ||
      selectedDurations.some((range) => {
        const [min, max] = range.split("-").map(Number)
        return course.duration >= min && course.duration <= max
      })

    return matchesSearch && matchesCategory && matchesLevel && matchesDuration
  })

  const featuredCourses = coursesData.filter((course) => course.featured)
  const currentFeaturedCourse = featuredCourses[featuredCourseIndex]

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const toggleLevel = (level) => {
    setSelectedLevels((prev) => (prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]))
  }

  const toggleDuration = (duration) => {
    setSelectedDurations((prev) => (prev.includes(duration) ? prev.filter((d) => d !== duration) : [...prev, duration]))
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedLevels([])
    setSelectedDurations([])
    setSearchQuery("")
  }

  // Check if any filters are applied
  const hasActiveFilters =
    selectedCategories.length > 0 || selectedLevels.length > 0 || selectedDurations.length > 0 || searchQuery

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-12">
      {/* Featured course banner */}
      {currentFeaturedCourse && (
        <div className="relative bg-gradient-to-r from-purple-700 to-purple-900 text-white py-12 mb-8">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="text-sm text-purple-300 mb-2">Featured Course</div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-3">{currentFeaturedCourse.title}</h2>
                  <p className="text-purple-100 mb-4">{currentFeaturedCourse.description}</p>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>
                        {Math.floor(currentFeaturedCourse.duration / 60)}h {currentFeaturedCourse.duration % 60}m
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-300 fill-yellow-300" />
                      <span>{currentFeaturedCourse.rating}</span>
                    </div>
                    <div className="px-2 py-1 bg-purple-600 rounded text-sm">{currentFeaturedCourse.level}</div>
                  </div>
                  <button className="btn bg-white text-purple-900 hover:bg-purple-100 px-6 py-2 rounded-md font-medium transition-all">
                    Enroll Now
                  </button>
                </div>
                <div className="relative h-48 md:h-64 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={currentFeaturedCourse.image || "/placeholder.svg"}
                    alt={currentFeaturedCourse.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Featured course indicators */}
              {featuredCourses.length > 1 && (
                <div className="flex justify-center mt-6 gap-2">
                  {featuredCourses.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setFeaturedCourseIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === featuredCourseIndex ? "bg-white w-6" : "bg-white/50"
                      }`}
                      aria-label={`Go to featured course ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-bold">Course Catalog</h1>
            <Link href="/" className="flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:underline">
              <Home className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </div>

          {/* Search and filter bar */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search courses..."
                  className="w-full pl-10 pr-4 py-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white"
                />
              </div>
              <motion.button
                onClick={() => setShowFilters(!showFilters)}
                className="md:w-auto w-full btn btn-outline flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
                {hasActiveFilters && (
                  <span className="bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {selectedCategories.length +
                      selectedLevels.length +
                      selectedDurations.length +
                      (searchQuery ? 1 : 0)}
                  </span>
                )}
              </motion.button>
            </div>

            {/* Filters panel */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 p-4 border dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">Filter Courses</h3>
                    <div className="flex items-center gap-3">
                      {hasActiveFilters && (
                        <button
                          onClick={clearFilters}
                          className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300"
                        >
                          Clear all
                        </button>
                      )}
                      <button
                        onClick={() => setShowFilters(false)}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Categories */}
                    <div>
                      <h4 className="font-medium mb-2">Category</h4>
                      <div className="space-y-1">
                        {categories.map((category) => (
                          <label key={category} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedCategories.includes(category)}
                              onChange={() => toggleCategory(category)}
                              className="rounded text-purple-600 focus:ring-purple-500"
                            />
                            <span>{category}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Levels */}
                    <div>
                      <h4 className="font-medium mb-2">Level</h4>
                      <div className="space-y-1">
                        {levels.map((level) => (
                          <label key={level} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedLevels.includes(level)}
                              onChange={() => toggleLevel(level)}
                              className="rounded text-purple-600 focus:ring-purple-500"
                            />
                            <span>{level}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Duration */}
                    <div>
                      <h4 className="font-medium mb-2">Duration</h4>
                      <div className="space-y-1">
                        {durationRanges.map((range) => (
                          <label key={range.value} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedDurations.includes(range.value)}
                              onChange={() => toggleDuration(range.value)}
                              className="rounded text-purple-600 focus:ring-purple-500"
                            />
                            <span>{range.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Courses grid */}
          {filteredCourses.length === 0 ? (
            <div className="text-center py-16 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 shadow-sm">
              <BookOpen className="h-16 w-16 mx-auto mb-4 text-gray-400 dark:text-gray-500" />
              <p className="text-xl font-medium mb-2">No courses match your filters</p>
              <p className="mb-6">Try adjusting your search or filter criteria</p>
              <button onClick={clearFilters} className="btn btn-primary">
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="border dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-800"
                >
                  <div className="relative h-40">
                    <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
                    <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 px-2 py-1 rounded text-sm font-medium">
                      {course.level}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                        {course.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-medium">{course.rating}</span>
                      </div>
                    </div>
                    <h3 className="font-semibold mb-2 line-clamp-1">{course.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">{course.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                        <Clock className="h-4 w-4" />
                        <span>
                          {Math.floor(course.duration / 60)}h {course.duration % 60}m
                        </span>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">By {course.instructor}</span>
                    </div>
                    <button className="w-full mt-4 btn btn-primary">Enroll Now</button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
