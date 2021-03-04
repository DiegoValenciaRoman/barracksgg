import React, { useState } from "react";
import { Redirect } from "react-router-dom";
function Protectedroute(props) {
  const [isAuth, setIsAuth] = useState(true);
  const Component = props.component;
  return isAuth ? (
    <Component />
  ) : (
    <Redirect to={{ pathname: "/account/login" }} />
  );
}

export default Protectedroute;
