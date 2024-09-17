import React, {useState, useReducer} from 'react'
import { UserContext } from './context/UserContext.jsx'
import { userReducer } from './context/UserReducer.js'
import { AppRoutes } from './routes/AppRoutes.jsx'

function App() {
  const getUser = () => JSON.parse(localStorage.getItem('user')) || { logged: false };

  const [userState, userDispatch] = useReducer(userReducer, {}, getUser);

  return (
    <>
      <UserContext.Provider value={{userState, userDispatch}}>
        <AppRoutes />
      </UserContext.Provider>
    </>
  )
}

export default App