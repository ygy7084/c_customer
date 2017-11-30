import React from 'react';
import Dialog, { DialogTitle, DialogContent, DialogActions } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

class NfcConfirm extends React.Component {
  render() {
    const {
      open, onClose, nfc, shop, onConfirm, onNotConfirm
    } = this.props;
    if (nfc && nfc.place) {
      return (
        <Dialog
          open={open}
          onRequestClose={onClose}
        >
          <DialogTitle>
            { shop ? `${shop.name}` : '알림' }
          </DialogTitle>
          <DialogContent>
            <Typography type="title">
              감사합니다.
            </Typography>
            <Typography type="subheading">
              <strong>{`${nfc.place.name}`}</strong>으로 주문하시는 것이 맞습니까?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              raised
              color="primary"
              onClick={onConfirm}
            >
              네
            </Button>
            <Button onClick={onNotConfirm}>
              아니요
            </Button>
          </DialogActions>
        </Dialog>
      );
    }
    return null;
  }
}
export default NfcConfirm;
