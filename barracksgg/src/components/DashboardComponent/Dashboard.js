import React, { useEffect } from "react";
import { logOutUser, selectUser } from "../../features/counter/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
function Dashboard() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  //utility to redirect user
  const history = useHistory();
  const logOut = () => {
    dispatch(logOutUser());
  };
  useEffect(() => {
    if (!user.isAuth) {
      history.push("/account/login");
    }
  }, [user]);
  return (
    <div>
      <button onClick={logOut}>Salir</button>
      <h1>{user?.token}</h1>
    </div>
  );
}

export default Dashboard;
