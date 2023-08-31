import { AnimatePresence, motion } from "framer-motion";
import isEmpty from "lodash/isEmpty";
import Image from "next/image";
import LeftIcon from "public/icons/arrow-left.svg";
import RightIcon from "public/icons/arrow-right.svg";
import { useEffect, useState } from "react";

type Props = {
  images: string[];
};

const protips = [
  "Czasami więcej osób może pomóc albo wnieść coś do rozmowy - warto korzystać z kanałów zamiast pisać na priv.",
  "Dbanie o wysoką utylizację na kliencie zwiększa część zmienną (seniority i kudos).",
  "Co roku dostajesz punkt seniority. Maksymalnie można uzbierać 5 punktów.",
  "Regularne worklogowanie ułatwia nam wystawianie faktur dla klientów.",
  "Możesz uniknąć delayed hours worklogując dany dzień nie później niż 36h po jego zakończeniu.",
  "Unikniesz bycia chomikiem rozdając wszystkie kudosy każdego tygodnia.",
  "Po roku przysługuje Ci oshee relaxing. Warto odpoczywać.",
  "Możesz korzystać z budżetu na certyfikację i konferencję. Więcej informacji u twojego Tech Leada i CTO.",
  "Po spełnieniu wymagań odnośnie przepracowanych godzin, od Ciebie zależy kiedy wskoczysz na wyższą stawkę pnąc się przez DevPath.",
  "Możesz odwiedzać każdą naszą lokację - wystarczy uzgodnić to z dziewczynami z office.",
];

function Carousel({ images }: Props) {
  const dotWidth = 24;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideTime, setSlideTime] = useState(0);
  const [protip, setProtip] = useState<null | string | undefined>(null);

  const slideDuration = 7;

  useEffect(() => {
    setSlideTime(0);

    const step = 100 / (slideDuration * 10);
    const interval = setInterval(() => {
      setSlideTime((prev) => Math.min(prev + step, 100));
    }, 100);

    const timer = setTimeout(() => {
      handleNext();
    }, slideDuration * 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  useEffect(() => {
    if (protip === null) {
      setProtip(protips[Math.floor(Math.random() * protips.length)]);
    }

    setProtip(protips[Math.floor(Math.random() * protips.length)]);
  }, [currentIndex, protip]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  if (isEmpty(images)) {
    return null;
  }

  return (
    <div className="relative flex h-full w-full overflow-hidden rounded-2xl p-20">
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black to-transparent" />

      <div className="relative z-10 flex w-full flex-col gap-8 self-end">
        <div className="z-20">
          <p className="mb-2 text-sm font-semibold uppercase leading-tight tracking-kicker text-brand-primary">
            Protip:
          </p>
          <h4 className="text-lg leading-8 text-white">{protip}</h4>
        </div>

        <div className="relative z-10 h-0.5 w-full bg-white">
          <motion.div
            className="absolute inset-y-0 left-0 bg-brand-primary-500"
            initial={{ width: "0%" }}
            animate={{ width: `${slideTime}%` }}
            transition={{
              duration: 0.1,
              ease: "linear",
            }}
          />
        </div>

        <div className="flex w-full justify-between">
          <div className="flex gap-4">
            <motion.button
              className="relative flex h-12 w-12 items-center justify-center rounded-full border border-white text-white"
              onClick={handlePrevious}
              initial={{ scale: 1 }}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
            >
              <LeftIcon />
            </motion.button>
            <motion.button
              className="relative flex h-12 w-12 items-center justify-center rounded-full border border-white text-white"
              onClick={handleNext}
              initial={{ scale: 1 }}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
            >
              <RightIcon />
            </motion.button>
          </div>

          <div className="relative z-10 flex items-center gap-4">
            <div className="relative">
              <AnimatePresence>
                <motion.div
                  initial={{ x: 0 }}
                  animate={{ x: currentIndex * (dotWidth + 16) }}
                  transition={{ type: "spring", stiffness: 500, damping: 50 }}
                  className="absolute h-6 w-6 rounded-full border-2 border-brand-primary-500 bg-brand-primary-500"
                ></motion.div>
              </AnimatePresence>

              {images.map((_, index) => (
                <div
                  key={index}
                  className="mr-4 inline-block h-6 w-6 cursor-pointer rounded-full border-2 border-neutral-200 bg-transparent last:mr-0 hover:border-brand-primary-500"
                  onClick={() => handleDotClick(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        <motion.div
          key={currentIndex}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 20,
            duration: 0.5,
          }}
          className="absolute inset-0 z-0 overflow-hidden"
        >
          <Image
            src={images[currentIndex] as string}
            alt="Carousel photo"
            style={{ objectFit: "cover" }}
            priority
            fill
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default Carousel;
