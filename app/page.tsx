"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, BookOpen, CheckSquare, FileText, ListTodo, PenTool, BarChart3 } from "lucide-react"

export default function HomePage() {
  const [activeIndex, setActiveIndex] = useState(0)

  // Auto-rotate featured cards
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 5)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=800&width=1600')] bg-no-repeat bg-cover"></div>
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Elevate Your Learning Journey</h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-8">
              Comprehensive tools to help you learn, track progress, and achieve your educational goals
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/dashboard"
                className="btn bg-white text-purple-900 hover:bg-purple-100 px-8 py-3 rounded-full font-medium transition-all"
              >
                View Dashboard
              </Link>
              <Link
                href="#features"
                className="btn bg-transparent border-2 border-white hover:bg-white/10 px-8 py-3 rounded-full font-medium transition-all"
              >
                Explore Features
              </Link>
            </div>
          </motion.div>

          {/* Floating cards */}
          <div className="relative h-64 md:h-80 mt-12">
            {[
              {
                title: "Flashcards",
                icon: <FileText className="h-6 w-6" />,
                color: "bg-gradient-to-br from-pink-500 to-purple-600",
              },
              {
                title: "Quiz App",
                icon: <PenTool className="h-6 w-6" />,
                color: "bg-gradient-to-br from-blue-500 to-indigo-600",
              },
              {
                title: "Habit Tracker",
                icon: <CheckSquare className="h-6 w-6" />,
                color: "bg-gradient-to-br from-green-500 to-teal-600",
              },
              {
                title: "Course Catalog",
                icon: <ListTodo className="h-6 w-6" />,
                color: "bg-gradient-to-br from-orange-500 to-amber-600",
              },
              {
                title: "Reading Log",
                icon: <BookOpen className="h-6 w-6" />,
                color: "bg-gradient-to-br from-purple-500 to-violet-600",
              },
            ].map((card, index) => (
              <motion.div
                key={index}
                className={`absolute top-0 left-0 right-0 mx-auto w-64 md:w-80 p-6 rounded-xl shadow-xl ${card.color} text-white`}
                initial={{ opacity: 0, y: 100, rotate: index % 2 === 0 ? -5 : 5 }}
                animate={{
                  opacity: activeIndex === index ? 1 : 0.7,
                  y: activeIndex === index ? 0 : 40,
                  rotate: index % 2 === 0 ? -5 : 5,
                  scale: activeIndex === index ? 1 : 0.9,
                  zIndex: activeIndex === index ? 10 : 5 - Math.abs(activeIndex - index),
                }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white">{card.icon}</div>
                </div>
                <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
                <p className="text-white/80 text-sm">Interactive learning tools to boost your knowledge and skills</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-12 md:h-16"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C0,0,0,0,0,0Z"
              className="fill-white"
            ></path>
          </svg>
        </div>
      </section>

      {/* Features section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Powerful Learning Tools
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              A comprehensive suite of educational tools designed to enhance your learning experience
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              title="Flashcards"
              description="Review flashcards with a beautiful flip animation and track what you know"
              icon={<FileText className="h-6 w-6" />}
              href="/flashcards"
              delay={0}
            />
            <FeatureCard
              title="Quiz App"
              description="Test your knowledge with interactive quizzes and see your score"
              icon={<PenTool className="h-6 w-6" />}
              href="/quiz"
              delay={0.1}
            />
            <FeatureCard
              title="Habit Tracker"
              description="Track your daily learning habits with a visual progress bar"
              icon={<CheckSquare className="h-6 w-6" />}
              href="/habits"
              delay={0.2}
            />
            <FeatureCard
              title="Course Catalog"
              description="Browse courses filtered by topic and estimated completion time"
              icon={<ListTodo className="h-6 w-6" />}
              href="/courses"
              delay={0.3}
            />
            <FeatureCard
              title="Reading Log"
              description="Keep track of your reading with a sortable table and ratings"
              icon={<BookOpen className="h-6 w-6" />}
              href="/reading"
              delay={0.4}
            />
            <FeatureCard
              title="Analytics Dashboard"
              description="Visualize your learning progress with comprehensive analytics"
              icon={<BarChart3 className="h-6 w-6" />}
              href="/dashboard"
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              What Our Users Say
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Join thousands of learners who have transformed their educational journey
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "The flashcard system has completely transformed how I study for exams. I've seen a 30% improvement in my retention!",
                name: "Alex Johnson",
                title: "Computer Science Student",
              },
              {
                quote:
                  "I've tried many habit trackers, but this one is perfect for my learning goals. The visual progress keeps me motivated.",
                name: "Sarah Williams",
                title: "Language Learner",
              },
              {
                quote:
                  "The course catalog helped me find exactly what I needed to advance my career. The filtering options are incredibly useful.",
                name: "Michael Chen",
                title: "Professional Developer",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <div className="mb-4 text-purple-600">
                  <svg width="45" height="36" className="fill-current">
                    <path d="M13.415.43c-2.523 0-4.75 1.173-6.682 3.52C4.8 6.298 3.756 9.38 3.756 12.89c0 3.247.713 6.2 2.138 8.854 1.425 2.656 3.348 4.78 5.77 6.37 2.42 1.591 5.093 2.386 8.02 2.386 2.523 0 4.652-.795 6.388-2.386 1.736-1.59 2.604-3.52 2.604-5.788 0-2.27-.868-4.198-2.604-5.788-1.736-1.591-3.865-2.386-6.388-2.386-1.425 0-2.658.397-3.7 1.193L13.414 18c-1.425 0-2.55-.596-3.374-1.789-.713-1.193-1.07-2.781-1.07-4.768 0-1.986.357-3.574 1.07-4.768.713-1.192 1.839-1.789 3.375-1.789.535 0 1.07.099 1.605.298.535.198.975.396 1.32.595l1.425-2.386C16.19 1.322 14.84.43 13.414.43zm21.039 0c-2.523 0-4.75 1.173-6.682 3.52-1.933 2.348-2.9 5.43-2.9 9.243 0 3.247.713 6.2 2.138 8.854 1.425 2.656 3.348 4.78 5.77 6.37 2.42 1.591 5.093 2.386 8.02 2.386 2.523 0 4.652-.795 6.388-2.386 1.736-1.59 2.604-3.52 2.604-5.788 0-2.27-.868-4.198-2.604-5.788-1.736-1.591-3.865-2.386-6.388-2.386-1.425 0-2.658.397-3.7 1.193L34.453 18c-1.425 0-2.55-.596-3.374-1.789-.713-1.193-1.07-2.781-1.07-4.768 0-1.986.357-3.574 1.07-4.768.713-1.192 1.839-1.789 3.375-1.789.535 0 1.07.099 1.605.298.535.198.975.396 1.32.595l1.425-2.386C37.23 1.322 35.88.43 34.453.43z" />
                  </svg>
                </div>
                <p className="text-gray-700 mb-6">{testimonial.quote}</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-xl">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-700 to-purple-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Ready to Transform Your Learning?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto"
          >
            Start using our comprehensive suite of learning tools today and see the difference in your educational
            journey.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              href="/dashboard"
              className="btn bg-white text-purple-900 hover:bg-purple-100 px-8 py-3 rounded-full font-medium transition-all inline-block"
            >
              Get Started Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ title, description, icon, href, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <Link
        href={href}
        className="block group h-full p-6 border rounded-xl shadow-sm hover:shadow-md transition-all duration-300 bg-white hover:bg-gray-50"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-purple-100 rounded-lg text-purple-600 group-hover:bg-purple-200 transition-colors">
            {icon}
          </div>
          <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-purple-500 group-hover:translate-x-1 transition-all" />
        </div>
        <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-700 transition-colors">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </Link>
    </motion.div>
  )
}
