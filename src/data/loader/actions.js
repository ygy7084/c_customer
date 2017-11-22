export const ON = 'data/loader/ON';
export const OFF = 'data/loader/OFF';
export const on = () => {
  return {
    type: ON,
  };
};
export const off = () => {
  return {
    type: OFF,
  };
};
