import React from 'react';

const Menu = function ({ list, selected, select }) {
  let item = list[3];
  return (
    <div>
      <ul>
        {
          list.map(item =>
            (
              <li key={item.name}>
                <button onClick={() => select(item)}>
                  {item.name} {selected.indexOf(item) > -1 ? '취소' : ''}
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
