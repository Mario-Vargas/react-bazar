import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/items/${search}`);
    }
  };

  return (
    <div className="container text-center mt-5">
      <h1 className="mb-4">Bazar Online</h1>
      <div className="row justify-content-center">
        <div className="col-md-6 col-10">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar productos..."
              aria-label="Buscar productos"
              aria-describedby="button-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="btn btn-primary"
              type="button"
              id="button-search"
              onClick={handleSearch}
            >
              Buscar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
