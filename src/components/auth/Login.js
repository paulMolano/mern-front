import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import alertaContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/autenticacion/authContext";

const Login = (props) => {
  //Para redirigir al usuario
  let history = useNavigate();

  //Extraer valores del context
  const alertasContext = useContext(alertaContext);
  const { alerta, mostrarAlerta } = alertasContext;

  //Extraer valores del context
  const authcontext = useContext(AuthContext);
  const { mensaje, autenticado, iniciarSesion } = authcontext;

  //En caso de que el password o usuario no exista
  useEffect(() => {
    if (autenticado) {
      history("/proyectos");
    }
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mensaje, autenticado, history]);

  //State para iniciar sesión
  const [usuario, guardarUsuario] = useState({
    email: "",
    password: "",
  });

  //extraer de usuario
  const { email, password } = usuario;

  //Cuando cambian los inputs el usuario coge el valor actual
  const onChange = (e) => {
    guardarUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  //Cuando el usuario quiere iniciar sesion
  const onSubmit = (e) => {
    e.preventDefault();

    //Validar que no haya campos vacios
    if (email.trim() === "" || password.trim() === "") {
      mostrarAlerta("Todos los campos son obligatorios", "alerta-error");
    }

    //Pasarlo al action
    iniciarSesion({ email, password });
  };

  return (
    <div className="form-usuario">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      ) : null}

      <div className="contenedor-form sombra-dark">
        <h1>Iniciar Sesión</h1>

        <form onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Iniciar Sesión"
            />
          </div>
        </form>

        <Link to={"/nueva-cuenta"} className="enlace-cuenta">
          Crea nueva cuenta
        </Link>
      </div>
    </div>
  );
};

export default Login;
