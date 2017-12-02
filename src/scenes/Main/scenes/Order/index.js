import React from 'react';
import TitleBar from '../../components/TitleBar';
import OrderedItem from './components/OrderedItem';

class Order extends React.Component {
  render() {
    const { ordered } = this.props;
    return (
      <div style={{ height: '100%' }}>
        <TitleBar title="주문 내역" />
        <OrderedItem ordered={ordered} />
      </div>
    );
  }
}
export default Order;
