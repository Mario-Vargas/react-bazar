import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1); 
  const [total, setTotal] = useState(0); 

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(`https://evaluaciones-back-web.azurewebsites.net/api/productos/?id=${id}`);
      const fetchedProduct = response.data.results[0]; 
      setProduct(fetchedProduct);

      const price = parseFloat(fetchedProduct.price);
      if (!isNaN(price)) {
        setTotal(price); 
      } else {
        setError('Precio del producto no válido.');
      }

      setError(null);
    } catch (error) {
      setError('Error fetching product details. Please try again.');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [id]); 

  const handleBuy = async () => {
    const saleData = {
      id_producto: product.id,
      cantidad: quantity,
      fecha: new Date().toISOString().split('T')[0], 
      total: total.toFixed(2), 
      estatus: 1,
    };

    try {
      const response = await axios.post(
        'https://evaluaciones-back-web.azurewebsites.net/api/ventas/',
        saleData,
        {
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFTOKEN': 'JhVtz5nAHu9mTZC6RYxnhB7tfLz6ntENP3epHprlZA71qR8voLEYWBPAk9SdJvm2',
          },
        }
      );
      alert('Compra realizada con éxito');
      console.log('Compra registrada:', response.data);

      navigate('/sales');
    } catch (error) {
      setError('Error al realizar la compra. Intenta nuevamente.');
      console.error(error);
    }
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    setQuantity(newQuantity);

    if (!isNaN(product.price)) {
      setTotal(product.price * newQuantity); 
    } else {
      setError('Precio no válido para calcular el total.');
    }
  };

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="d-flex">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="rounded-circle mb-3"
              style={{ width: '200px', height: '200px', objectFit: 'cover' }}
            />

            <div className="ms-3 d-flex flex-column">
              {product.imagenes && product.imagenes.map((image, index) => (
                <img
                  key={index}
                  src={image.imagen}
                  alt={`Imagen adicional ${index + 1}`}
                  className="img-fluid mb-3"
                  style={{ height: '100px', objectFit: 'cover' }}
                />
              ))}
            </div>
          </div>

          <h5 className="card-title">{product.title}</h5>
          <span className="text-muted">{product.category}</span>
          <p className="card-text mt-2">{product.description}</p>
          <h4 className="text-primary fw-bold">${product.price}</h4>

 
          <div className="d-flex justify-content-center align-items-center mt-3">
            {Array.from({ length: 5 }, (_, index) => (
              <i
                key={index}
                className={`bi bi-star${index < Math.round(product.rating) ? '-fill text-warning' : ''}`}
                style={{ fontSize: '1.5em' }}
              ></i>
            ))}
          </div>

          <div className="mt-4 d-flex justify-content-between align-items-center">
            <label htmlFor="quantity">Cantidad: </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
              className="form-control w-25"
            />
            <span className="ms-2">Total: ${total.toFixed(2)}</span>
          </div>

          <button className="btn btn-success mt-3" onClick={handleBuy}>
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
