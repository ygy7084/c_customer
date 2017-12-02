import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';
import { push } from 'react-router-redux';
import Cookies from 'js-cookie';
import TitleBar from '../../components/TitleBar';
import InfoView from './components/InfoView';
import * as nfcActions from '../../data/nfc/actions';
import * as customerActions from '../../data/customer/actions';
import * as noticeDialogActions from '../../../../data/noticeDialog/actions';

class MyInfo extends React.Component {
  constructor(props) {
    super(props);
    this.getNfc = this.getNfc.bind(this);
    this.getCustomer = this.getCustomer.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.removeNfc = this.removeNfc.bind(this);
    const nfcCookie = Cookies.get('nfc');
    if (nfcCookie && nfcCookie !== '') {
      this.getNfc(nfcCookie);
    }
    const customerCookie = Cookies.get('customer');
    if (customerCookie && customerCookie !== '') {
      this.getCustomer(customerCookie);
    }
  }
  getNfc(nfcCookie) {
    this.props.getNfcRequest(nfcCookie)
      .then((data) => {
        if (this.props.getNfc.status === 'FAILURE') {
          throw data;
        }
      })
      .catch((data) => {
        this.props.showError(data);
      });
  }
  getCustomer(customerCookie) {
    this.props.getCustomerRequest(customerCookie)
      .then((data) => {
        if (this.props.getCustomer.status === 'FAILURE') {
          throw data;
        }
      })
      .catch((data) => {
        this.props.showError(data);
      });
  }
  handleLogout() {
    Cookies.remove('customer');
    this.props.getCustomerRequest()
      .then(() => {})
      .catch((data) => {
        this.props.showError(data);
      });
  }
  removeNfc() {
    Cookies.remove('nfc');
    this.props.getNfcRequest()
      .then(() => {})
      .catch((data) => {
        this.props.showError(data);
      });
  }
  render() {
    const { getCustomer, getNfc } = this.props;
    return (
      <div>
        <TitleBar title="내 정보" />
        <InfoView
          customer={getCustomer.customer}
          nfc={getNfc.nfc}
          handleLogout={this.handleLogout}
          removeNfc={this.removeNfc}
        />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  getNfc: state.main.data.nfc.getNfc,
  getCustomer: state.main.data.customer.getCustomer,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: path => push(path),
  noticeDialogOn: noticeDialogActions.on,
  noticeDialogOff: noticeDialogActions.off,
  showError: noticeDialogActions.error,
  getNfcRequest: nfcActions.getNfcRequest,
  getCustomerRequest: customerActions.getCustomerRequest,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyInfo));
