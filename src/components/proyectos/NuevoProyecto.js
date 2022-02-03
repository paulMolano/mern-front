import React, { useState, useContext } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";

export const NuevoProyecto = () => {
  //Obtener el state del formulario
  const proyectosContext = useContext(proyectoContext);
  const {
    formulario,
    errorformulario,
    mostrarFormulario,
    agregarProyecto,
    mostrarError,
  } = proyectosContext;

  //State para Proyecto
  const [proyecto, guardarProyecto] = useState({
    nombre: "",
  });

  //Extraer el nombre del proyecto
  const { nombre } = proyecto;

  //Lee los contenidos del input y los guarda en el estado
  const onChangeProyecto = (e) => {
    guardarProyecto({
      ...proyecto,
      [e.target.name]: e.target.value,
    });
  };

  //Cuando el usuario envia el nombre del nuevo proyecto
  const onSubmitProyecto = (e) => {
    e.preventDefault();

    //Validar el proyecto
    if (nombre === "") {
      mostrarError();
      return;
    }

    //Agregarlo al state
    agregarProyecto(proyecto);

    //reiniciar el form
    guardarProyecto({
      nombre: "",
    });
  };

  return (
    <>
      <button
        className="btn btn-block btn-primario"
        type="button"
        onClick={() => mostrarFormulario()}
      >
        Nuevo Proyecto
      </button>

      {formulario ? (
        <form className="formulario-nuevo-proyecto" onSubmit={onSubmitProyecto}>
          <input
            type="text"
            className="input-text"
            placeholder="Nombre Proyecto"
            name="nombre"
            value={nombre}
            onChange={onChangeProyecto}
          />

          <input
            type="submit"
            className="btn btn-block btn-primario"
            value="Agregar Proyecto"
          />
        </form>
      ) : null}

      {errorformulario ? (
        <p className="mensaje error">El nombre del Proyecto es obligatorio</p>
      ) : null}
    </>
  );
};

export default NuevoProyecto;
