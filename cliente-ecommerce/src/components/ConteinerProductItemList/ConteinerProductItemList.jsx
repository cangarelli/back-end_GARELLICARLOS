// Estilos
import './style.css';

// Importacion de componentes
import { ButtonPanel, ItemListProduct } from '../componentsBarrel';

import { useEffect, useState } from 'react';
import { devHost, fetchData, queryGetter, queryMaker } from '../../hooks/hooksBarrel';
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom';

const ConteinerProductItemList = (props) => {
  const [pageData, setPageData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { pathname, search } = useLocation();
  const [searchParams] = useSearchParams();

  const pagination = searchParams.get('onPage');

  useEffect(() => {
    // Hacer Fecth
    const token = document.cookie;
    // console.log ("check useEffect fetch of ProductItemListConteiner is token", token)

    const virtualQuerys = queryGetter(searchParams, 'category', 'disponibility', 'order', 'limit', 'onPage');
    const queryString = queryMaker(virtualQuerys);

    fetchData({
      route: `${devHost()}/api/products/${queryString}`,
      method: 'GET',
      token,
    })
      .then((res) => {
        // console.log ("check useEffect fetch of ProductItemListConteiner is res", res)
        if (res.status == 'success') {
          setPageData(res.payload);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log('check useEffect fetch of ProductItemListConteiner is err', err);
      });
    return () => {};
  }, [pagination]);
  const { hasNextPage, hasPrevPage, nextLink, nextPage, page, prevLink, prevPage, totalPages } = pageData;

  // console.log ("check pageData of ProductItemListConteiner component" , pageData)
  // Renderización  de componente

  return (
    <div className="productItemListConteiner">
      {/* <ButtonPanel/> */}
      {isLoading ? (
        <h2> CARGANDO... </h2>
      ) : (
        // <h2> No esta cargando ya</h2>
        <ItemListProduct productlist={pageData.docs} />
      )}
      <div className="productItemListConteiner__butonPad">
        {hasPrevPage ? (
          <Link to={`/${prevLink}`}>Pagina anterior</Link>
        ) : (
          <button disabled>Pagina anterior</button>
        )}
        <span>{page}</span>
        {hasNextPage ? (
          <button>
            <Link to={`/${nextLink}`}>Pagina siguiente</Link>
          </button>
        ) : (
          <button disabled>Pagina siguiente</button>
        )}
      </div>
    </div>
  );
};

export default ConteinerProductItemList;
