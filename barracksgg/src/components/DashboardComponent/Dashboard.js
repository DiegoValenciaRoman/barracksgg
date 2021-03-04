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
    <div className="dashboard">
      <div className="mainDashboardContainer">
        <div className="headerDashboard">
          <div className="buttons">
            <button onClick={logOut} className="logOutButton">
              Salir
            </button>
          </div>
          <div className="token">{user?.token}</div>
        </div>
        <div className="tabContainerDashboard">tabs here</div>
      </div>
    </div>
  );
}

export default Dashboard;
