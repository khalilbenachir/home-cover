import { useAnimation, Variants, motion } from "framer-motion";
import { useCallback, useEffect } from "react";

import "./styles.css";

const containerVariants: Variants = {
  initial: {
    clipPath: `inset(0% 0 0% 0)`,
  },
  hide: {
    clipPath: `inset(0% 0 100% 0)`,
    transition: { duration: 1, ease: [0.77, 0, 0.175, 1], delay: 0.2 },
  },
  none: {
    display: "none",
  },
};

const charVariants: Variants = {
  initial: (index: number) => ({
    y: index % 2 === 0 ? "80%" : "-80%",
    opacity: 0,
  }),
  step1: (delay: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: delay * 0.1,
      duration: 1,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  }),
  step2: (delay: number) => ({
    y: 200,
    opacity: 0,
    transition: {
      delay: delay * 0.1,
      duration: 1,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  }),
};

export const HomeCover = ({ title }: { title: string }) => {
  const letters = title.split("");
  const containerAnimation = useAnimation();
  const titleAnimation = useAnimation();
  const animationStream = useCallback(async () => {
    await titleAnimation.start("step1");
    await titleAnimation.start("step2");
    await containerAnimation.start("hide");
    await containerAnimation.start("none");
  }, [titleAnimation, containerAnimation]);

  useEffect(() => {
    animationStream();
  }, [animationStream]);

  return (
    <motion.div
      className="cover-container"
      variants={containerVariants}
      animate={containerAnimation}
      initial="initial"
    >
      <div className="cover-letters">
        {letters.map((letter: string, index: number) => (
          <motion.div
            className="cover-letter"
            animate={titleAnimation}
            variants={charVariants}
            initial="initial"
            key={index}
            custom={index}
          >
            {letter}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
