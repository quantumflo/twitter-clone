import { useCallback, useState } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import { AuthContext } from './Context/auth-context';
const App = () => {
  const [token, setToken] = useState(false);
  const [uid, setUid] = useState(false);

  console.log(process.env.NODE_ENV)
  const login = useCallback((uid, token) => {
    setToken(true);
    setUid(uid);
  },[])
  const logout = useCallback(() => {
    setToken(null)
    setUid(null);
  },[])
  let routes;

  if(token) {
    routes = (
      <Routes>
      <Route path="/" exact element={<HomePage />} />
      <Route path="*" element={<Navigate to ="/" />}/>
       </Routes>
    )
  } else {
    routes = (
      <Routes>
    <Route path="/login" element={<Login />} />
     <Route path="/signup" element={<SignUp />} />
     <Route path="*" element={<Navigate to ="/login" />}/>
     </Routes>
    )
    
  }
  return (
    <AuthContext.Provider value={{isLoggedIn:!!token, token: token, uid:uid, login:login, logout:logout}}>
    <Router>
    {routes}
   </Router>
   </AuthContext.Provider>
  );
}

export default App;
