import { useContext, useId, useState } from 'react';

// Estilos
import './style.css';
import { dataUploader } from '../../hooks/hooksBarrel.js';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext.jsx';

const FormData = (props) => {
  // Parametros
  const { dataQuestions, fetchRoute } = props;
  const { userSetter } = useContext(UserContext);
  const navigate = useNavigate();

  // Logica
  const [dataToUpdate, setDataToUpdate] = useState(
    dataQuestions.reduce((obj, element) => {
      obj[element.id] = '';
      return obj;
    }, {})
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const logData = await dataUploader({
      apiRoute: fetchRoute,
      method: 'post',
      updatableData: Object.keys(dataToUpdate),
    });
    console.log('check logData in handleSubmit of Data Form Component', logData);
    userSetter(logData);
    navigate('/');
  };

  // Renderizado
  return (
    <form id={useId('loguinForm')} className="requestDataForm">
      {dataQuestions.map((point) => {
        return (
          <div key={point.id} className="requestDataForm__option">
            <label htmlFor={point.id} className="requestDataForm__option--label">
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
        key={useId('Aceptar')}
        onClick={handleSubmit}
        className="requestDataForm--formButton"
        type="submit"
      >
        Aceptar
      </button>
    </form>
  );
};

export default FormData;
