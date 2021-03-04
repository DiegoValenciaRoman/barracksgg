import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/counter/appSlice";
function Protectedroute(props) {
  const user = useSelector(selectUser);
  const Component = props.component;
  return user.isAuth ? (
    <Component />
  ) : (
    <Redirect to={{ pathname: "/account/login" }} />
  );
}

export default Protectedroute;
