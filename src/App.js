import React from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import blue from 'material-ui/colors/blue';
import red from 'material-ui/colors/red';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Route,
  withRouter,
} from 'react-router-dom';
import * as authActions from './data/auth/actions';
import * as noticeDialogActions from './data/noticeDialog/actions';
import Main from './scenes/Main';
import Ordered from './scenes/Ordered';
import { SimpleMessage } from './components/SimpleMessage';
import NoticeDialog from './components/NoticeDialog';
import Loader from './components/Loader';

const theme = createMuiTheme({
  palette: {
    primary: {
      ...blue,
    },
    error: red,
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.authRequest();
  }
  render() {
    const { noticeDialog, auth } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <div style={{ height: '100%' }}>
          {
            this.props.auth.order ?
              <Route
                path="/"
                render={
                props => <Ordered {...props} order={auth.order} />}
              /> : auth.status === 'INIT' || auth.status === 'WAITING' ?
                null :
                <Route
                  path="/"
                  render={
                  props => <Main {...props} />}
                />
          }
          <SimpleMessage />
          <NoticeDialog
            open={noticeDialog.open}
            onClose={this.props.noticeDialogOff}
            title={noticeDialog.title}
            text={noticeDialog.text}
            onConfirm={noticeDialog.onConfirm}
          />
          {
            this.props.loading ?
              <Loader /> : null
          }
        </div>
      </MuiThemeProvider>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.data.auth,
  noticeDialog: state.data.noticeDialog,
  loading: state.data.loader,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  authRequest: authActions.request,
  noticeDialogOn: noticeDialogActions.on,
  noticeDialogOff: noticeDialogActions.off,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(App));
