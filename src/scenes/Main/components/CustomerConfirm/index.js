/* global documet */
import React from 'react';
import Dialog, { DialogTitle, DialogContent, DialogActions } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import TextField from 'material-ui/TextField';

class CustomerConfirm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneInput: '',
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
  render() {
    const {
      open, onClose, shop, onConfirm, onNotConfirm, phoneRequired,
    } = this.props;
    return (
      <Dialog
        open={open}
        onRequestClose={onClose}
      >
        <DialogTitle>
          { shop ? `${shop.name}` : '알림' }
        </DialogTitle>
        <DialogContent>
          <Typography type="subheading">
            전화번호를 입력하시면 스마트폰으로 <strong>주문 관련 알림</strong>을 받을 수 있습니다.
          </Typography>
          <FormControl
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
export default CustomerConfirm;
