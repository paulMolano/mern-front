import React, { useContext } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import TareaContext from "../../context/tareas/tareaContext";

const Proyecto = ({ proyecto }) => {
  //Obtener el state del formulario
  const proyectosContext = useContext(proyectoContext);
  const { proyectoActual } = proyectosContext;

  //Obetner la función del context de tarea
  const tareasContext = useContext(TareaContext);
  const { obtenerTareas, limpiarTarea } = tareasContext;

  //Función para agregar el proyecto actual
  const seleccionarProyecto = (id) => {
    proyectoActual(id); //Fijar proyecto actual
    obtenerTareas(id); //Filtrar las tareas cuando se de click
    limpiarTarea();
  };

  return (
    <li
      onClick={() => {
        seleccionarProyecto(proyecto._id);
      }}
    >
      <button type="button" className="btn btn-blank">
        {proyecto.nombre}
      </button>
    </li>
  );
};

export default Proyecto;
