import React, { useEffect, useState } from "react";
import { logOutUser, selectUser } from "../../features/counter/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Pokemon from "../PokemonComponent/Pokemon";
import Nasa from "../NasaComponent/Nasa";
function Dashboard() {
  //utility to dispatch actions
  const dispatch = useDispatch();
  // user global state
  const user = useSelector(selectUser);
  //utility to redirect user
  const history = useHistory();
  const [tabsInfo, setTabsInfo] = useState([
    { name: "NASA POD", isActive: true },
    { name: "POKÉMON", isActive: false },
  ]);
  /**
   * @params None
   * @description Dispatchs logout user action to remove user info from localstorage and redux state
   * @returns void
   */
  const logOut = () => {
    dispatch(logOutUser());
  };
  /**
   * @params None, uses local component state
   * @description Updates tabsinfo state according to new active tab selected by the user
   * @returns void
   */
  const changeActive = (position) => {
    setTabsInfo(
      tabsInfo.map((tab, i) => {
        if (i === position) {
          return { ...tab, isActive: true };
        } else {
          return { ...tab, isActive: false };
        }
      })
    );
  };

  /**
   * @params component name
   * @description maps component's name to the actual component selected by the user on the tab window
   * @returns component
   */
  const getComponent = (name) => {
    switch (name) {
      case "POKÉMON":
        return <Pokemon></Pokemon>;
      case "NASA POD":
        return <Nasa></Nasa>;
      default:
        break;
    }
  };
  useEffect(() => {
    console.log(tabsInfo);
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
        <div className="tabContainerDashboard">
          <div class="tab">
            {tabsInfo.map((tab, i) => (
              <button
                class="tablinks"
                style={tab.isActive ? {} : { opacity: "0.5" }}
                onClick={() => {
                  changeActive(i);
                }}
                key={tab.name}
              >
                {tab.name}
              </button>
            ))}
          </div>
          <div className="tabComponent">
            {tabsInfo.map((tab) =>
              tab.isActive ? (
                <div class="tabcontent">{getComponent(tab.name)}</div>
              ) : (
                ""
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
