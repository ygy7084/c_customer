/* global documet */
import React from 'react';
import { withStyles } from 'material-ui/styles';
import Dialog, { DialogTitle, DialogContent, DialogActions, withMobileDialog, } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import MediaQuery from 'react-responsive';
import PhoneForm from '../../components/PhoneForm';

const styles = theme => ({
  notify: {
    [theme.breakpoints.down('md')]: {
      marginTop: '30%',
    },
  },
});
class WebPushPermission extends React.Component {
  render() {
    const {
      open, onClose, fullScreen, classes, allowRequestAgain, requestAgain
    } = this.props;
    return (
      <Dialog
        open={open}
        fullScreen={fullScreen}
      >
        <DialogContent>
          <div className={classes.notify}>
            <Typography
              type="headline"
              align="center"
              gutterBottom
            >
              <strong>푸시 알림 허용</strong>
            </Typography>
            <Typography type="title" align="center">
              주문 알림을 위해 푸시 알림 허용을 부탁드립니다.
            </Typography>
          </div>
        </DialogContent>
        {
          allowRequestAgain ?
            <DialogActions>
              <Button
                color="primary"
                raised
                onClick={requestAgain}
              >
                허용 다시 요청하기
              </Button>
              <Button onClick={onClose}>거부</Button>
            </DialogActions> : null
        }
      </Dialog>
    );
  }
}
export default withMobileDialog()(withStyles(styles)(WebPushPermission));
