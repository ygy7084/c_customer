import React from 'react';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withMobileDialog,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Collapse from 'material-ui/transitions/Collapse';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import TextField from 'material-ui/TextField';
import Scroll from 'react-scroll'; // Imports all Mixins

import './styles.css';

const { Element, scroller } = Scroll;

const styles = {
  card: {
    width: '100%',
    height: '100%',
  },
  fullWidth: {
    width: '100%',
  },
  content: {
    padding: '0 !important',
    paddingTop: '0',
  },
};
class ItemView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      orderNumber: 1,
    };
    this.props.requestItem(this.props.match.params.id);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.id !== nextProps.match.params.id) {
      this.props.requestItem(nextProps.match.params.id);
    }
  }
  render() {
    const {
      classes, item, goBack, fullScreen,
    } = this.props;
    return (
      <div
        className="cardWrapper"
      >
        <Dialog
          fullScreen={fullScreen}
          open
          onRequestClose={goBack}
        >
          <DialogContent id="dialog" classes={{ root: classes.content }}>
          {
            item ?
              <Card
                className={classes.card}
              >
                <div className="cardImgWrapper">
                  <img
                    className="cardImg"
                    src={item.pictures ? item.pictures[0] : ''}
                    alt={item.name}
                  />
                </div>
                <CardContent>
                  <Typography
                    type="headline"
                    component="h2"
                    className="cardTitle"
                    gutterBottom
                  >
                    { item.name }
                  </Typography>
                  <Typography
                    component="p"
                    className="cardDescription"
                    gutterBottom
                  >
                    { item.description }
                  </Typography>
                </CardContent>
              </Card> : null
          }
            <Collapse
              in={this.state.expanded}
              transitionDuration="auto"
            >
              <CardContent>
                <TextField
                  label="수량"
                  fullWidth
                  value={this.state.orderNumber}
                  onChange={e => this.setState({
                    orderNumber: e.target.value > 1 ? e.target.value : 1,
                  })}
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  helperText="주문할 개수를 입력하십시요."
                  margin="normal"
                />
                <TextField
                  label="가격"
                  fullWidth
                  value={item && item.price ? this.state.orderNumber * item.price : 0}
                  disabled
                  type="number"
                  margin="normal"
                />
              </CardContent>
              <Element name="ele" />
            </Collapse>
          </DialogContent>
          {
            this.state.expanded ?
              <div>
                <DialogActions
                  classes={{
                    action: classes.fullWidth,
                  }}
                >
                  <Button
                    color="accent"
                    raised
                    classes={{
                      root: classes.fullWidth,
                    }}
                  >
                    구매
                  </Button>
                </DialogActions>
                <DialogActions
                  classes={{
                    action: classes.fullWidth,
                  }}
                >
                  <Button
                    color="primary"
                    classes={{
                      root: classes.fullWidth,
                    }}
                    onClick={() => this.setState({ expanded: false })}
                  >
                    취소
                  </Button>
                  <Button
                    color="primary"
                    classes={{
                      root: classes.fullWidth,
                    }}
                    raised
                  >
                    장바구니 추가
                  </Button>
                </DialogActions>
              </div>
              :
              <DialogActions
                classes={{
                  action: classes.fullWidth,
                }}
              >
                <Button
                  color="primary"
                  onClick={goBack}
                  classes={{
                    root: classes.fullWidth,
                  }}
                >
                  뒤로가기
                </Button>
                <Button
                  color="primary"
                  raised
                  onClick={() => {
                    this.setState({ expanded: true });
                    scroller.scrollTo('ele', {
                      duration: 500,
                      delay: 100,
                      smooth: true,
                      containerId: 'dialog',
                    });
                  }}
                  classes={{
                    root: classes.fullWidth,
                  }}
                >
                  구매하기
                </Button>
              </DialogActions>
          }
        </Dialog>
      </div>
    );
  }
}
export default withMobileDialog()(withStyles(styles)(ItemView));
