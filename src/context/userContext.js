import * as React from 'react'
import { useState } from 'react'

const UserContext = React.createContext()

function UserProvider({children}) {
    const [user, setUser] = useState({

        user_id: null,
        token: '',
        points: 0,
        login: () => {},
        logout: () => {}
        
    })

  const value = {user}
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

function useUser() {
  const context = React.useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export {UserProvider, useUser}