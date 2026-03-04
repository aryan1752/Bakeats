"use client";
import React, { useMemo, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "motion/react";

type Product = {
  title: string;
  link: string;
  thumbnail: string;
};

const rotateLeft = <T,>(arr: T[]) => (arr.length ? [...arr.slice(1), arr[0]] : arr);
const rotateRight = <T,>(arr: T[]) => (arr.length ? [arr[arr.length - 1], ...arr.slice(0, -1)] : arr);

export const HeroParallax = ({ products }: { products: Product[] }) => {
  const firstRowInit = useMemo(() => products.slice(0, 5), [products]);
  const secondRowInit = useMemo(() => products.slice(5, 10), [products]);
  const thirdRowInit = useMemo(() => products.slice(10, 15), [products]);

  const [firstRow, setFirstRow] = useState<Product[]>(firstRowInit);
  const [secondRow, setSecondRow] = useState<Product[]>(secondRowInit);
  const [thirdRow, setThirdRow] = useState<Product[]>(thirdRowInit);

  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1000]), springConfig);
  const translateXReverse = useSpring(useTransform(scrollYProgress, [0, 1], [0, -1000]), springConfig);
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.2], [15, 0]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.2, 1]), springConfig);
  const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.2], [20, 0]), springConfig);
  const translateY = useSpring(useTransform(scrollYProgress, [0, 0.2], [-700, 500]), springConfig);

  return (
    <div
      ref={ref}
      className="h-[130vh] py-6 md:h-[300vh] md:py-40 overflow-hidden bg-black antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div style={{ rotateX, rotateZ, translateY, opacity }}>
        <div className="relative mb-20">
          <RowControls
            onLeft={() => setFirstRow((r) => rotateLeft(r))}
            onRight={() => setFirstRow((r) => rotateRight(r))}
          />
          <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
            {firstRow.map((product) => (
              <ProductCard product={product} translate={translateX} key={product.title} />
            ))}
          </motion.div>
        </div>

        <div className="relative mb-20">
          <RowControls
            onLeft={() => setSecondRow((r) => rotateLeft(r))}
            onRight={() => setSecondRow((r) => rotateRight(r))}
          />
          <motion.div className="flex flex-row space-x-20">
            {secondRow.map((product) => (
              <ProductCard product={product} translate={translateXReverse} key={product.title} />
            ))}
          </motion.div>
        </div>

        <div className="relative">
          <RowControls
            onLeft={() => setThirdRow((r) => rotateLeft(r))}
            onRight={() => setThirdRow((r) => rotateRight(r))}
          />
          <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
            {thirdRow.map((product) => (
              <ProductCard product={product} translate={translateX} key={product.title} />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

function RowControls({ onLeft, onRight }: { onLeft: () => void; onRight: () => void }) {
  return (
    <div className="pointer-events-none absolute inset-y-0 left-2 right-2 z-20 flex items-center justify-between md:left-4 md:right-4">
      <button
        onClick={onLeft}
        className="pointer-events-auto h-10 w-10 rounded-full border border-white/40 bg-black/45 text-white shadow-lg backdrop-blur hover:bg-black/65"
        aria-label="Scroll left"
      >
        ←
      </button>
      <button
        onClick={onRight}
        className="pointer-events-auto h-10 w-10 rounded-full border border-white/40 bg-black/45 text-white shadow-lg backdrop-blur hover:bg-black/65"
        aria-label="Scroll right"
      >
        →
      </button>
    </div>
  );
}

export const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0">
      <h1 className="text-2xl md:text-7xl font-bold text-white">
        Bakeats in the <br /> Spotlight
      </h1>
      <p className="max-w-2xl text-base md:text-xl mt-8 text-white">
        Discover how Bakeats is making headlines and creating delightful moments across platforms.
      </p>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: Product;
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{ x: translate }}
      whileHover={{ y: -20 }}
      className="group/product h-96 w-[30rem] relative shrink-0"
    >
      <a href={product.link} className="block group-hover/product:shadow-2xl ">
        <img
          src={product.thumbnail}
          height="600"
          width="600"
          className="object-cover object-left-top absolute h-full w-full inset-0"
          alt={product.title}
        />
      </a>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
        {product.title}
      </h2>
    </motion.div>
  );
};
