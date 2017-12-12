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
  phoneInput: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  phoneInputNotDesktop: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});
class CustomerConfirm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneInput: '',
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePhoneFormSelect = this.handlePhoneFormSelect.bind(this);
  }
  componentDidMount() {
    const inputField = this.phoneInput;
    inputField.focus();
    this.setState({
      phoneInput: '010',
    });
    inputField.addEventListener('keydown', this.handleSubmit);
  }
  componentWillUnmount() {
    this.phoneInput.removeEventListener('keydown', this.handleSubmit);
  }
  handleInput(e) {
    if (e.target.value.length < 3) {
      this.setState({ phoneInput: '010' });
    } else if (e.target.value.length < 12) {
      this.setState({ phoneInput: e.target.value.replace(/\D/g, '') });
    }
  }
  handleSubmit(e, v) {
    if (e.key === 'Enter') {
      this.props.onConfirm(this.state.phoneInput);
    }
  }
  handlePhoneFormSelect(v) {
    if (Number.isInteger(v) && this.state.phoneInput.length < 11) {
      this.setState({
        phoneInput: `${this.state.phoneInput}${v}`,
      });
    } else if (v === '<-') {
      this.setState({
        phoneInput: this.state.phoneInput.slice(0, -1),
      });
    }
  }
  render() {
    const {
      open, onClose, shop, onConfirm, onNotConfirm, phoneRequired, fullScreen, classes
    } = this.props;
    return (
      <Dialog
        open={open}
        onRequestClose={onClose}
        fullScreen={fullScreen}
      >
        <DialogTitle>
          { shop ? `${shop.name}` : '알림' }
        </DialogTitle>
        <DialogContent>
          <Typography type="subheading">
            <strong>주문 알림</strong>을 받기 위한 번호를 입력 해 주십시요.
          </Typography>
          <FormControl
            className={classes.phoneInput}
            margin="normal"
            required={phoneRequired}
            fullWidth
          >
            <InputLabel htmlFor="phoneInput">전화번호</InputLabel>
            <Input
              id="phoneInput"
              value={this.state.phoneInput}
              onChange={e => this.handleInput(e)}
              inputRef={(r) => { this.phoneInput = r; }}
            />
          </FormControl>
          <Typography
            type="headline"
            className={classes.phoneInputNotDesktop}
            align="center"
            gutterBottom
          >
            {this.state.phoneInput}
          </Typography>
          <div className={classes.phoneInputNotDesktop}>
            <PhoneForm handleSelect={this.handlePhoneFormSelect} />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            raised
            color="primary"
            onClick={() => onConfirm(this.state.phoneInput)}
          >
            입력
          </Button>
          {
            phoneRequired ?
              <Button onClick={onClose}>
                취소
              </Button> :
              <Button onClick={onNotConfirm}>
                입력 안함
              </Button>
          }
        </DialogActions>
      </Dialog>
    );
  }
}
export default withMobileDialog()(withStyles(styles)(CustomerConfirm));
