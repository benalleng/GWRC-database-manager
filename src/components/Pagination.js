
import React from 'react';
import { Link } from 'react-router-dom';

const Pagination = ({ postsPerPage, totalPosts, paginate, pageNum }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className='paginate-nav' key={pageNum - 10}>
      <ul className='pagination'>
        {pageNum !== '2' && pageNum !== '1' ? (
          <Link 
            to={'/contacts/1'} 
            onClick={() => paginate(1)}
          >
            {'<<'}
          </Link>
        ) : null}
        {pageNum !== '1' ? (
            <Link 
                to={`/contacts/${pageNum - 1}`} 
                onClick={() => paginate(pageNum - 1)}
            >
            {'<'}
          </Link>
        ) : null}
        {pageNumbers.slice(0, 3).map((number) => (
          <li key={number} className='page-item'>
              <Link
                onClick={() => paginate(number)}
                to={`/contacts/${number}`}
                className='page-link'
              >
              {number}
            </Link>
          </li>
        ))}
        {pageNum > parseInt(3) && pageNum !== `${pageNumbers.length}` ? (
            <>
            <li className='page-indicator' key={pageNum - 2}>. . .</li>
            <li className='page-indicator' key={pageNum - 3}>
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
                    to={`/contacts/${number}`}
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
                to={`/contacts/${parseInt(pageNum, 10) + 1}`}
                onClick={() => paginate(parseInt(pageNum, 10) + 1)}
            >
            {'>'}
            </Link>
        ) : null}
        {pageNum !== `${pageNumbers.length}` && pageNum !== `${(pageNumbers.length - 1)}` ? (
            <Link 
                to={`/contacts/${pageNumbers.length}`}
                onClick={() => paginate(pageNumbers.length)}
                >
            {'>>'}
            </Link>
        ) : null}
        
      </ul>
    </nav>
  );
};

const ResourcesPaginate = ({ postsPerPage, totalPosts, paginate, pageNum }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className='paginate-nav' key={pageNum - 10}>
      <ul className='pagination'>
        {pageNum !== '2' && pageNum !== '1' ? (
          <Link 
            to={'/resources/1'} 
            onClick={() => paginate(1)}
          >
            {'<<'}
          </Link>
        ) : null}
        {pageNum !== '1' ? (
            <Link 
                to={`/resources/${pageNum - 1}`} 
                onClick={() => paginate(pageNum - 1)}
            >
            {'<'}
          </Link>
        ) : null}
        {pageNumbers.slice(0, 3).map((number) => (
          <li key={number} className='page-item'>
              <Link
                onClick={() => paginate(number)}
                to={`/resources/${number}`}
                className='page-link'
              >
              {number}
            </Link>
          </li>
        ))}
        {pageNum > parseInt(3) && pageNum !== `${pageNumbers.length}` ? (
            <>
            <li className='page-indicator' key={pageNum - 2}>. . .</li>
            <li className='page-indicator' key={pageNum - 3}>
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
                    to={`/resources/${number}`}
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
                to={`/resources/${parseInt(pageNum, 10) + 1}`}
                onClick={() => paginate(parseInt(pageNum, 10) + 1)}
            >
            {'>'}
            </Link>
        ) : null}
        {pageNum !== `${pageNumbers.length}` && pageNum !== `${(pageNumbers.length - 1)}` ? (
            <Link 
                to={`/resources/${pageNumbers.length}`}
                onClick={() => paginate(pageNumbers.length)}
                >
            {'>>'}
            </Link>
        ) : null}
        
      </ul>
    </nav>
  );
};

const GrantsPaginate = ({ postsPerPage, totalPosts, paginate, pageNum }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className='paginate-nav' key={pageNum - 10}>
      <ul className='pagination'>
        {pageNum !== '2' && pageNum !== '1' ? (
          <Link 
            to={'/grants/1'} 
            onClick={() => paginate(1)}
          >
            {'<<'}
          </Link>
        ) : null}
        {pageNum !== '1' ? (
            <Link 
                to={`/grants/${pageNum - 1}`} 
                onClick={() => paginate(pageNum - 1)}
            >
            {'<'}
          </Link>
        ) : null}
        {pageNumbers.slice(0, 3).map((number) => (
          <li key={number} className='page-item'>
              <Link
                onClick={() => paginate(number)}
                to={`/grants/${number}`}
                className='page-link'
              >
              {number}
            </Link>
          </li>
        ))}
        {pageNum > parseInt(3) && pageNum !== `${pageNumbers.length}` ? (
            <>
            <li className='page-indicator' key={pageNum - 2}>. . .</li>
            <li className='page-indicator' key={pageNum - 3}>
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
                    to={`/grants/${number}`}
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
                to={`/grants/${parseInt(pageNum, 10) + 1}`}
                onClick={() => paginate(parseInt(pageNum, 10) + 1)}
            >
            {'>'}
            </Link>
        ) : null}
        {pageNum !== `${pageNumbers.length}` && pageNum !== `${(pageNumbers.length - 1)}` ? (
            <Link 
                to={`/grants/${pageNumbers.length}`}
                onClick={() => paginate(pageNumbers.length)}
                >
            {'>>'}
            </Link>
        ) : null}
        
      </ul>
    </nav>
  );
};

export { Pagination, ResourcesPaginate, GrantsPaginate };