import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

function AnimatedWavesCircle({
  fillPercentage = 0,
  size = 200,
}: {
  fillPercentage?: number;
  size?: number;
}) {
  const wave1 = useAnimation();
  const wave2 = useAnimation();
  const wave3 = useAnimation();

  const waveMiddleY = 100 - fillPercentage;
  const waveTopY = waveMiddleY - 6;
  const waveBottomY = waveMiddleY + 6;

  const waveUp = `M0,${waveMiddleY} Q25,${waveTopY} 50,${waveMiddleY} T100,${waveBottomY} V100 H0 Z`;
  const waveDown = `M0,${waveMiddleY} Q25,${waveBottomY} 50,${waveMiddleY} T100,${waveTopY} V100 H0 Z`;

  useEffect(() => {
    void wave1.start({
      d: [waveUp, waveDown],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    });
    void wave2.start({
      d: [waveUp, waveDown],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    });
    void wave3.start({
      d: [waveUp, waveDown],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    });
  }, [wave1, wave2, wave3, fillPercentage, waveDown, waveUp]);
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <defs>
        <mask id="wave-mask">
          <rect x="0" y="0" width="100" height="100" fill="black" />
          <motion.path
            initial={{ d: waveUp }}
            animate={wave1}
            fill="white"
            opacity={0.1}
          />
          <motion.path
            initial={{ d: waveUp }}
            animate={wave2}
            fill="white"
            opacity={0.3}
          />
          <motion.path
            initial={{ d: waveUp }}
            animate={wave3}
            fill="white"
            opacity={0.85}
          />
        </mask>
        <clipPath id="circle-clip">
          <circle cx="50" cy="50" r="50" />
        </clipPath>
      </defs>
      <text
        x="50%"
        y="45%"
        textAnchor="middle"
        fill="black"
        className="text-xs uppercase"
      >
        Points
      </text>
      <text
        x="50%"
        y="65%"
        textAnchor="middle"
        fill="black"
        className="text-[20px]"
      >
        {fillPercentage}
      </text>
      <motion.g clipPath="url(#circle-clip)" style={{ originY: 0 }}>
        <motion.path
          initial={{ d: waveUp }}
          animate={wave1}
          fill="#FF6D2A"
          opacity={0.1}
        />
        <motion.path
          initial={{ d: waveUp }}
          animate={wave2}
          fill="#FF6D2A"
          opacity={0.3}
        />
        <motion.path
          initial={{ d: waveUp }}
          animate={wave3}
          fill="#FF6D2A"
          opacity={0.85}
        />
      </motion.g>
      <text
        x="50%"
        y="45%"
        textAnchor="middle"
        fill="white"
        mask="url(#wave-mask)"
        className="text-xs uppercase"
      >
        Points
      </text>
      <text
        x="50%"
        y="65%"
        textAnchor="middle"
        fill="white"
        mask="url(#wave-mask)"
        className="text-[20px]"
      >
        {fillPercentage}
      </text>
      <circle cx="50" cy="50" r="50" fill="none" strokeWidth="2" />
    </svg>
  );
}

export default AnimatedWavesCircle;
