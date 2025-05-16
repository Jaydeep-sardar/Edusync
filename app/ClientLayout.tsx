"use client"

import { Inter } from "next/font/google"
import Link from "next/link"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BookOpen, Menu, X, Github, Twitter, Linkedin, Mail, Moon, Sun } from "lucide-react"
import type { ReactNode } from "react"

import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({ children }: { children: ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Flashcards", href: "/flashcards" },
    { name: "Quiz", href: "/quiz" },
    { name: "Habits", href: "/habits" },
    { name: "Courses", href: "/courses" },
    { name: "Reading", href: "/reading" },
  ]

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} dark:bg-gray-900 dark:text-white min-h-screen flex flex-col`}>
        <header
          className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm" : "bg-transparent"}`}
        >
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2 font-semibold text-xl z-10">
                <BookOpen className="h-6 w-6 text-purple-600" />
                <span>EduSync</span>
              </Link>

              <div className="flex items-center gap-4">
                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>

                {/* Dark mode toggle */}
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-gray-600" />}
                </button>

                {/* Mobile menu button */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? (
                    <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                  ) : (
                    <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800"
              >
                <nav className="container mx-auto px-4 py-4 flex flex-col gap-3">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-2 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="bg-gray-900 text-white pt-16 pb-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
              <div>
                <div className="flex items-center gap-2 font-semibold text-xl mb-4">
                  <BookOpen className="h-6 w-6 text-purple-400" />
                  <span>EduSync</span>
                </div>
                <p className="text-gray-400 mb-4">
                  Comprehensive educational tools to enhance your learning journey and help you achieve your goals.
                </p>
                <div className="flex gap-4">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="GitHub">
                    <Github className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-4">Features</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link href="/flashcards" className="text-gray-400 hover:text-white transition-colors">
                      Flashcards
                    </Link>
                  </li>
                  <li>
                    <Link href="/quiz" className="text-gray-400 hover:text-white transition-colors">
                      Quiz App
                    </Link>
                  </li>
                  <li>
                    <Link href="/habits" className="text-gray-400 hover:text-white transition-colors">
                      Habit Tracker
                    </Link>
                  </li>
                  <li>
                    <Link href="/courses" className="text-gray-400 hover:text-white transition-colors">
                      Course Catalog
                    </Link>
                  </li>
                  <li>
                    <Link href="/reading" className="text-gray-400 hover:text-white transition-colors">
                      Reading Log
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Tutorials
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Community
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Support
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
                <p className="text-gray-400 mb-4">Have questions or feedback? We'd love to hear from you.</p>
                <a
                  href="mailto:contact@edusync.com"
                  className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                >
                  <Mail className="h-5 w-5" />
                  <span>contact@edusync.com</span>
                </a>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm mb-4 md:mb-0">
                © {new Date().getFullYear()} EduSync. All rights reserved.
              </p>
              <div className="flex gap-6 text-sm">
                <a href="#" className="text-gray-500 hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-500 hover:text-white transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="text-gray-500 hover:text-white transition-colors">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
