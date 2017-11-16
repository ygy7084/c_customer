import React from 'react';

const Menu = function ({ list, selected, select }) {
  return (
    <div>
      <ul>
        {
          list.map(item =>
            (
              <li key={item.name}>
                <button onClick={() => select(item.name)}>
                  {item.name} {selected.indexOf(item.name) > -1 ? '취소' : ''}
                </button>
              </li>
            )
          )
        }
      </ul>
    </div>
  );
};
export default Menu;
