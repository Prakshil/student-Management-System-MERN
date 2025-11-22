import React from "react";
import { motion } from "framer-motion";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

const Testimonials = () => {
  const testimonials = [
    {
      quote:
        "StudentMS has transformed how we manage our institution. The analytics dashboard gives us insights we never had before, and our staff efficiency has increased by 40%.",
      name: "Dr. Sarah Johnson",
      title: "Principal, Greenwood High School",
    },
    {
      quote:
        "As a teacher, I love how easy it is to track student progress and communicate with parents. The assignment portal has made my job so much easier.",
      name: "Michael Chen",
      title: "Math Teacher, Lincoln Academy",
    },
    {
      quote:
        "The attendance tracking system is incredibly accurate and saves us hours every week. Parents appreciate the real-time notifications too!",
      name: "Emily Rodriguez",
      title: "Administrator, Riverside School",
    },
    {
      quote:
        "We've seen a significant improvement in parent engagement since implementing StudentMS. The communication features are top-notch.",
      name: "James Williams",
      title: "Dean, Oakwood Institute",
    },
    {
      quote:
        "The grade management system is intuitive and powerful. Report card generation that used to take days now takes minutes.",
      name: "Dr. Priya Patel",
      title: "Academic Director, Summit School",
    },
    {
      quote:
        "StudentMS has been a game-changer for our remote learning programs. The platform is reliable, secure, and easy to use.",
      name: "Robert Thompson",
      title: "IT Director, Valley High School",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8" id="testimonials">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
            Loved by Educators Worldwide
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            See what educational institutions are saying about StudentMS
          </p>
        </motion.div>

        <div className="relative">
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
          />
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
        >
          {[
            { number: "10K+", label: "Active Schools" },
            { number: "500K+", label: "Students Managed" },
            { number: "98%", label: "Satisfaction Rate" },
            { number: "24/7", label: "Support Available" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2"
              >
                {stat.number}
              </motion.div>
              <div className="text-neutral-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
