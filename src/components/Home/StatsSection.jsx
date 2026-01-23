"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const StatsSection = () => {
  const stats = [
    {
      value: 98,
      suffix: "%",
      desc: "Boosted To the First Page of Google",
    },
    {
      value: 99,
      suffix: "%",
      desc: "Higher in Google Rankings",
    },
    {
      value: 20000, // FIXED: Changed "20,000" (string) to 20000 (number)
      suffix: "+",
      desc: "Free Trials Requested",
    },
  ];

  function Counter({ target, suffix }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const started = useRef(false);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            let start = 0;
            const duration = 1500;
            const increment = target / (duration / 16);

            const update = () => {
              start += increment;
              if (start < target) {
                setCount(Math.floor(start));
                requestAnimationFrame(update);
              } else {
                setCount(target);
              }
            };
            update();
          }
        },
        { threshold: 0.4 },
      );

      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
    }, [target]);

    return (
      <span ref={ref} className="tabular-nums">
        {/* FIXED: Added .toLocaleString() to display the comma back to the user */}
        {count.toLocaleString()}
        <span className="text-2xl md:text-3xl opacity-80 ml-0.5">{suffix}</span>
      </span>
    );
  }

  return (
    <section className="py-10 md:py-10  relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold mb-4">
            Our Impact in
            <span className="text-gradient-purple"> Numbers</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-5xl">
            We help brands grow and shine online. These numbers tell the story
            of our results-driven approach.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="
                relative overflow-hidden rounded-2xl p-8 text-center gradient-block shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_20px_40px_-15px_rgba(20,184,166,0.25)]
              "
            >
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-white rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="text-5xl md:text-6xl font-bold text-white drop-shadow-sm mb-3">
                  <Counter target={item.value} suffix={item.suffix} />
                </div>

                <p className="text-sm md:text-lg font-medium text-white tracking-tight">
                  {item.desc}
                </p>
              </div>

              <div className="absolute top-4 right-6 flex gap-1">
                <div className="w-3 h-3 rounded-full bg-white/70" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
