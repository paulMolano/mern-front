import { useContext, useEffect } from "react";
import AuthContext from "../../context/autenticacion/authContext";

const Barra = () => {
  //Extraer la información de autenticación
  const authContext = useContext(AuthContext);
  const { usuario, usuarioAutenticado, cerrarSesion } = authContext;

  useEffect(() => {
    usuarioAutenticado();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header className="app-header">
      {usuario ? (
        <p className="nombre-usuario">
          Hola <span> {usuario.nombre.toUpperCase()}</span>
        </p>
      ) : null}

      <nav className="nav-principal">
        <button
          className="btn btn-blank cerrar-sesion"
          onClick={() => cerrarSesion()}
        >
          Cerrar sesion
        </button>
      </nav>
    </header>
  );
};

export default Barra;
