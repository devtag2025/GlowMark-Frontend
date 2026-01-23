"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const FAQSection = () => {
  const [activeId, setActiveId] = useState(null);

  const faqs = [
    {
      id: "1",
      question: "Can I hope to reach the top spot on Google?",
      answer:
        "Reaching the top spot on Google is a bit like aiming for the summit of Mount Everest: it's ambitious, difficult, and requires considerable effort. But with a solid and well-developed SEO strategy, you can truly maximize your chances of ending up at the very top of search results. Nothing is guaranteed, because Google is unpredictable. But by working intelligently on all aspects of your SEO, you increase your chances of becoming one of the 'big players' on the web. 🚀",
    },
    {
      id: "2",
      question: "How long should I expect to wait for a response from you?",
      answer:
        "Our team strives to respond as quickly as possible. We are committed to contacting you within 2 business days of receiving your request.",
    },
    {
      id: "3",
      question: "Does requesting a test/quote commit me to anything?",
      answer:
        "Don't worry, the test and quote for your site are completely free and without obligation.",
    },
    {
      id: "4",
      question: "Can you promise me a result?",
      answer:
        "No one in the industry can realistically promise guaranteed results—Google alone controls its rankings. What we can promise is to do the job properly, apply proven best practices, and work tirelessly to improve your site's visibility and performance in search results.",
    },
    {
      id: "5",
      question: "How can I know if your solution is working?",
      answer:
        "You can find it yourself by searching for the keyword we worked on on Google. And of course, you will receive regular reports on the progress of your website's ranking for the chosen keywords.",
    },
    {
      id: "6",
      question: "How long does it take to analyze my website?",
      answer:
        "This depends on several factors, such as the number of keywords. Generally, you will receive a quote within 10 business days of our initial contact.",
    },
    {
      id: "7",
      question: "How long does a campaign last?",
      answer:
        "We recommend an initial period of 3 months, ideally 6, to achieve stable positions. Afterward, you choose the renewal period: 3, 6, or 12 months.",
    },
  ];

  const toggleFaq = (id) => setActiveId(activeId === id ? null : id);

  return (
    <section id="faq" className="py-24">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold mb-6">
            Frequently Asked{" "}
            <span className="text-gradient-purple">Questions</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-400 leading-relaxed text-center max-w-5xl">
            Transparency is the soul of Glow Mark Agency.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = activeId === faq.id;

            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: Number(faq.id) * 0.05 }}
                className={`overflow-hidden rounded-2xl border transition-all duration-300 hover:bg-purple-200 ${
                  isOpen
                    ? "border-purple-200 bg-purple-200 shadow-md shadow-purple-300"
                    : "border-slate-300 bg-white"
                }`}
              >
                <motion.button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-center justify-between p-6 text-left"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span
                    className={`text-sm md:text-base lg:text-lg font-bold transition-colors ${
                      isOpen ? "text-purple-800" : "text-slate-700"
                    }`}
                  >
                    {faq.question}
                  </span>
                  <motion.div
                    className={`text-sm md:text-base lg:text-lg p-2 rounded-full transition-all ${
                      isOpen
                        ? "bg-[#6B207A] text-white rotate-180"
                        : "bg-slate-100 text-slate-500"
                    }`}
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-slate-600 leading-relaxed font-medium text-sm md:text-base lg:text-lg">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
