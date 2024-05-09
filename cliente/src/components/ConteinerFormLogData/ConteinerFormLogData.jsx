// Estilos
import './style.css';

import { FormData, PadConteinerFormLogData } from '../componentsBarrel';
import { devHost } from '../../hooks/hooksBarrel';
import { useState } from 'react';

const ConteinerFormLogData = () => {
  const [utility, setUtility] = useState('loguin');

  const dataLoguinQuestions = [
    {
      type: 'email',
      id: 'email',
      label: 'Coreo electronico:',
      placeholder: 'Inclui el @',
    },
    {
      type: 'password',
      id: 'password',
      label: 'Crea tu contraseña:',
      placeholder: 'Top secret',
    },
  ];
  const dataRegisterQuestions = [
    {
      type: 'text',
      id: 'lastName',
      label: 'Apellido:',
      placeholder: 'Escribi tu apelllido',
    },
    {
      type: 'text',
      id: 'firstName',
      label: 'Nombre:',
      placeholder: 'Escribi tu nombre',
    },
    { type: 'number', id: 'age', label: 'Edad:', placeholder: '' },
    {
      type: 'email',
      id: 'email',
      label: 'Coreo electronico:',
      placeholder: 'Inclui el @',
    },
    {
      type: 'password',
      id: 'password',
      label: 'Crea tu contraseña:',
      placeholder: 'Top secret',
    },
  ];

  return (
    <div className="LogDataFormConteiner">
      {utility === 'loguin' ? (
        <div className="LogDataFormConteiner__utility">
          <FormData fetchRoute={`${devHost()}/api/sessions/loguin`} dataQuestions={dataLoguinQuestions} />
          <PadConteinerFormLogData setter={setUtility} getter={utility} />
        </div>
      ) : (
        <div className="LogDataFormConteiner__utility">
          <FormData fetchRoute={`${devHost()}/api/sessions/register`} dataQuestions={dataRegisterQuestions} />
          <PadConteinerFormLogData setter={setUtility} getter={utility} />
        </div>
      )}
    </div>
  );
};

export default ConteinerFormLogData;
