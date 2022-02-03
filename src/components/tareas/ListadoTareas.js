import React, { useContext } from "react";
import Tarea from "./Tarea";

import proyectoContext from "../../context/proyectos/proyectoContext";
import TareaContext from "../../context/tareas/tareaContext";

import { CSSTransition, TransitionGroup } from "react-transition-group";

const ListadoTareas = () => {
  //Extraer proyectos de state
  const proyectosContext = useContext(proyectoContext);
  const { proyecto, eliminarProyecto } = proyectosContext;

  //Extraer tareasProyecto del Context
  const tareasContext = useContext(TareaContext);
  const { tareasproyecto } = tareasContext;

  //Si no hay proyecto seleccionado
  if (!proyecto) {
    return <h2>Selecciona un proyecto</h2>;
  }

  //Array destructuring para extraer el proyecto actual
  const [proyectoActual] = proyecto;

  return (
    <>
      <h2>{proyectoActual.nombre}</h2>
      <ul className="listado-tareas">
        {tareasproyecto.length === 0 ? (
          <li className="tarea">
            <p>No hay tareas</p>
          </li>
        ) : (
          <TransitionGroup>
            {tareasproyecto.map((tarea) => (
              <CSSTransition key={tarea._id} timeout={200} classNames="tarea">
                <Tarea tarea={tarea} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </ul>

      <button
        type="button"
        className="btn btn-eliminar"
        onClick={() => eliminarProyecto(proyectoActual._id)}
      >
        Eliminar Proyecto &times;
      </button>
    </>
  );
};

export default ListadoTareas;
