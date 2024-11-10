import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [error, setError] = useState(null);

  const fetchSales = async () => {
    try {
      const response = await axios.get('https://evaluaciones-back-web.azurewebsites.net/api/ventas/', {
        headers: {
          accept: 'application/json',
        },
      });
      setSales(response.data.results);
      setError(null);
    } catch (error) {
      setError('Error fetching sales. Please try again.');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []); 

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div className="container mt-5">
      <h2>Ventas</h2>
      <div className="list-group">
        {sales.length > 0 ? (
          sales.map((sale) => (
            <div key={sale.id} className="list-group-item d-flex align-items-center mb-3">

              <img
                src={sale.id_producto.thumbnail}
                alt={sale.id_producto.title}
                className="img-fluid rounded-circle me-3"
                style={{ width: '60px', height: '60px', objectFit: 'cover' }}
              />
              <div>
                <h5>{sale.id_producto.title}</h5>
                <p>Cantidad: {sale.cantidad}</p>
                <p>Total: ${sale.total}</p>
                <p>Fecha: {sale.fecha}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No hay ventas registradas.</p>
        )}
      </div>
    </div>
  );
};

export default Sales;
