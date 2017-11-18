import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import io from 'socket.io-client';
import OrderedList from './components/OrderedList';
import * as authActions from '../../data/auth/actions';
import * as getOrderedActions from './data/getOrdered/actions';
import * as noticeDialogActions from '../../data/noticeDialog/actions';
import getCookie from '../../modules/getCookie';

let socket;
class Ordered extends React.Component {
  constructor(props) {
    super(props);
    socket = io();
    socket.on('delivered', (_id) => {
      if (getCookie('order') === _id) {
        this.props.authRequest();
      }
    });
    this.handleCancel = this.handleCancel.bind(this);
  }
  componentDidMount() {
    this.props.getOrderedRequest()
      .then((data) => {
        if (this.props.getOrdered.status === 'SUCCESS') {
        } else {
          throw data;
        }
      })
      .catch((data) => {
        console.error(data);
      });
  }
  handleCancel(ordered){
    fetch('/api/order/cancel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        data: { _id: ordered._id },
      }),
    })
      .then((res) => {
        if (res.ok) { this.props.authRequest(); }
        return res.json().then((error) => {
          throw error;
        });
      })
  }
  render() {
    const { datetime, label, products } = this.props.getOrdered.ordered;
    return (
      <div>
        <OrderedList
          datetime={datetime}
          label={label}
          list={products}
        />
        <form onSubmit={e => e.preventDefault()}>
          <button onClick={() => this.handleCancel(this.props.getOrdered.ordered)}>
            주문취소
          </button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  getOrdered: state.ordered.data.getOrdered,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  noticeDialogOn: noticeDialogActions.on,
  noticeDialogOff: noticeDialogActions.off,
  showError: noticeDialogActions.error,
  authRequest: authActions.request,
  getOrderedRequest: getOrderedActions.request,
}, dispatch);
export default (connect(
  mapStateToProps,
  mapDispatchToProps,
)(Ordered));
