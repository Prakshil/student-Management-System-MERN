import React from "react";
import { motion } from "framer-motion";
import { CardSpotlight } from "@/components/ui/card-spotlight";

const Features = () => {
  const features = [
    {
      title: "Student Analytics",
      description: "Track performance metrics, attendance, and grades in real-time with powerful analytics dashboards.",
      icon: "📊",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Attendance Tracking",
      description: "Automated attendance management with biometric integration and instant notifications.",
      icon: "✓",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Grade Management",
      description: "Comprehensive grading system with automated calculations and report generation.",
      icon: "🎓",
      gradient: "from-orange-500 to-red-500",
    },
    {
      title: "Communication Hub",
      description: "Seamless communication between students, teachers, and parents with instant messaging.",
      icon: "💬",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      title: "Assignment Portal",
      description: "Digital assignment submission, grading, and feedback system for efficient workflow.",
      icon: "📝",
      gradient: "from-indigo-500 to-blue-500",
    },
    {
      title: "Resource Library",
      description: "Centralized digital library with course materials, e-books, and learning resources.",
      icon: "📚",
      gradient: "from-pink-500 to-rose-500",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8" id="features">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
            Powerful Features
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            Everything you need to manage your educational institution efficiently
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <CardSpotlight className="h-full">
                <div className="relative h-full p-6">
                  <div className={`text-5xl mb-4 bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </CardSpotlight>
            </motion.div>
          ))}
        </div>

        {/* Bento Grid Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-12">
            Why Choose StudentMS?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Large Feature */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-purple-500/50 transition-all"
            >
              <div className="h-full flex flex-col justify-between">
                <div>
                  <div className="text-6xl mb-4">🚀</div>
                  <h4 className="text-2xl font-bold text-white mb-4">
                    Lightning Fast Performance
                  </h4>
                  <p className="text-neutral-400">
                    Built with modern technologies for instant load times and seamless interactions. Experience the speed difference.
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400"></div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"></div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-400 to-red-400"></div>
                  </div>
                  <span className="text-sm text-neutral-400">Trusted by 10k+ institutions</span>
                </div>
              </div>
            </motion.div>

            {/* Small Features */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-pink-500/50 transition-all"
            >
              <div className="text-4xl mb-3">🔒</div>
              <h4 className="text-lg font-bold text-white mb-2">
                Secure & Private
              </h4>
              <p className="text-sm text-neutral-400">
                Bank-level encryption for all student data
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-orange-500/50 transition-all"
            >
              <div className="text-4xl mb-3">📱</div>
              <h4 className="text-lg font-bold text-white mb-2">
                Mobile Ready
              </h4>
              <p className="text-sm text-neutral-400">
                Access anywhere on any device
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-green-500/50 transition-all"
            >
              <div className="text-4xl mb-3">⚡</div>
              <h4 className="text-lg font-bold text-white mb-2">
                Real-time Updates
              </h4>
              <p className="text-sm text-neutral-400">
                Instant notifications and live data sync
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-indigo-500/10 to-blue-500/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-indigo-500/50 transition-all"
            >
              <div className="text-4xl mb-3">🎯</div>
              <h4 className="text-lg font-bold text-white mb-2">
                Easy Integration
              </h4>
              <p className="text-sm text-neutral-400">
                Connect with existing school systems
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
