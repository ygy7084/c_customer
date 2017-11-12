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
  }
  componentDidMount() {
    this.props.getOrderedRequest()
      .then((data) => {
        if (this.props.getOrdered.status === 'SUCCESS') {
          console.log(this.props.getOrdered);
        } else {
          throw data;
        }
      })
      .catch((data) => {
        console.error(data);
      });
  }
  render() {
    const { datetime, label, orderList } = this.props.getOrdered.ordered;
    return (
      <div>
        <OrderedList
          datetime={datetime}
          label={label}
          list={orderList}
        />
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
