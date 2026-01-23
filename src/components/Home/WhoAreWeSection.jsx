"use client";

import { Lightbulb, Users, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const WhoWeAre = () => {
  const features = [
    {
      title: "Communication & Marketing",
      subtitle: "A service approaching excellence",
      icon: <Users className="w-8 h-8" />,
    },
    {
      title: "Innovation",
      subtitle: "Continuously learning and adapting",
      icon: <Lightbulb className="w-8 h-8" />,
    },
    {
      title: "Experience",
      subtitle: "Over ten years of expertise",
      icon: <BookOpen className="w-8 h-8" />,
    },
  ];

  return (
    <section className="relative bg-purple-50 py-20 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-6"
      >
        <div className="bg-purple-600 text-white font-semibold px-4 py-1 rounded-full text-sm sm:text-base">
          Who We Are?
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-gray-900 text-center mt-2">
          <span className="text-gradient-purple">Glow Mark</span> Agency
        </h2>

        <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed text-center mt-4 max-w-5xl">
          Glow Mark Agency transforms your online visibility with years of
          expertise in communication and SEO. Innovative strategies, targeted
          optimization, and measurable results propel your brand to the top of
          search engines while capturing your audience.
        </p>

        {/* Feature Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 w-full"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.03 }}
              className="flex flex-col items-center text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-purple-300 transition duration-300 glow-card"
            >
              <span className="w-10 h-10 text-purple-600 mb-2">
                {feature.icon}
              </span>
              <h4 className="font-semibold text-lg text-purple-900">
                {feature.title}
              </h4>
              <p className="text-sm md:text-base text-slate-600 mt-1">
                {feature.subtitle}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed text-center max-w-5xl mt-6">
          With a degree in Com & Marketing and over ten years of experience
          under our belt, you can be assured that you are in good hands with us.
        </p>
      </motion.div>
    </section>
  );
};

export default WhoWeAre;
