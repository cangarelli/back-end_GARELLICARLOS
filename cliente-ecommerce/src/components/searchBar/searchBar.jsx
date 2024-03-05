import React from 'react';

// Estilos
import './style.css';
import { ButtonOption, SubTitle } from '../componentsBarrel';

const SearchBar = (props) => {
  const { categories } = props;
  return (
    <form className="SearchBar">
      <div className="SearchBar__prodCategories">
        <SubTitle texto="Categorias" />
        <div className="SearchBar__prodCategories--option">
          {categories.map((categorie) => {
            return (
              <div className="SearchBar__prodCategories--optionMenu">
                <label for={categorie}> {categorie.toUpperCase()} </label>
                <input type="checkbox" name={categorie} id={categorie} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="SearchBar__order">
        <SubTitle texto="Orden" />
        <div>
          <label for="orderHigh">Mayor precio</label>
          <input type="checkbox" name="orderHeigh" id="orderHeigh" />
          <label for="orderLow">Menor precio</label>
          <input type="checkbox" name="orderLow" id="orderLow" />
        </div>
      </div>
      <div className="SearchBar__disponibility">
        <SubTitle texto="Disponinilidad" />
        <div>
          <label for="disponibility">Solo disponibles</label>
          <input type="checkbox" name="disponibility" id="status" />
        </div>
      </div>
      <div className="SearchBar__buttonPad">
        <ButtonOption buttonData={{ value: 'Filter Search' }} />
      </div>
    </form>
  );
};

export default SearchBar;
