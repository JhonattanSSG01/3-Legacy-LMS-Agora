import apiAgora from "../../../api/index";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { showErrMsg, showSuccessMsg } from "../../../utils/notification";
import { dispatchLogin } from "../../../redux/actions/authAction";
import { useDispatch } from "react-redux";
import Group from "../../../assets/logos/Group.png";
import Agora from "../../../assets/logos/agora.png";
import Facebook from "../../../assets/icons/facebook.png";
import Instagram from "../../../assets/icons/instagram.png";
import "./Login.css";
import logo from "../../../assets/logos/Programate-academy-negros.png";
import LazyLoad from "react-lazy-load";

const initialState = {
  email: "",
  password: "",
  err: "",
  success: "",
};

function Login() {
  const [user, setUser] = useState(initialState); //Inicializo hooks
  const dispatch = useDispatch(); //Inicializo hooks
  const navigate = useNavigate(); //Inicializo hooks

  const { email, password, success } = user;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await apiAgora.post("/api/login", {
        email,
        password,
      });
      setUser({ ...user, err: "", success: res.data.msg });
      window.localStorage.setItem("firstLogin", true);
      window.localStorage.setItem("loggedAgoraUser", JSON.stringify(res.data));
      showSuccessMsg(success);
      dispatch(dispatchLogin());
      navigate("/");
    } catch (err) {
      showErrMsg(err.response.data.error);
      err.response.data.error &&
        setUser({ ...user, err: err.response.data.error, success: "" });
    }
  };

  return (
    <>
      <div className="container-login">
        <LazyLoad className="imagenes">
          <img className="agora" src={Agora} alt="" />
        </LazyLoad>

        <LazyLoad>
          <img className="logo" src={logo} alt="" />
        </LazyLoad>
        <div className="login-page">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h1 className="title">
              Ingreso de <br /> Usuario
            </h1>
            <LazyLoad>
              <img className="group" src={Group} alt="" />
            </LazyLoad>
          </div>
          <form className="form" onSubmit={handleSubmit}>
            <div className="login-form-content">
              <h4 className="rayas" style={{ margin: "20px 0" }}>
                ingresa tu e-mail
              </h4>
              <input
                className="correo"
                placeholder="email@educamas.co"
                name="email"
                value={email}
                onChange={handleChangeInput}
                required
              />
              <h4 className="rayas" style={{ margin: "20px 0" }}>
                {" "}
                Contraseña
              </h4>
              <input
                className="clave"
                type="Password"
                placeholder="********"
                name="password"
                value={password}
                onChange={handleChangeInput}
                required
              />
            </div>
            <Link className="requerid">Todos los campos son requeridos</Link>

            <button className="button-login" type="submit">
              INGRESAR
            </button>
            <hr />
          </form>
          <div className="redes">
            <Link className="clave" to="/forgot_password">
              ¿Olvidó su contraseña?
            </Link>
            <LazyLoad>
              <img src={Instagram} alt="" />
            </LazyLoad>
            <LazyLoad>
              <img src={Facebook} alt="" />
            </LazyLoad>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
