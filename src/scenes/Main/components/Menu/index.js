import React from 'react';

const Menu = function ({ selected, select }) {
  return (
    <div>
      <ul>
        <li><button onClick={() => select('아메리카노')}>아메리카노 {selected.indexOf('아메리카노') > -1 ? '취소' : ''}</button></li>
        <li><button onClick={() => select('카페라떼')}>카페라떼 {selected.indexOf('카페라떼') > -1 ? '취소' : ''}</button></li>
      </ul>
    </div>
  );
};
export default Menu;
