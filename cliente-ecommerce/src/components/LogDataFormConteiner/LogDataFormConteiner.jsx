// Estilos
import './style.css';

import React from 'react';
import { ButtonPanel, DataForm } from '../componentsBarrel';
import { devHost, handleSubmit } from '../../hooks/hooksBarrel';
import { Link } from 'react-router-dom';

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
        <DataForm fetchRoute={`${devHost()}/api/sessions/loguin`} dataQuestions={dataLoguinQuestions} />
      ) : (
        <DataForm fetchRoute={`${devHost()}/api/sessions/register`} dataQuestions={dataRegisterQuestions} />
      )}
      <div className="buttonPanel">
        {path == 'loguin'
          ? loguinAlternativesArray.map((alt) => {
              return (
                <button type={alt.type}>
                  <Link to={alt.link}>{alt.label}</Link>
                </button>
              );
            })
          : registerAlternativesArray.map((alt) => {
              return (
                <button type={alt.type}>
                  <Link to={alt.link}>{alt.label}</Link>
                </button>
              );
            })}
      </div>
    </div>
  );
};

export default LogDataFormConteiner;
