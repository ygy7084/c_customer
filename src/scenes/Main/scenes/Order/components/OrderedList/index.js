import React from 'react';
import Typography from 'material-ui/Typography';
import OrderedItem from '../OrderedItem';
import './styles.css';

class OrderedList extends React.Component {
  render() {
    return this.props.list.length > 0 ?
      <div className="orderedList">
        {
          this.props.list.map(item => (
            <OrderedItem key={item._id} ordered={item} />
          ))
        }
      </div>
      :
      <div className="noOrderedItem">
        <Typography type="headline" align="center">
          주문 내역이 없습니다.
        </Typography>
      </div>;
  }
}
export default OrderedList;
