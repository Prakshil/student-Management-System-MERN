import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How secure is student data on StudentMS?",
      answer:
        "We use bank-level 256-bit AES encryption for all data at rest and in transit. Our platform is GDPR and FERPA compliant, with regular security audits and penetration testing. All data is backed up daily with 99.9% uptime guarantee.",
    },
    {
      question: "Can StudentMS integrate with our existing systems?",
      answer:
        "Yes! StudentMS offers seamless integration with popular educational platforms including Google Classroom, Microsoft Teams, Canvas, and Moodle. We also provide REST APIs and webhooks for custom integrations.",
    },
    {
      question: "What kind of support do you offer?",
      answer:
        "We provide 24/7 customer support via chat, email, and phone. Enterprise customers get a dedicated account manager, priority support, and on-site training. Our comprehensive documentation and video tutorials are available to all users.",
    },
    {
      question: "Is there a mobile app available?",
      answer:
        "Yes! StudentMS has native mobile apps for both iOS and Android. Students, teachers, and parents can access all features on-the-go with offline mode support for critical functions.",
    },
    {
      question: "How long does implementation take?",
      answer:
        "Most schools are up and running within 2-4 weeks. This includes data migration, staff training, and customization. Our dedicated onboarding team works closely with you to ensure a smooth transition.",
    },
    {
      question: "What's included in the pricing?",
      answer:
        "All plans include unlimited students, storage, core features, mobile apps, regular updates, and standard support. Premium plans add advanced analytics, custom branding, API access, and priority support.",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8" id="faq">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-neutral-400 text-lg">
            Everything you need to know about StudentMS
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="border border-white/10 rounded-2xl overflow-hidden bg-gradient-to-br from-neutral-900/50 to-neutral-950/50 backdrop-blur-sm"
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
              >
                <span className="text-lg font-semibold text-white pr-8">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <svg
                    className="w-6 h-6 text-purple-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </motion.div>
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-neutral-400 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Still have questions?
            </h3>
            <p className="text-neutral-400 mb-6">
              Our team is here to help you find the perfect solution for your institution
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all"
            >
              Contact Support
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
