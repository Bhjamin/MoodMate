import { motion } from "framer-motion";

const Animation = () => {
  return (
    <div className="flex flex-col items-center h-52 overflow-x-hidden w-full">
      <motion.div
        initial={{ y: 0, opacity: 1 }}
        animate={{ opacity: 0, y: -35 }}
        transition={{ duration: 2, delay: 3.5 }}
      >
        <h2 className=" text-4xl text-base-content m-2 ">Welcome to</h2>
      </motion.div>

      <motion.div className="flex flex-col items-center justify-center" initial={{y: 0}} animate={{y: -50}} transition={{ duration: 2, delay: 3.5 }} >
        <motion.div
          className=""
          initial={{ opacity: 0, scale: 0.25, x: -1000 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
        >
          <h1 className=" text-5xl text-primary font-semibold">Mood</h1>
        </motion.div>

        <motion.div
          className=""
          initial={{ opacity: 0, scale: 0.25, x: 1000 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
        >
          <h1 className=" text-5xl text-base-content font-semibold ">Mate</h1>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Animation;
