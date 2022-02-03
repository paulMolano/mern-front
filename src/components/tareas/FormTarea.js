import React, { useContext, useState, useEffect } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import TareaContext from "../../context/tareas/tareaContext";

const FormTarea = () => {
  //Extraer si un proyecto está activo
  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;

  //Traer del context la funcion agregarTarea
  const tareasContext = useContext(TareaContext);
  const {
    tareaseleccionada,
    errortarea,
    agregarTarea,
    validarTarea,
    obtenerTareas,
    actualizarTarea,
    limpiarTarea,
  } = tareasContext;

  //Effect que detecta si hay una tarea seleccionada
  useEffect(() => {
    if (tareaseleccionada !== null) {
      guardarTarea(tareaseleccionada);
    } else {
      guardarTarea({
        nombre: "",
      });
    }
  }, [tareaseleccionada]);

  //Estado inicial del formulario
  const [tarea, guardarTarea] = useState({
    nombre: "",
  });

  //Extraer el nombre del proyecto
  const { nombre } = tarea;

  //Si no hay proyecto seleccionado
  if (!proyecto) {
    return null;
  }

  //Array destructuring para extraer el proyecto actual
  const [proyectoActual] = proyecto;

  //Lee los contenidos del input y los guarda en el estado
  const handleChange = (e) => {
    guardarTarea({
      ...tarea,
      [e.target.name]: e.target.value,
    });
  };

  //Cuando el usuario clica para agregar nuevo formulario
  const onSubmit = (e) => {
    e.preventDefault();

    //Validar
    if (nombre.trim() === "") {
      validarTarea();
      return;
    }

    //Revisar si es edición o nueva Tarea
    if (tareaseleccionada === null) {
      //Tarea nueva
      tarea.proyecto = proyectoActual._id;
      agregarTarea(tarea);
    } else {
      //Editar tarea
      actualizarTarea(tarea);

      //Elimina tarea seleccionada del state
      limpiarTarea();
    }

    //Obtener y filtrar las tareas del proyecto actual
    obtenerTareas(proyectoActual._id);

    //Limpiar el form
    guardarTarea({
      nombre: "",
    });
  };

  return (
    <div className="formulario">
      <form onSubmit={onSubmit}>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre tarea..."
            name="nombre"
            onChange={handleChange}
            value={nombre}
          />
        </div>
        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value={tareaseleccionada ? "Editar Tarea" : "Agregar Tarea"}
          />
        </div>
      </form>

      {errortarea ? (
        <p className="mensaje error">El nombre de la tarea es obligatorio</p>
      ) : null}
    </div>
  );
};

export default FormTarea;
