// Estilos
import './style.css';

// Importacion de componentes
import { AnimationLoading, ItemListProduct, PadPagination } from '../componentsBarrel';

import { useEffect, useState } from 'react';
import { devHost, fetchData, queryGetter, queryMaker } from '../../hooks/hooksBarrel';
import { useLocation, useSearchParams } from 'react-router-dom';

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
      {isLoading ? <AnimationLoading /> : <ItemListProduct productlist={pageData.docs} />}
      <PadPagination
        hasPrevPage={hasPrevPage}
        prevLink={prevLink}
        page={page}
        nextLink={nextLink}
        hasNextPage={hasNextPage}
      />
    </div>
  );
};

export default ConteinerProductItemList;
