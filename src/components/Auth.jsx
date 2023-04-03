import Animation from "./Animation";
import ErrorAnimation from "./ErrorAnimation";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/userContext";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);
  const [showPass, setShowPass] = useState("password");
  const [quote, setQuote] = useState('')
  const [author, setAuthor] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const {login, updateUsername} = useContext(AuthContext)

  const authCtx = useContext(AuthContext)

  const showPassHandler = () => {
    showPass === "password" ? setShowPass("text") : setShowPass("password");
  };

  useEffect(() => {

    let randomNum = Math.floor(Math.random() * 1500)

    axios.get("https://type.fit/api/quotes")
    .then(res => {

        let QOTD = res.data[randomNum]

        setQuote(QOTD.text)
        setAuthor(QOTD.author)
        
    }).catch(err => console.log(err))

  }, [])

 const registerToggleHandler = (e) => {
    e.preventDefault()

    setRegister(!register)

 }


 const handleSubmit = (e) => {
  e.preventDefault()

  axios.post(register ? 'http://localhost:6655/register' : 'http://localhost:6655/login' , {username, password})
  .then(res => {
    console.log(res.data)

    setUsername('')
    setPassword('')

    
    updateUsername(res.data.username)

    login(res.data.token, res.data.exp, res.data.userId, res.data.username, res.data.points)

    navigate('/profile')


  })
  .catch((err) => {

    setError(err.response.data)

    setTimeout(() => {
      setError('')
    }, 5000)

  })
 }



  return (
    <div className=" overflow-x-hidden overflow-y-auto bg-base-100 w-full h-full flex flex-col items-center ">
      <Animation />

      <div className="w-full flex flex-row">

        <section className="w-2/5 flex items-center justify-center mb-10">
          <div
            className="tooltip tooltip-bottom before:max-w-xl before:leading-9 before:text-lg before:p-4 before:rounded-2xl "
            data-tip="Mood Mate is an easy-to-use mental health assistance website designed to help users prioritize their mental well-being. While it may not solve all mental health problems, Mood Mate is a helpful tool that encourages users to take time each day to reflect on their thoughts and emotions.

            With Mood Mate, users can easily identify their emotions and write down their thoughts in a safe, private online journal. This feature helps users to become more self-aware, and allows them to reflect on their emotional state throughout the day."
          >
            <button className="btn btn-ghost btn-lg ">About</button>
          </div>
        </section>

        <section className=" w-1/5 items-center justify-center">
          <div className="h-10">
          <ErrorAnimation error={error} />
          </div>
          <form className="flex flex-col">
            <div className="form-control m-4">
              <label className="label-text m-1">
                <span className="label-text text-lg ">Username</span>
              </label>
              <input
                type="text"
                placeholder="Type here..."
                className="input input-bordered "
                onChange={e => setUsername(e.target.value)}
                value={username}
              />
            </div>

            <div className="form-control m-4">
              <label className="label-text m-1">
                <span className="label-text text-lg ">Password</span>
              </label>
              <div className="flex flex-row items-center ">
                <input
                  type={showPass}
                  placeholder="Type here..."
                  className="input input-bordered "
                  onChange={e => setPassword(e.target.value)}
                  value={password}
                />
                <section className=" flex flex-row items-center ml-2 ">
                  <input
                    type="checkbox"
                    className="toggle toggle-sm"
                    onChange={showPassHandler}
                  />
                  <p className="text-xs ml-2">Show password</p>
                </section>
              </div>
            </div>
            <br/>
            <div className=" w-full flex flex-col justify-center items-center">
            <button onClick={(e) => {handleSubmit(e)}} className="btn btn-primary w-20 ">{register ? "register" : "login"}</button>
            <br/>
            <br/>
            <button className="btn btn-sm" onClick={(e) => {registerToggleHandler(e)}} >Click here to {register ? "login" : "register"}</button>
            </div>
          </form>
        </section>

        <section className="w-2/5 flex flex-col  items-center justify-center">
            <div className="flex flex-col items-center w-3/5 mb-10">
            <p>"{quote}"</p>
            <br/>
            {author ? <p>- {author}</p> : <p>- Unknown</p>}
            </div>
        </section>

      </div>
    </div>
  );
};

export default Auth;
