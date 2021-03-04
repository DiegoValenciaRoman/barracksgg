import React, { useState, useEffect } from "react";
import {
  sendUserCredentials,
  selectUser,
} from "../../features/counter/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function Login() {
  //manages state from the log in form
  const [formData, setFormdata] = useState({
    mail: "",
    password: "",
  });
  const user = useSelector(selectUser);
  //utility to dispatch actions to redux
  const dispatch = useDispatch();
  //utility to redirect user
  const history = useHistory();

  /**
   * @params None, uses local component state
   * @description Updates formdata local state with valules provided by onChange event
   * @returns void
   */
  const onChangeForm = (e) => {
    setFormdata({ ...formData, [e.target.id]: e.target.value });
  };

  /**
   * @params None, uses local component state
   * @description Returns true if at least one element from formdata state is empty
   * @returns Boolean
   */
  const checkEmptyForm = () => {
    return formData.mail === "" || formData.password === "";
  };

  /**
   * @params None, uses local component state
   * @description Dispatchs form's data to the action that makes the api request
   * @returns void
   */
  const login = () => {
    console.log(formData);
    if (checkEmptyForm()) {
      alert("no puedes enviar el formulario vacio!");
      return false;
    }
    dispatch(sendUserCredentials(formData));
  };

  useEffect(() => {
    if (user.isAuth) {
      history.push("/account/data");
    }
  }, [user]);
  return (
    <div className="login">
      <div className="container">
        <div className="formTitle">LOGIN</div>
        <div className="loginForm">
          <input
            className="loginInput"
            id="mail"
            placeholder="Usuario"
            onChange={onChangeForm}
          ></input>
          <input
            className="loginInput"
            id="password"
            type="password"
            placeholder="Contraseña"
            onChange={onChangeForm}
          ></input>

          <button className="ingresarButton" onClick={login}>
            Ingresar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
