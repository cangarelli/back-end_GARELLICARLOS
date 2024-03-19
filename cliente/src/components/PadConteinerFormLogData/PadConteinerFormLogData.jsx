// Estilos
import { Link } from 'react-router-dom';
import './style.css';
import { devHost, fetchData } from '../../hooks/hooksBarrel';

const PadConteinerFormLogData = (props) => {
  const { setter, getter } = props;
  const handleUtility = () => {
    getter === 'loguin' ? setter('register') : setter('loguin');
  };
  const handleRetrievePass = () => {
    // fetchData({ route: `${devHost()}/`, method: 'GET' });
  };
  return (
    <div>
      <div>
        <button type="button">
          <Link to="/">Cancelar</Link>{' '}
        </button>
        {getter === 'loguin' ? (
          <button type="button" onClick={handleUtility}>
            Registrarme
          </button>
        ) : (
          <button type="button" onClick={handleUtility}>
            Loguin
          </button>
        )}
      </div>
      {getter === 'loguin' && <Link to="/retrievepass/sendmail">Olvide mi contraseña</Link>}
    </div>
  );
};

export default PadConteinerFormLogData;
