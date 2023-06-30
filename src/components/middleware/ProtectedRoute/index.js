import { Navigate, Outlet } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUserDetails } from "../../../features/actions/authActions"
/* import { useAuth0 } from "@auth0/auth0-react"; */

function ProtectedRoute() {
  /* const { isAuthenticated, user } = useAuth0(); */
  /* const { logedUser } = useSelector((state) => state.user); */
  
  /* let hola = authInfo.then((res)=>{ testValue = res.payload;console.log("res.payload",res.payload)}).catch(e=>console.log(e)) */
  
  const logedUser = useSelector(state => state.auth.userInfo)


  return logedUser?.admin ? <Outlet /> : <Navigate to={"/"} />;
}

export default ProtectedRoute;