import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const logedUser = useSelector(state => state.auth.userInfo)


  return logedUser?.admin ? <Outlet /> : <Navigate to={"/"} />;
}

export default ProtectedRoute;