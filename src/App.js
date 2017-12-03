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
import * as firebase from 'firebase';
import * as noticeDialogActions from './data/noticeDialog/actions';
import Main from './scenes/Main';
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
  render() {
    const { noticeDialog, loader } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <div style={{ height: '100%' }}>
          <Route
            path="/"
            render={
              props => <Main {...props} />}
          />
          <SimpleMessage />
          <NoticeDialog
            open={noticeDialog.open}
            onClose={this.props.noticeDialogOff}
            title={noticeDialog.title}
            text={noticeDialog.text}
            onConfirm={noticeDialog.onConfirm}
          />
          {
            loader ?
              <Loader /> : null
          }
        </div>
      </MuiThemeProvider>
    );
  }
}
const mapStateToProps = state => ({
  noticeDialog: state.data.noticeDialog,
  loader: state.data.loader,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  noticeDialogOn: noticeDialogActions.on,
  noticeDialogOff: noticeDialogActions.off,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(App));
