"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Phone, Clock } from "lucide-react";

export default function ScheduleCallPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.head.appendChild(script);

    // Initialize Calendly when script loads
    script.onload = () => {
      if (window.Calendly) {
        window.Calendly.initInlineWidget({
          url: "https://calendly.com/glowmarkagency-sales/30min",
          parentElement: document.getElementById("calendly-embed"),
        });
        // Hide loader after a short delay to ensure widget is rendered
        setTimeout(() => setIsLoading(false), 1000);
      }
    };

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Loader */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900">
          <div className="text-center">
            {/* Three Dots Loader */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <motion.div
                className="w-4 h-4 bg-purple-600 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.5, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: 0,
                }}
              />
              <motion.div
                className="w-4 h-4 bg-purple-600 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.5, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: 0.2,
                }}
              />
              <motion.div
                className="w-4 h-4 bg-purple-600 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.5, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: 0.4,
                }}
              />
            </div>
            <p className="text-gray-600 dark:text-gray-400 font-medium">
              Loading calendar...
            </p>
          </div>
        </div>
      )}

      {/* Main Content - Added proper padding-top for header */}
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-12">
        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            Book Your Free Consultation
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
            Choose a convenient time and we'll personally call you to discuss
            your project, requirements, or any questions you may have.
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                  Choose Your Time
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Select a slot that fits your schedule
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                  We'll Call You
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Our team will reach out at scheduled time
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                  30 Minutes
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Free consultation, no obligations
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Calendly Embed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          <div
            id="calendly-embed"
            className="calendly-inline-widget"
            style={{
              minWidth: "100%",
              height: "700px",
            }}
          />
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Your information is secure and will only be used to contact you for
            your appointment.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
