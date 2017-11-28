import React from 'react';
import OrderedItem from './components/OrderedItem';

class Order extends React.Component {
  render() {
    const { ordered } = this.props;
    return (
      <div>
        <OrderedItem ordered={ordered} />
      </div>
    );
  }
}
export default Order;
