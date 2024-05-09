// Estilos
import './style.css';

const ButtonOption = (props) => {
  const { buttonData } = props;

  return <input className="optionButton" type="button" value={`${buttonData.value}`} />;
};

export default ButtonOption;
