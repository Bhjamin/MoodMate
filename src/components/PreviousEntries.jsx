import { useEffect, useState } from "react";
import { useContext } from "react";
import AuthContext from "../context/userContext";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const PreviousEntries = ({seePastEntries}) => {
  const [data, setData] = useState([]);

  const authCtx = useContext(AuthContext);

  const { userId } = authCtx;

  useEffect(() => {
    axios
      .get(`http://localhost:6655/entry/${userId}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, [userId, seePastEntries]);

  return (
    <AnimatePresence mode=" popLayout ">
      {seePastEntries && (
        <div className="w-full flex flex-col items-center">
          {data.map((entry, i) => (
            <motion.div
              className=" w-1/2 border-2 border-base-content p-3 flex flex-col items-center rounded-xl bg-base-200 m-4"
              key={entry.id}
              initial={{ opacity: 0, x: -700 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1,
                type: "spring",
                bounce: 0.35,
                delay: i * 0.25
              }}
              exit={{ opacity: 0, x: 700 }}
            >
              <div className="flex flex-col justify-start w-full">
                <p>
                  Entry from:{" "}
                  <p className="text-primary inline">{entry.date}</p>
                </p>
                <p>Emotion: {entry.emotion}</p>
              </div>
              <br />

              <p className="text-center m-2">
                Question 1:
                <p className="text-primary m-2 inline">{entry.question1}</p>
              </p>
              <p className="text-center">
                You said:
                <p className="text-primary m-2 inline">{entry.answer1}</p>
              </p>

              <br />
              <br />

              <p className="text-center m-2">
                Question 2:
                <p className="text-primary m-2 inline">{entry.question2}</p>
              </p>
              <p className="text-center">
                You said:
                <p className="text-primary m-2 inline">{entry.answer2}</p>
              </p>

              <br />
              <br />

              <p className="text-center m-2">
                Question 3:
                <p className="text-primary m-2 inline">{entry.question3}</p>
              </p>
              <p className="text-center">
                You said:
                <p className="text-primary m-2 inline">{entry.answer3}</p>
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
};

export default PreviousEntries;
            