import React from "react";
import { delay, easeIn, motion } from "framer-motion";

const Page_Not_Found = () => {
  return (
    <div className=" w-full h-screen">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1, transition: { delay: 0.5 } }}
        className=" m-10 shadow-xl bg-white h-full flex flex-col justify-center overflow-hidden items-center"
      >
        <div className=" flex cursor-pointer">
          <motion.div
           initial={{y:-1000}}
           animate={{y:0, transition:{delay:0.9}}}
           whileHover={{y:[0, 5, 0], transition:{repeat:Infinity, duration:1}}}
           className=" text-9xl font-bold text-customBlue">
            4
          </motion.div>
          <motion.div
           initial={{x:-1000, rotate:-900}}
           animate={{x:0,rotate:0 , transition:{delay:1.1, duration:0.6}}}
           whileHover={{y:[0, 5, 0], transition:{repeat:Infinity, duration:1}}}
          className=" text-9xl font-bold text-customBlue">
            0
          </motion.div>
          <motion.div
           initial={{y:-1000}}
           animate={{y:0, transition:{delay:1.3}}}
           whileHover={{y:[0, 5, 0], transition:{repeat:Infinity, duration:1}}}
          className=" text-9xl font-bold text-customBlue">
            4
          </motion.div>
        </div>
        <motion.div initial={{y:-1000}} animate={{y:0 , transition:{delay:1.5}}} className=" text-black font-bold">Page Not Found</motion.div>
      </motion.div>
    </div>
  );
};

export default Page_Not_Found;
