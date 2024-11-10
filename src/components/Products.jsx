import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; 
import axios from 'axios';

const Products = () => {
  const { search: initialSearch } = useParams(); 
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(initialSearch || ''); 
  const [totalCount, setTotalCount] = useState(0); 

  const fetchItems = async (query) => {
    try {
      const response = await axios.get(`https://evaluaciones-back-web.azurewebsites.net/api/productos/?search=${query}`);
      setItems(response.data.results);
      setTotalCount(response.data.count); 
      setError(null);
    } catch (error) {
      setError('Error fetching items. Please try again.');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchItems(searchTerm);
  }, [initialSearch]);

  const handleSearch = () => {
    fetchItems(searchTerm);
  };

  return (
    <div className="container mt-5">
      <div className="input-group mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Buscar
        </button>
      </div>

      {error && <p className="text-danger">{error}</p>}

      <h5>
        Resultados de la búsqueda de "{searchTerm}": {totalCount} producto{totalCount !== 1 ? 's' : ''}
      </h5>

      <div className="row">
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item.id} className="col-md-4 col-sm-6 mb-4">

              <Link to={`/item/${item.id}`} className="text-decoration-none">
                <div className="card text-center shadow-sm">
                  <div className="card-body">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="rounded-circle mb-3"
                      style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                    />
                    <h5 className="card-title mb-1">{item.title}</h5>
                    <span className="text-muted">{item.category}</span>
                    <p className="card-text mt-2">{item.description}</p>
                    <h4 className="text-primary fw-bold">${item.price}</h4>
                    <div className="d-flex justify-content-center align-items-center">
                      {Array.from({ length: 5 }, (_, index) => (
                        <i
                          key={index}
                          className={`bi bi-star${index < Math.round(item.rating) ? '-fill text-warning' : ''}`}
                          style={{ fontSize: '1.2em' }}
                        ></i>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p>No se encontraron productos.</p>
        )}
      </div>
    </div>
  );
};

export default Products;
