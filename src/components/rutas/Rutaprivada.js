import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../context/autenticacion/authContext";

const RutaPrivada = ({ children }) => {
  const authcontext = useContext(AuthContext);
  const { autenticado, cargando, usuarioAutenticado } = authcontext;

  useEffect(() => {
    usuarioAutenticado();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return !autenticado && !cargando ? <Navigate to="/" /> : children;
};

export default RutaPrivada;
