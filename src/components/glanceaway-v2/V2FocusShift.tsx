"use client";

import GlanceAwayHorizon from "@/components/GlanceAwayHorizon";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

/**
 * The page's one scroll moment: focus moves from the phone in your hand to the horizon.
 * The near screen blurs and recedes while the far landscape comes into focus.
 * Reduced motion: same markup (no hydration mismatch), CSS shows the resting end state.
 */
export default function V2FocusShift() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const nearBlur = useTransform(scrollYProgress, [0.1, 0.55], [0, 14]);
  const farBlur = useTransform(scrollYProgress, [0.1, 0.55], [10, 0]);
  const nearScale = useTransform(scrollYProgress, [0.1, 0.6], [1.08, 0.82]);
  const nearOpacity = useTransform(scrollYProgress, [0.35, 0.65], [1, 0.12]);
  const firstLine = useTransform(scrollYProgress, [0.25, 0.4], [1, 0]);
  const secondLine = useTransform(scrollYProgress, [0.42, 0.56], [0, 1]);
  const nearFilter = useMotionTemplate`blur(${nearBlur}px)`;
  const farFilter = useMotionTemplate`blur(${farBlur}px)`;

  return (
    <section
      ref={sectionRef}
      className="ga2-dark relative h-[220svh] bg-[#06131c] text-white motion-reduce:h-auto"
    >
      <div className="sticky top-0 isolate h-[100svh] overflow-hidden motion-reduce:relative">
        <motion.div
          className="absolute inset-0 -z-20 will-change-[filter] motion-reduce:![filter:none]"
          style={{ filter: farFilter }}
        >
          <GlanceAwayHorizon />
        </motion.div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#06131c] via-[#06131c]/30 to-transparent"
        />

        <div className="mx-auto grid h-full max-w-7xl items-center gap-6 px-6 sm:gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:px-8">
          <div className="pt-16 sm:pt-24 lg:pt-0">
            <FocusCopy />
            <div className="relative mt-6 h-32 max-w-xl text-lg leading-8 text-white/85 sm:h-20">
              <motion.p
                className="absolute inset-0 motion-reduce:!opacity-0"
                style={{ opacity: firstLine }}
              >
                {LINES[0]}
              </motion.p>
              <motion.p
                className="absolute inset-0 motion-reduce:!opacity-100"
                style={{ opacity: secondLine }}
              >
                {LINES[1]}
              </motion.p>
            </div>
          </div>

          <motion.div
            aria-hidden="true"
            className="mx-auto w-[38%] max-w-[17rem] sm:w-[46%] will-change-transform motion-reduce:hidden lg:w-[58%]"
            style={{
              filter: nearFilter,
              scale: nearScale,
              opacity: nearOpacity,
            }}
          >
            <div className="rounded-[2rem] bg-[#0b1114] p-[0.4rem] shadow-[0_40px_90px_rgba(0,0,0,0.5)]">
              <Image
                src="/apps/glanceaway/screens/ios-home.webp"
                alt=""
                width={720}
                height={1564}
                loading="lazy"
                sizes="17rem"
                className="block h-auto w-full rounded-[1.65rem]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const LINES = [
  "At a screen, your eyes hold focus at arm’s length for hours.",
  "Twenty seconds on something far away lets them relax. GlanceAway turns that into a habit.",
] as const;

function FocusCopy() {
  return (
    <h2 className="max-w-[14ch] text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
      Close all day, far for twenty seconds.
    </h2>
  );
}
