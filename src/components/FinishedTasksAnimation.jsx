import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import PreviousEntries from "./PreviousEntries";
import ConfettiExplosion from "react-confetti-explosion";

const FinishedTasksAnimation = ({ didTasks }) => {
  const [display, setDisplay] = useState(false);
  const [seePastEntries, setSeePastEntries] = useState(false);
  const [isExploding, setIsExploding] = useState(true)

  const pastEntriesHandler = () => {
    setSeePastEntries(!seePastEntries);
  };

  useEffect(() => {
    if (didTasks === false) {
      setDisplay(false);
    } else {
      setTimeout(() => {
        setDisplay(true);
      }, 850);
    }

  }, [didTasks]);

  useEffect(() => {

    if(display){
      setIsExploding(true)
      setTimeout(() => {
        setIsExploding(false)
      }, 3000)
    } else {
      setIsExploding(false)
    }

  }, [display])

  return (
    <AnimatePresence mode=" popLayout ">
      {display ? (
        <motion.div
          key="allDone"
          initial={{ opacity: 0, y: -500 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, type: "spring", bounce: 0.1 }}
          exit={{ opacity: 0, y: -500 }}
        >
          <div className="w-full flex justify-center mt-10 overflow-x-hidden overflow-y-hidden z-0">
            <div className="flex flex-col items-center">
              <p className="text-primary text-5xl font-semibold">
                All done for today
              </p>
              {isExploding && <ConfettiExplosion force={.5} particleCount={150} width={2000}/>}
              <br />
              <p className="text-3xl font-medium">Be proud of yourself!</p>
              <br />
              <br />
              <button className="btn btn-accent" onClick={pastEntriesHandler}>
                {seePastEntries ? "Hide past entries" : "See past entries"}
              </button>
            </div>
          </div>
        </motion.div>
      ) : null}
      <PreviousEntries seePastEntries={seePastEntries} />
    </AnimatePresence>
  );
};

export default FinishedTasksAnimation;
