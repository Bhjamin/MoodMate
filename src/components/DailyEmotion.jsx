import React from "react";
import { useState, useEffect } from "react";
import SuggestionAnimation from "./SuggestionAnimation";
import { motion, AnimatePresence } from "framer-motion";

const DailyEmotion = ({ submitEmoHandler, didEmotion }) => {
  const [suggestions, setSuggestions] = useState("");

  const [enteredEmotion, setEnteredEmotion] = useState("");

  const submitEmotionHandler = () => {
    if (enteredEmotion.length < 3) {
      setEnteredEmotion("");

      alert("Please enter a valid emotion");

      return;
    } else {
      submitEmoHandler(enteredEmotion);
    }
  };

  return (
    <AnimatePresence mode=" popLayout ">
      {!didEmotion ? (
        <motion.div
          key="johnson"
          initial={{ opacity: 0, x: -750 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .75, type: "spring", bounce: 0.1 }}
          exit={{ opacity: 0, x: 750 }}
        >
          <div className="w-full flex mt-10 overflow-x-hidden overflow-y-hidden">
            <section className="w-1/3 flex flex-col items-center">
              <br />
              <br />
              <br />
              <br />
              <br />
              <p className="text-primary text-2xl">
                Why does Mood Mate have you do this?
              </p>
              <br />
              <p className=" w-4/5 leading-8 text-center">
                Identifying emotions on a daily basis can be important for
                several reasons. It can help improve self-awareness and
                self-regulation, which can in turn lead to better mental health
                and well-being. Recognizing and managing emotions can also
                improve communication and relationships with others.
                Additionally, tracking emotions over time can provide insights
                into patterns and triggers, which can help individuals make
                positive changes in their lives.
              </p>
            </section>

            <section className="w-1/3 flex flex-col items-center ">
              <div className="m-2 w-4/5 border-4 border-base-content p-3 flex flex-col items-center rounded-xl bg-base-200">
                <p className="text-primary text-lg">
                  Please identify how you are feeling today
                </p>
                <br />
                <br />
                <div className="flex flex-col items-center">
                  <input
                    type="text"
                    value={enteredEmotion}
                    placeholder="Enter emotion here..."
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setEnteredEmotion(e.target.value)}
                  />
                  <br />
                  <button
                    className="btn btn-outline"
                    onClick={submitEmotionHandler}
                  >
                    Submit
                  </button>
                </div>

                <br />
                <br />
                <br />
                <br />

                <p className="text-md">Need some suggestions?</p>
                <br />
                <select
                  className="select select-bordered w-full max-w-xs"
                  onChange={(e) => setSuggestions(e.target.value)}
                >
                  <option disabled selected>
                    Choose a base emotion
                  </option>
                  <option value="H">Happy</option>
                  <option value="S">Sad</option>
                  <option value="F">Fear</option>
                  <option value="A">Anger</option>
                </select>

                <SuggestionAnimation suggestions={suggestions} />
              </div>
            </section>

            <section className="w-1/3"></section>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default DailyEmotion;
