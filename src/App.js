import React, { Fragment, useState, useEffect } from "react";
import Formulario from "./componentes/Formulario";
import Cita from "./componentes/Cita";

function App() {

  let citasGuardadas = JSON.parse(localStorage.getItem("citas"));

  const [citas, setCitas] = useState([]);

  if (!citasGuardadas) {
    citasGuardadas = [];
  }

  const crearCita = cita => {
    setCitas([...citas, cita]);
  };

  const eliminarCita = id => {
    const nuevaCitas = citas.filter(cita => cita.id !== id);
    setCitas(nuevaCitas);
  };

  useEffect(() => {
    let citasGuardadas = JSON.parse(localStorage.getItem("citas"));
    if (citasGuardadas) localStorage.setItem("citas", JSON.stringify(citas));
    else localStorage.setItem("citas", JSON.stringify([]));
  }, [citas]);

  const mensaje = citas.length > 0 ? "Administra tus citas" : "No hay citas";

  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario crearCita={crearCita}></Formulario>
          </div>
          <div className="one-half column">
            <h2>{mensaje}</h2>
            {citas.map(cita => (
              <Cita
                key={cita.id}
                cita={cita}
                eliminarCita={eliminarCita}
              ></Cita>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
