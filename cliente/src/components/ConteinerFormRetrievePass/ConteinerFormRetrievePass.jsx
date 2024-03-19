import "./style.css";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { devHost, fetchData } from "../../hooks/hooksBarrel";
import { FormData } from "../componentsBarrel";
const ConteinerFormRetrievePass = () => {
  // Seteo de variables
  const token = useParams().token;
  const [pathValidate, setPathValidate] = useState(false);

  // Logica de manejo de datos
  useEffect(() => {
    console.log(
      "check conditions in conteiner form retrieve pass",
      token,
      token.length > 0,
      token != "sendmail"
    );
    if (token && token.length > 0 && token != "sendmail") {
      (async () => {
        try {
          const response = await fetchData({
            route: `${devHost()}/api/sessions/tokenLinkValidator/${token}`,
            method: "GET",
          });
          if (response && response.status === "success") setPathValidate(true);
        } catch (error) {
          console.log("check token checker is error on catch", error);
        }
      })();
    }
  }, [token]);

  // Parametros para formData component is render
  const mailGetter = [
    {
      id: "email",
      label: "Correo Electronico:",
      placeholder: "Ingresa tu correo electronico",
      type: "mail",
    },
  ];
  const passMaker = [
    {
      id: "password",
      label: "Nueva contraseña:",
      placeholder: "Ingresa una nueva contraseña",
      type: "password",
    },
    {
      id: "passwordCheck",
      label: "Confirma la contraseña:",
      placeholder: "Volvela a ingresar",
      type: "password",
    },
  ];

  // Renderizado
  return (
    <div className="ConteinerFormRetrivePass">
      {token === "sendmail" ? (
        <FormData
          fetchRoute={`${devHost()}/api/users/temporalRetrieveAtempt/sendLinkMail`}
          dataQuestions={mailGetter}
        />
      ) : pathValidate ? (
        <FormData
          fetchRoute={`${devHost()}/api/users/temporalRetrieveAtempt/uptdatePassword/${token}`}
          dataQuestions={passMaker}
        />
      ) : (
        <h1> Sitio web caducado. Vuelva a generar el link</h1>
      )}
    </div>
  );
};

export default ConteinerFormRetrievePass;
