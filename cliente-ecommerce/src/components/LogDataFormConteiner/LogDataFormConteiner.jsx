// Estilos
import './style.css';

import { Link } from 'react-router-dom';

import { ButtonPanel, FormData } from '../componentsBarrel';
import { devHost } from '../../hooks/hooksBarrel';

const LogDataFormConteiner = (props) => {
  const { path } = props;
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
  const loguinAlternativesArray = [
    { type: 'button', label: 'Cancelar', link: '/' },
    { type: 'button', label: 'Registrarme', link: '/register' },
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
  const registerAlternativesArray = [
    { type: 'button', label: 'Cancelar', link: '/' },
    { type: 'button', label: 'Loguin', link: '/loguin' },
  ];

  return (
    <div className="LogDataFormConteiner">
      {path == 'loguin' ? (
        <FormData fetchRoute={`${devHost()}/api/sessions/loguin`} dataQuestions={dataLoguinQuestions} />
      ) : (
        <FormData fetchRoute={`${devHost()}/api/sessions/register`} dataQuestions={dataRegisterQuestions} />
      )}
      <div className="buttonPanel">
        {path == 'loguin'
          ? loguinAlternativesArray.map((alt) => {
              return (
                <button key={alt.label} type={alt.type}>
                  <Link to={alt.link}>{alt.label}</Link>
                </button>
              );
            })
          : registerAlternativesArray.map((alt) => {
              return (
                <button key={alt.label} type={alt.type}>
                  <Link to={alt.link}>{alt.label}</Link>
                </button>
              );
            })}
      </div>
    </div>
  );
};

export default LogDataFormConteiner;
