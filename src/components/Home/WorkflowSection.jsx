"use client";

import {
  CircleArrowRight,
  CircleCheck,
  Eye,
  Flag,
  SquareCheck,
  Star,
} from "lucide-react";
import { motion } from "framer-motion";
import React from "react";

const WorkflowSection = () => {
  const steps = [
    {
      no: "1",
      title: "Free trial",
      sub: "You can see for yourself the effectiveness of our solution: your site climbs in Google results, and all this without spending a single euro.",
      icon: CircleCheck,
    },
    {
      no: "2",
      title: "Analysis",
      sub: "We start by identifying the strategic keywords for your industry, then you can use our solution to significantly improve your positioning in search results.",
      icon: Flag,
    },
    {
      no: "3",
      title: "Free Quote",
      sub: "We will send you a free, no-obligation quote with the so-called “boostable” keywords for your site, as well as the price of each of them per campaign.",
      icon: Eye,
    },
    {
      no: "4",
      title: "Tracking",
      sub: "You will receive a monthly report on your site's Google ranking for your chosen keywords, as well as for other related keywords. Your site's overall ranking by Google will also be improved.",
      icon: CircleArrowRight,
    },
    {
      no: "5",
      title: "Campaigns",
      sub: "At Glow Mark Agency, we've decided to work on a campaign basis. Once you're satisfied with your test, you can choose a 3, 6, or 12-month campaign.",
      icon: SquareCheck,
    },
    {
      no: "6",
      title: "Authority",
      sub: "Glow Mark Agency improves your website's visibility in search engines by generating high-quality backlinks. These links strengthen your credibility and boost your site's ranking in Google search results.",
      icon: Star,
    },
  ];

  return (
    <section className="bg-white py-24 text-slate-900 overflow-hidden">
      <div className="flex flex-col gap-5 justify-center max-w-4xl mx-auto px-6">
        <div className="bg-purple-600 inline-flex w-fit  text-white font-semibold px-4 py-1 rounded-full text-sm sm:text-base mx-auto">
          How we work
        </div>{" "}
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-slate-900 mb-4">
            Our
            <span className="text-gradient-purple"> Digital </span>Flow
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600">
            Where strategy meets execution, and visibility turns into growth
          </p>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 relative z-10">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <step.icon className="text-purple-600 w-8 h-8" />
              <p className="text-sm text-slate-600 tracking-tighter text-center">
                {step.title}
              </p>
            </div>
          ))}
        </div>
        <div className="relative h-[250px] w-full mt-2">
          <svg
            className="max-w-3xl h-full"
            viewBox="0 0 1000 250"
            fill="none"
            preserveAspectRatio="none"
          >
            <defs>
              <filter
                id="purpleGlow"
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
              >
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {steps.map((_, i) => {
              const startX = (1000 / 11) * (2 * i + 1);
              const endX = 500;
              const pathData = `M ${startX} 0 C ${startX} 150, ${endX} 150, ${endX} 240`;

              const pathLength = 350;

              return (
                <g key={i}>
                  <path
                    d={pathData}
                    stroke="#cbd5e1"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                  />

                  <motion.path
                    d={pathData}
                    stroke="#6B207A"
                    strokeWidth="1"
                    strokeLinecap="round"
                    fill="none"
                    filter="url(#purpleGlow)"
                    strokeDasharray={pathLength}
                    initial={{ strokeDashoffset: pathLength }}
                    animate={{ strokeDashoffset: -pathLength }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "easeInOut",
                      repeatDelay: 1,
                      delay: 0,
                    }}
                  />
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {steps.map((step) => (
          <div
            key={step.no}
            className="group flex items-start gap-4 p-6 rounded-2xl bg-white border border-slate-200 hover:border-purple-400 hover:shadow-lg transition-all duration-300"
          >
            <span className="flex-shrink-0 gradient-purple w-12 h-12 flex items-center justify-center rounded-full text-white font-bold text-lg shadow-md group-hover:scale-105 transition-transform">
              {step.no}
            </span>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {step.sub}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkflowSection;
