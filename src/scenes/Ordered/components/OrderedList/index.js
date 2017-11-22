import React from 'react';

const OrderedList = function ({ label, list, datetime }) {
  return (
    <div>
      <h1>주문내역</h1>
      <h2>{ label || '' }</h2>
      <h4>{ datetime ? new Date(datetime).toLocaleString() : ''}</h4>
      <ul>
        {
          list ? list.map(item => (<li key={item.name}>{item.name}</li>)) : null
        }
      </ul>
    </div>
  );
};
export default OrderedList;
