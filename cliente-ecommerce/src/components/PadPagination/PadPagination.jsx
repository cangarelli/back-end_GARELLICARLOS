// Estilos
import './style.css';

import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';
import { Link } from 'react-router-dom';

const PadPagination = (props) => {
  const { hasPrevPage, prevLink, page, nextLink, hasNextPage } = props;
  return (
    <div className="padPagination">
      {hasPrevPage ? (
        <button className="padPagination--button">
          <Link to={`/${prevLink}`}>
            <MdNavigateBefore />
          </Link>
        </button>
      ) : (
        <button disabled className="padPagination--button">
          <MdNavigateBefore />
        </button>
      )}
      <span>{page}</span>
      {hasNextPage ? (
        <button className="padPagination--button">
          <Link to={`/${nextLink}`}>
            <MdNavigateNext />
          </Link>
        </button>
      ) : (
        <button disabled className="padPagination--button">
          <MdNavigateNext />
        </button>
      )}
    </div>
  );
};

export default PadPagination;
