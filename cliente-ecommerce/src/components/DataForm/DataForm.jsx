import { useEffect, useId, useState } from "react";

// Estilos
import "./style.css";
import { dataUploader, handleSubmit } from "../../hooks/hooksBarrel.js";
import { dv } from "@faker-js/faker";
import { Link } from "react-router-dom";

const DataForm = (props) => {
  // Parametros
  const { dataQuestions, fetchRoute } = props;

  // Logica
  console.log("check dataQuestions at data form", dataQuestions);
  const [dataToUpdate, setDataToUpdate] = useState(
    dataQuestions.reduce((obj, element) => {
      obj[element.id] = "";
      return obj;
    }, {})
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    dataUploader({
      apiRoute: fetchRoute,
      method: "post",
      updatableData: Object.keys(dataToUpdate),
    });
  };

  // Renderizado
  return (
    <form className="requestDataForm">
      {dataQuestions.map((point) => {
        return (
          <div key={useId(point.id)} className="requestDataForm__option">
            <label
              htmlFor={point.id}
              className="requestDataForm__option--label"
            >
              {point.label}
            </label>
            <input
              type={point.type}
              className="requestDataForm__option--input"
              id={point.id}
              name={point.id}
              placeholder={point.placeholder}
            />
          </div>
        );
      })}
      <button
        key={useId("Aceptar")}
        onClick={handleSubmit}
        className="requestDataForm--formButton"
        type="submit"
      >
        Aceptar
      </button>
    </form>
  );
};

export default DataForm;
