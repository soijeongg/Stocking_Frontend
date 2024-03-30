import React, { useState } from 'react';
import axios from 'axios';
import './OrderForm.css';

const OrderForm = () => {
  const [orderType, setOrderType] = useState('buy'); // 'buy' 또는 'sell'
  const [priceType, setPriceType] = useState('market'); // 'market', 'limit', 'reservation'
  const [price, setPrice] = useState(''); // 지정가격
  const [quantity, setQuantity] = useState(''); // 구매 주식수
  const [ttl, setTTL] = useState(''); // TTL

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/order', {
        orderType,
        priceType,
        price: priceType === 'limit' ? price : undefined,
        quantity,
        ttl: ttl || undefined,
      });
      console.log(response.data);
      // 주문 후 추가적인 작업 수행
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="order-form-container">
      <form onSubmit={handleSubmit} className="order-form">
        <div className="form-section">
          <div id="title">주문</div>
          <button type="button" onClick={() => setOrderType('buy')} disabled={orderType === 'buy'}>
            매수
          </button>
          <button type="button" onClick={() => setOrderType('sell')} disabled={orderType === 'sell'}>
            매도
          </button>
        </div>
        <div className="form-section">
          <button type="button" onClick={() => setPriceType('market')} disabled={priceType === 'market'}>
            시장가
          </button>
          <button type="button" onClick={() => setPriceType('limit')} disabled={priceType === 'limit'}>
            지정가
          </button>
          <button type="button" onClick={() => setPriceType('reservation')} disabled={priceType === 'reservation'}>
            예약주문
          </button>
        </div>
        {priceType !== 'market' && (
          <div className="form-section">
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="지정금액" />
          </div>
        )}
        <div className="form-section">
          <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="구매 주식수" />
        </div>
        <div className="form-section">
          <input type="text" value={ttl} onChange={(e) => setTTL(e.target.value)} placeholder="TTL(2024-01-01)" />
        </div>
        <div className="form-section">
          <button type="submit" className="submit-button">
            주문
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderForm;
