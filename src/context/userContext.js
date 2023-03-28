import { useState, createContext } from 'react'

let logoutTimer

const AuthContext = createContext({
  token: '',
  login: () => {},
  logout: () => {},
  userId: null,
  username: '',
  updateUsername: () => {},
  points: 0,
  getPoints: () => {},
  updatePoints: () => {}
  
})

const calculateRemainingTime = (exp) => {
  const currentTime = new Date().getTime()
  const expTime = exp 
  const remainingTime = expTime - currentTime
  return remainingTime
}

const getLocalData = () => {
  const storedToken = localStorage.getItem('token')
  const storedExp = localStorage.getItem('exp')
  const storedUsername = localStorage.getItem('username')
  const storedPoints = localStorage.getItem('points')

  const remainingTime = calculateRemainingTime(storedExp)

  if (remainingTime <= 1000 * 60 * 30) {
    localStorage.removeItem('token')
    localStorage.removeItem('exp')
    return null
  }


  return {
    token: storedToken,
    duration: remainingTime,
    username: storedUsername,
    points: storedPoints
  }
}



export const AuthContextProvider = (props) => {
  const localData = getLocalData()
  
  let initialToken
  let initialId
  let initialUsername
  let initialPoints
  if (localData) {
    initialToken = localData.token
    initialId = localData.userId
    initialUsername = localData.username
    initialPoints = localData.points
  }



  const [token, setToken] = useState(initialToken)
  const [userId, setUserId] = useState(initialId)
  const [username, setUser] = useState(initialUsername)



  const [points, setPoints] = useState(initialPoints ? initialPoints : 0)


  const logout = () => {
    
    setToken(null)
    setUserId(null)

    localStorage.removeItem('token')
    let bruh = JSON.parse(localStorage.getItem('expTime'))
    localStorage.removeItem('expTime')

    let remainingTime = calculateRemainingTime(bruh)

    console.log(remainingTime)

    if(remainingTime > 0){
      clearTimeout(logoutTimer)
    }  
  }

  const login = (token, time, id) => {

    setToken(token)
    setUserId(id)

    localStorage.setItem('token', token)
    localStorage.setItem('expTime', time)

    let remainingTime = calculateRemainingTime(time)

    logoutTimer = setTimeout(logout, remainingTime)

    console.log(remainingTime)

  }

 

  const updateUsername = (name) => {
    setUser(name)
  }

  const getPoints = (num) => {
    
    setPoints(num)

  }

  const updatePoints = () => {

    setPoints(points + 1)

  }

  const contextValue = {
    token,
    login,
    logout, 
    userId,
    username,
    points,
    updateUsername,
    getPoints,
    updatePoints
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext