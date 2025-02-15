"use client";
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { downArrow } from "../../assets/logos/logs";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
  link,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
  link: string;
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative flex">
      <div className="flex items-center ">
        <Link to={link === "" ? "/" : link}>
          <motion.p
            transition={{ duration: 0.3 }}
            className="cursor-pointer hover:text-customBlue  font-semibold  hover:opacity-[0.9] dark:text-white"
          >
            {item}
          </motion.p>
        </Link>
        {item !== "Home" && item !== "Contact Us" ? (
          <motion.img src={downArrow} className="scale-50" />
        ) : null}
      </div>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2">
              <motion.div
                transition={transition}
                layoutId="active" // layoutId ensures smooth animation
                className="bg-white dark:bg-black backdrop-blur-sm rounded-lg overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl"
              >
                <motion.div
                  layout // layout ensures smooth animation
                  className="w-max h-full p-4"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)} // resets the state
      className="relative active:text-customBlue  rounded-full border border-transparent dark:bg-black dark:border-white/[0.2]  shadow-input flex justify-center gap-5 px-8 py-5 "
    >
      {children}
    </nav>
  );
};

export const HoveredLink = ({ children, ...rest }: any) => {
  return (
    <Link
      {...rest}
      className="text-neutral-600 dark:text-neutral-200 hover:text-customBlue duration-200 transition-all"
    >
      {children}
    </Link>
  );
};
