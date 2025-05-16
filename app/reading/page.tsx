"use client"

import { useState, useMemo, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowDown,
  ArrowUp,
  BookOpen,
  Calendar,
  ChevronDown,
  ChevronUp,
  Search,
  Star,
  Home,
  PlusCircle,
  BarChart,
} from "lucide-react"
import Link from "next/link"

// Sample reading log data
const initialReadingLog = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    dateRead: "2023-05-15",
    rating: 5,
    genre: "Self-Help",
    notes: "Great book about building good habits and breaking bad ones.",
  },
  {
    id: 2,
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt, David Thomas",
    dateRead: "2023-04-02",
    rating: 4,
    genre: "Programming",
    notes: "Essential reading for software developers.",
  },
  {
    id: 3,
    title: "Dune",
    author: "Frank Herbert",
    dateRead: "2023-03-10",
    rating: 5,
    genre: "Science Fiction",
    notes: "A masterpiece of science fiction literature.",
  },
  {
    id: 4,
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    dateRead: "2023-02-20",
    rating: 4,
    genre: "Psychology",
    notes: "Fascinating insights into how we think and make decisions.",
  },
  {
    id: 5,
    title: "The Design of Everyday Things",
    author: "Don Norman",
    dateRead: "2023-01-15",
    rating: 3,
    genre: "Design",
    notes: "Changed how I look at product design.",
  },
  {
    id: 6,
    title: "Educated",
    author: "Tara Westover",
    dateRead: "2022-12-05",
    rating: 5,
    genre: "Memoir",
    notes: "Powerful memoir about the transformative power of education.",
  },
]

export default function ReadingLogPage() {
  const [readingLog, setReadingLog] = useState(initialReadingLog)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortField, setSortField] = useState("dateRead")
  const [sortDirection, setSortDirection] = useState("desc")
  const [expandedBookId, setExpandedBookId] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    dateRead: new Date().toISOString().split("T")[0],
    rating: 3,
    genre: "",
    notes: "",
  })
  const [mounted, setMounted] = useState(false)

  // Ensure hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle sort change
  const handleSort = (field) => {
    if (sortField === field) {
      // Toggle direction if same field
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      // New field, default to descending
      setSortField(field)
      setSortDirection("desc")
    }
  }

  // Toggle book details
  const toggleBookDetails = (id) => {
    setExpandedBookId(expandedBookId === id ? null : id)
  }

  // Handle input change for new book
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewBook({
      ...newBook,
      [name]: value,
    })
  }

  // Add new book
  const addBook = (e) => {
    e.preventDefault()

    const newBookEntry = {
      id: Date.now(),
      ...newBook,
    }

    setReadingLog([newBookEntry, ...readingLog])
    setShowAddForm(false)
    setNewBook({
      title: "",
      author: "",
      dateRead: new Date().toISOString().split("T")[0],
      rating: 3,
      genre: "",
      notes: "",
    })
  }

  // Filter and sort books
  const filteredAndSortedBooks = useMemo(() => {
    // First filter
    const filtered = readingLog.filter(
      (book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.notes.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    // Then sort
    return filtered.sort((a, b) => {
      let comparison = 0

      if (sortField === "rating" || sortField === "dateRead") {
        // Numeric or date comparison
        comparison = a[sortField] > b[sortField] ? 1 : -1
      } else {
        // String comparison
        comparison = a[sortField].localeCompare(b[sortField])
      }

      // Reverse if descending
      return sortDirection === "desc" ? comparison * -1 : comparison
    })
  }, [readingLog, searchQuery, sortField, sortDirection])

  // Get unique genres for filter
  const genres = [...new Set(readingLog.map((book) => book.genre))]

  // Calculate reading stats
  const readingStats = useMemo(() => {
    const totalBooks = readingLog.length
    const totalRating = readingLog.reduce((sum, book) => sum + Number(book.rating), 0)
    const avgRating = totalBooks > 0 ? (totalRating / totalBooks).toFixed(1) : 0

    // Count books by genre
    const genreCounts = readingLog.reduce((acc, book) => {
      acc[book.genre] = (acc[book.genre] || 0) + 1
      return acc
    }, {})

    // Find most read genre
    let mostReadGenre = "None"
    let maxCount = 0

    for (const [genre, count] of Object.entries(genreCounts)) {
      if (count > maxCount) {
        mostReadGenre = genre
        maxCount = count
      }
    }

    // Books read by month
    const booksByMonth = readingLog.reduce((acc, book) => {
      const date = new Date(book.dateRead)
      const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`
      acc[monthYear] = (acc[monthYear] || 0) + 1
      return acc
    }, {})

    return {
      totalBooks,
      avgRating,
      mostReadGenre,
      genreCounts,
      booksByMonth,
    }
  }, [readingLog])

  // Render stars for rating
  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <Star
          key={index}
          className={`h-4 w-4 ${index < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300 dark:text-gray-600"}`}
        />
      ))
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-bold">Reading Log</h1>
            <Link href="/" className="flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:underline">
              <Home className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </div>

          {/* Search and add */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search books..."
                className="w-full pl-10 pr-4 py-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white"
              />
            </div>
            <motion.button
              onClick={() => setShowAddForm(!showAddForm)}
              className="btn btn-primary flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {showAddForm ? (
                <span>Cancel</span>
              ) : (
                <>
                  <PlusCircle className="h-4 w-4" />
                  <span>Add Book</span>
                </>
              )}
            </motion.button>
          </div>

          {/* Add book form */}
          <AnimatePresence>
            {showAddForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8 overflow-hidden"
              >
                <form
                  onSubmit={addBook}
                  className="border dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-800 shadow-sm"
                >
                  <h2 className="text-xl font-semibold mb-4">Add New Book</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Title</label>
                      <input
                        type="text"
                        name="title"
                        value={newBook.title}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Author</label>
                      <input
                        type="text"
                        name="author"
                        value={newBook.author}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Genre</label>
                      <input
                        type="text"
                        name="genre"
                        value={newBook.genre}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Date Read</label>
                      <input
                        type="date"
                        name="dateRead"
                        value={newBook.dateRead}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Rating</label>
                      <select
                        name="rating"
                        value={newBook.rating}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white"
                      >
                        <option value="1">1 Star</option>
                        <option value="2">2 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="5">5 Stars</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Notes</label>
                    <textarea
                      name="notes"
                      value={newBook.notes}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white"
                    />
                  </div>
                  <div className="flex justify-end">
                    <motion.button
                      type="submit"
                      className="btn btn-primary"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Add to Reading Log
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Reading stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700 shadow-sm">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Books</div>
              <div className="text-2xl font-bold">{readingStats.totalBooks}</div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700 shadow-sm">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Average Rating</div>
              <div className="flex items-center">
                <div className="text-2xl font-bold mr-2">{readingStats.avgRating}</div>
                <div className="flex">{renderStars(Math.round(readingStats.avgRating))}</div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700 shadow-sm">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Most Read Genre</div>
              <div className="text-2xl font-bold">{readingStats.mostReadGenre}</div>
            </div>
          </motion.div>

          {/* Reading insights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8 bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Reading Insights</h2>
              <div className="flex items-center text-sm text-purple-600 dark:text-purple-400">
                <BarChart className="h-4 w-4 mr-1" />
                <span>View Detailed Analytics</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Genre distribution */}
              <div>
                <h3 className="text-sm font-medium mb-3">Genre Distribution</h3>
                <div className="space-y-2">
                  {Object.entries(readingStats.genreCounts).map(([genre, count]) => (
                    <div key={genre}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{genre}</span>
                        <span>{count} books</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-purple-600 dark:bg-purple-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${(count / readingStats.totalBooks) * 100}%` }}
                          transition={{ duration: 1 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rating distribution */}
              <div>
                <h3 className="text-sm font-medium mb-3">Rating Distribution</h3>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => {
                    const count = readingLog.filter((book) => Number(book.rating) === rating).length
                    return (
                      <div key={rating}>
                        <div className="flex justify-between text-sm mb-1">
                          <div className="flex">{renderStars(rating)}</div>
                          <span>{count} books</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-yellow-500 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${(count / readingStats.totalBooks) * 100}%` }}
                            transition={{ duration: 1 }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Books table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="border dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-sm"
          >
            {/* Table header */}
            <div className="grid grid-cols-12 bg-gray-50 dark:bg-gray-800 p-4 border-b dark:border-gray-700">
              <div
                className="col-span-5 font-medium flex items-center gap-1 cursor-pointer"
                onClick={() => handleSort("title")}
              >
                Title
                {sortField === "title" &&
                  (sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />)}
              </div>
              <div
                className="col-span-3 font-medium flex items-center gap-1 cursor-pointer"
                onClick={() => handleSort("author")}
              >
                Author
                {sortField === "author" &&
                  (sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />)}
              </div>
              <div
                className="col-span-2 font-medium flex items-center gap-1 cursor-pointer"
                onClick={() => handleSort("dateRead")}
              >
                Date
                {sortField === "dateRead" &&
                  (sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />)}
              </div>
              <div
                className="col-span-2 font-medium flex items-center gap-1 cursor-pointer"
                onClick={() => handleSort("rating")}
              >
                Rating
                {sortField === "rating" &&
                  (sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />)}
              </div>
            </div>

            {/* Table body */}
            {filteredAndSortedBooks.length === 0 ? (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                <BookOpen className="h-12 w-12 mx-auto mb-3 text-gray-400 dark:text-gray-500" />
                <p className="text-lg font-medium mb-1">No books found</p>
                <p className="text-sm">Try adjusting your search or add a new book</p>
              </div>
            ) : (
              <div>
                {filteredAndSortedBooks.map((book) => (
                  <div key={book.id}>
                    <div
                      className="grid grid-cols-12 p-4 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/80 cursor-pointer transition-colors"
                      onClick={() => toggleBookDetails(book.id)}
                    >
                      <div className="col-span-5 font-medium">{book.title}</div>
                      <div className="col-span-3 text-gray-600 dark:text-gray-300">{book.author}</div>
                      <div className="col-span-2 text-gray-600 dark:text-gray-300 flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>{new Date(book.dateRead).toLocaleDateString()}</span>
                      </div>
                      <div className="col-span-2 flex items-center">
                        <div className="flex mr-2">{renderStars(book.rating)}</div>
                        <button className="ml-auto text-gray-400">
                          {expandedBookId === book.id ? (
                            <ChevronUp className="h-5 w-5" />
                          ) : (
                            <ChevronDown className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Expanded details */}
                    <AnimatePresence>
                      {expandedBookId === book.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="border-b dark:border-gray-700 overflow-hidden"
                        >
                          <div className="p-4 bg-gray-50 dark:bg-gray-800/50">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div>
                                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Genre</div>
                                <div>{book.genre || "Not specified"}</div>
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Date Read</div>
                                <div>
                                  {new Date(book.dateRead).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
                                </div>
                              </div>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Notes</div>
                              <div className="bg-white dark:bg-gray-800 p-3 rounded border dark:border-gray-700">
                                {book.notes || "No notes added."}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
