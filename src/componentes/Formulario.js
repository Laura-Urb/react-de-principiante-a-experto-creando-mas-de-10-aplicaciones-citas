import React, { Fragment, useState } from "react";
import uuid from 'uuid/v4';
import { PropTypes } from "prop-types";

const Formulario = ({crearCita}) => {
  const [cita, editarCita] = useState({
    mascota: "",
    propietario: "",
    fecha: "",
    hora: "",
    sintomas: ""
  });

  const [error, setError] = useState(false);

  const { mascota, propietario, fecha, hora, sintomas } = cita;

  const editarState = e => {
    editarCita({
      ...cita,
      [e.target.name]: e.target.value
    });
  };

  const submitCita = e => {
    e.preventDefault();

    //Validar
    if (
      mascota.trim() === "" ||
      propietario.trim() === "" ||
      fecha.trim() === "" ||
      hora.trim() === "" ||
      sintomas.trim() === ""
    ) {
      setError(true);
      return;
    }

    //Eliminar el mensaje precio
    setError(false);

    //Asignar Id
    cita.id = uuid();

    //Crear la cita
    crearCita(cita);

    //Reiniciar la cita
    editarCita({
      mascota: "",
      propietario: "",
      fecha: "",
      hora: "",
      sintomas: ""
    });
  };

  return (
    <Fragment>
      <h2>Crear Cita</h2>
      {error ? (
        <p className="alerta-error">Todos los campos son obligatorios</p>
      ) : null}
      <form onSubmit={submitCita}>
        <label>Nombre Mascota</label>
        <input
          type="text"
          name="mascota"
          className="u-full-width"
          placeholder="Nombre Mascota"
          onChange={editarState}
          value={mascota}
        />
        <label>Nombre Dueño</label>
        <input
          type="text"
          name="propietario"
          className="u-full-width"
          placeholder="Nombre Dueño de la Mascota"
          onChange={editarState}
          value={propietario}
        />
        <label>Fecha</label>
        <input
          type="date"
          name="fecha"
          className="u-full-width"
          onChange={editarState}
          value={fecha}
        />
        <label>Hora</label>
        <input
          type="time"
          name="hora"
          className="u-full-width"
          onChange={editarState}
          value={hora}
        />
        <label>Sintomas</label>
        <textarea
          name="sintomas"
          className="u-full-width"
          onChange={editarState}
          value={sintomas}
        />
        <button type="submit" className="u-full-width button-primary">
          Agregar Cita
        </button>
      </form>
    </Fragment>
  );
};

Formulario.propTypes = {
  crearCita: PropTypes.func.isRequired
}

export default Formulario;
