import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useContext } from "react"
import AuthContext from "../context/userContext"
import axios from "axios";

const DailyTasks = ({ didEmotion, didTasks, setDidTasks }) => {
  const [display, setDisplay] = useState(false);
  

  const Q1 = [
    "What has been stressing you out lately?",
    "If you could do anything right now, what would you do?",
    "What do you need right now that you do not have?",
    "What is your favorite way to relax or de-stress?",
    "Do you feel like you have a positive or negative view of life right now?",
  ];

  const Q2 = [
    "What is something exciting that you are looking forward to?",
    "What activities do you spend the most time on throughout the day?",
    "What do you wish you would spent less time doing?",
    "What strategies do you use to calm yourself down?",
    "Who is someone you admire and why?",
  ];

  const Q3 = [
    "What can you do today to brighten your mood?",
    "What is something that you like about yourself?",
    "Who are some people that you can rely on?",
    "What is something you can do today that will be a small win for you?",
    "Think about something that is important to you, what did you think about?",
  ];

  const [question1, setQuestion1] = useState("");
  const [question2, setQuestion2] = useState("");
  const [question3, setQuestion3] = useState("");
  
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [answer3, setAnswer3] = useState("");
  
  useEffect(() => {
    setAnswer1('')
    setAnswer2('')
    setAnswer3('')

    const randomNum1 = Math.floor(Math.random() * 5);
    const randomNum2 = Math.floor(Math.random() * 5);
    const randomNum3 = Math.floor(Math.random() * 5);

    setQuestion1(Q1[randomNum1]);
    setQuestion2(Q2[randomNum2]);
    setQuestion3(Q3[randomNum3]);
  }, []);

  useEffect(() => {
    if (didEmotion === false) {
      setDisplay(false);
    } else {
      setTimeout(() => {
        setDisplay(true);
      }, 800);
    }
  }, [didEmotion]);

  const authCtx = useContext(AuthContext)

  const { dailyEmotion, userId, updatePoints } = authCtx

  const submitHandler = () => {

    let today = new Date();
    let date = today.getDate();
    let month = today.getMonth() + 1; 
    let year = today.getFullYear();

    const todayDate = `${month}/${date}/${year}`
    
    const data = {
      emo: dailyEmotion,
      q1: question1,
      q2: question2,
      q3: question3,
      a1: answer1,
      a2: answer2,
      a3: answer3,
      date: todayDate
    }

    axios.post(`http://localhost:6655/entry/${userId}`, data)
    .then(res => {

      console.log(res.data)
      setDidTasks(true)
      updatePoints()

      axios.put(`http://localhost:6655/points/${userId}`)
      .then(res => {
        console.log(res.data)
      }).catch(err => console.log(err))

      axios.put(`http://localhost:6655/task/${userId}`)
      .then(res => {
        console.log(res.data)
      }).catch(err => console.log(err))

    }).catch(err => console.log(err))

  }

  return (
    <AnimatePresence mode=" popLayout ">
      {display && !didTasks ? (
        <motion.div
          key="tasks"
          initial={{ opacity: 0, x: -750 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .75, type: "spring", bounce: 0.1 }}
          exit={{ opacity: 0, x: 750 }}
        >
          <div className="w-full flex flex-row overflow-y-hidden mt-10">
            <section className="w-1/3 flex flex-col items-center">
              <br />
              <br />
              <br />
              <br />
              <br />
              <p className="text-primary text-2xl">
                What are these questions for?
              </p>
              <br />
              <p className=" w-4/5 leading-8 text-center">
                Just like naming your emotions, answering these simple questions
                will promote self-regulation and awareness. Your answers are
                important because you can use them to track how you were feeling
                and how you might have improved. When you are self-aware, you
                are better able to recognize when you are feeling stressed or
                overwhelmed, and you can take steps to manage your emotions and
                reactions more effectively. You can also become more aware of
                your own strengths and weaknesses, which can help you identify
                areas for personal growth and development. This can be a
                powerful motivator and can help you stay on track with your
                mental health goals.
              </p>
            </section>

            <section className="w-1/3 flex justify-center">
              <div className="m-2 w-4/5 border-4 border-base-content p-3 flex flex-col items-center rounded-xl bg-base-200">
                <div className="flex flex-col items-center justify-center text-center">
                  <p>{question1}</p>
                  <br />
                  <textarea
                    className="textarea textarea-bordered text-primary"
                    placeholder="Type answer here"
                    onChange={e => setAnswer1(e.target.value)}
                  ></textarea>
                </div>

                <br />
                <br />
                <br />

                <div className="flex flex-col items-center justify-center text-center">
                  <p>{question2}</p>
                  <br />
                  <textarea
                    className="textarea textarea-bordered text-primary"
                    placeholder="Type answer here"
                    onChange={e => setAnswer2(e.target.value)}
                  ></textarea>
                </div>

                <br />
                <br />
                <br />

                <div className="flex flex-col items-center justify-center text-center">
                  <p>{question3}</p>
                  <br />
                  <textarea
                    className="textarea textarea-bordered text-primary"
                    placeholder="Type answer here"
                    onChange={e => setAnswer3(e.target.value)}
                  ></textarea>
                </div>
                <br />
                <br />
                <button className="btn btn-primary m-2" onClick={submitHandler}>Submit</button>
              </div>
            </section>

            <section className="w-1/3"></section>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default DailyTasks;
