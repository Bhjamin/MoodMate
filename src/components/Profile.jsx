import React from 'react'
import Header from './Header'
import { useContext } from "react"
import AuthContext from "../context/userContext"
import { useEffect, useState } from "react"
import axios  from 'axios'
import DailyEmotion from './DailyEmotion'
import DailyTasks from './DailyTasks'
import FinishedTasksAnimation from './FinishedTasksAnimation'

const Profile = () => {

  const [didEmotion, setDidEmotion] = useState(false)
  const [didTasks, setDidTasks] = useState(false)

  const authCtx = useContext(AuthContext)

  const { userId, updateDailyEmotion } = authCtx

  const submitEmoHandler = (emo) => {

   updateDailyEmotion(emo)

   setDidEmotion(true)
   
   axios.put(`http://localhost:6655/emotion/${userId}`)
   .then(res => {

    console.log(res.data)

   }).catch(err => console.log(err))

  }
  

  useEffect(() => {

    axios.get(`http://localhost:6655/emotion/${userId}`)
        .then(res => {

            console.log(res.data)

             const today = new Date();
             const date = today.getDate();
             const month = today.getMonth() + 1; 
             const year = today.getFullYear();

             const checkDate = `${month}/${date}/${year}`


            if(res.data !== checkDate){

              setDidEmotion(false)

            }

            if(res.data === checkDate){

              setDidEmotion(true)

            }

        }).catch(err => console.log(err))

      axios.get(`http://localhost:6655/task/${userId}`)
      .then(res => {

            console.log(res.data)

             const today = new Date();
             const date = today.getDate();
             const month = today.getMonth() + 1; 
             const year = today.getFullYear();

             const checkDate = `${month}/${date}/${year}`


            if(res.data !== checkDate){

              setDidTasks(false)

            }

            if(res.data === checkDate){

              setDidTasks(true)

            }

        }).catch(err => console.log(err))

  }, [userId])



  return (
    <div className=' overflow-x-hidden overflow-y-hidden'>
      <Header/>


      <DailyEmotion submitEmoHandler={submitEmoHandler} didEmotion={didEmotion} />

      <DailyTasks didEmotion={didEmotion} didTasks={didTasks} setDidTasks={setDidTasks}/>

      <FinishedTasksAnimation didTasks={didTasks} />


      </div>
      
  )
}

export default Profile