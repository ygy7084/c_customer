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
  render() {
    const { getCustomer, getNfc } = this.props;
    return (
      <div>
        <TitleBar title="내 정보" />
        <InfoView
          customer={getCustomer.data}
          nfc={getNfc.nfc}
          handleLogout={this.props.handleLogout}
          removeNfc={this.props.removeNfc}
        />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  getNfc: state.main.data.nfc.getNfc,
  getCustomer: state.main.data.customer.get,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: path => push(path),
  noticeDialogOn: noticeDialogActions.on,
  noticeDialogOff: noticeDialogActions.off,
  showError: noticeDialogActions.error,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyInfo));
