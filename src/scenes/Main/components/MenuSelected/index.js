import React from 'react';

const MenuSelected = function ({ selected }) {
  return (
    <div>
      <h4>주문내역</h4>
      <ul>
        {
          selected.map(item =>
            <li key={item.name}>{ item.name }</li>
          )
        }
      </ul>
    </div>
  );
};
export default MenuSelected;
