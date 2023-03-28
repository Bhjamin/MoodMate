import { useContext } from "react"
import AuthContext from "../context/userContext"
import { useEffect } from "react"
import axios  from 'axios'


const Header = () => {

    const authCtx = useContext(AuthContext)

    const { points, username, userId, getPoints, updatePoints, logout } = authCtx


    
    useEffect(() => {

        axios.get(`http://localhost:6655/points/${userId}`)
        .then(res => {

            getPoints(res.data)

        }).catch(err => console.log(err))


    }, [points])

    const updatePointsHandler = () => {

        axios.put(`http://localhost:6655/points/${userId}`)
        .then(res => {

            updatePoints()

        }).catch(err => console.log(err))

    }


    return (
        <section className="flex justify-center w-full">
            <div className="navbar bg-base-200 rounded-2xl w-11/12 m-2 flex items-center justify-between">

                <div className="w-1/3 ml-2">
                    <p className="text-3xl text-primary font-semibold">Mood</p>
                    <p className="text-3xl text-base-content font-semibold">Mate</p>
                </div>

                <div className="flex flex-col justify-center items-center w-1/3">
                    <p className="text-lg inline-flex">Welcome back, <p className="text-primary ml-1">{username}</p> </p> 
                    <p>You have {points} self-care points</p>
                </div>

                <div className=" m-2 w-1/3 flex justify-end ">
                    <button className="btn btn-secondary mr-7">Past Entries</button>
                    <button className="btn btn-primary" onClick={logout} >Logout</button>
                </div>
                

            </div>
        </section>
    )
}

export default Header