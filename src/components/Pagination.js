
import React from 'react';
import { Link } from 'react-router-dom';

const Pagination = ({ postsPerPage, totalPosts, paginate, pageNum }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className='paginate-nav'>
      <ul className='pagination'>
        {pageNum !== '2' && pageNum !== '1' ? (
          <Link 
            to={'/1'} 
            onClick={() => paginate(1)}
          >
            {'<<'}
          </Link>
        ) : null}
        {pageNum !== '1' ? (
            <Link 
                to={`/${pageNum - 1}`} 
                onClick={() => paginate(pageNum - 1)}
            >
            {'<'}
          </Link>
        ) : null}
        {pageNumbers.slice(0, 3).map((number) => (
          <li key={number} className='page-item'>
              <Link
                onClick={() => paginate(number)}
                to={`/${number}`}
                className='page-link'
              >
              {number}
            </Link>
          </li>
        ))}
        {pageNum > parseInt(3) && pageNum !== `${pageNumbers.length}` ? (
            <>
            <li className='page-indicator'>. . .</li>
            <li className='page-indicator'>
                {parseInt(pageNum)}
            </li>
            </>
        ) : null}
        
        {pageNumbers.length > 3 ? (
            pageNumbers.slice(-1).map((number) => (
            <>
            <li key={number - 1} className='page-indicator'>. . .</li>
            <li key={number} className='page-item'>
                <Link
                    to={`/${number}`}
                    onClick={() => paginate(number)}
                    className='page-link'
                    >
                    {number}
                </Link>
            </li>
            </>
        ))) : null}
        {parseInt(pageNum, 10) !== pageNumbers.length ? (
            <Link
                to={`/${parseInt(pageNum, 10) + 1}`}
                onClick={() => paginate(parseInt(pageNum, 10) + 1)}
            >
            {'>'}
            </Link>
        ) : null}
        {pageNum !== `${pageNumbers.length}` && pageNum !== `${(pageNumbers.length - 1)}` ? (
            <Link 
                to={`/${pageNumbers.length}`}
                onClick={() => paginate(pageNumbers.length)}
                >
            {'>>'}
            </Link>
        ) : null}
        
      </ul>
    </nav>
  );
};

export default Pagination;