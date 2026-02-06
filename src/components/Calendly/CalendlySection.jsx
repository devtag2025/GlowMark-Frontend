"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Calendar, Clock, CheckCircle, X } from "lucide-react";

export default function CalendlySection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    // Prevent body scroll when modal is open
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  useEffect(() => {
    // Reinitialize Calendly widget when modal opens
    if (isModalOpen && window.Calendly) {
      window.Calendly.initInlineWidget({
        url: "https://calendly.com/glowmarkagency-sales/30min",
        parentElement: document.getElementById("calendly-container"),
      });
    }
  }, [isModalOpen]);

  const features = [
    {
      icon: Calendar,
      title: "Choose Your Time",
      description: "Select a convenient time slot that fits your schedule",
    },
    {
      icon: Phone,
      title: "We'll Call You",
      description: "Our team will call you at the scheduled time",
    },
    {
      icon: CheckCircle,
      title: "No Commitment",
      description: "Free consultation with no obligations",
    },
  ];

  return (
    <>
      <section
        id="phone-appointment"
        className="relative py-24 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="bg-[#6B207A]/20 border border-[#6B207A]/50 inline-flex w-fit text-purple-900 font-semibold px-4 py-1 rounded-full text-sm mx-auto backdrop-blur-sm mb-6">
              <Phone className="w-4 h-4 mr-2" />
              Schedule a Call
            </div>

            <h2 className="text-4xl md:text-6xl font-extrabold mb-6">
              Book a{" "}
              <span className="text-gradient-purple">Phone Appointment</span>
            </h2>

            <p className="text-base sm:text-lg lg:text-xl text-theme-muted leading-relaxed max-w-3xl mx-auto">
              Choose a convenient time and we'll personally call you to discuss
              your project, requirements, or any questions you may have.
            </p>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] hover:border-purple-500/30 transition-all"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30 mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-theme mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-theme-secondary leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Schedule Call Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <button
              onClick={() => setIsModalOpen(true)}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold rounded-2xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105"
            >
              <Calendar className="w-5 h-5" />
              Schedule a Call Now
            </button>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12 max-w-2xl mx-auto text-center"
          >
            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-6">
              <h4 className="font-bold text-theme mb-2">What to Expect</h4>
              <p className="text-sm text-theme-secondary">
                During the call, we'll discuss your needs, answer your
                questions, and explore how we can help grow your business. The
                consultation is completely free with no obligations.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modal - Fixed positioning with proper z-index */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9998]"
            />

            {/* Modal Content */}
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden relative"
              >
                {/* Close Button - Prominent */}
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-6 right-6 z-[10000] w-12 h-12 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110"
                  aria-label="Close"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Modal Header */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-800">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    Schedule Your Call
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 ml-15">
                    Pick a time that works best for you
                  </p>
                </div>

                {/* Calendly Container */}
                <div className="overflow-y-auto max-h-[calc(90vh-160px)]">
                  <div
                    id="calendly-container"
                    className="calendly-inline-widget"
                    data-url="https://calendly.com/glowmarkagency-sales/30min"
                    style={{
                      minWidth: "100%",
                      height: "700px",
                    }}
                  />
                </div>

                {/* Privacy Note */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                  <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2">
                    <Clock className="w-4 h-4" />
                    Your information is secure and will only be used to contact
                    you for your appointment.
                  </p>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
