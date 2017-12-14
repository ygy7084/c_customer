import React from 'react';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import Dialog, {
  DialogActions,
  DialogContent,
  withMobileDialog,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Collapse from 'material-ui/transitions/Collapse';
import { MenuItem } from 'material-ui/Menu';
import TextField from 'material-ui/TextField';
import Scroll from 'react-scroll';
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
function initOption(options) {
  return options.filter(o =>
    o.selections && o.selections.length
  ).map(o => ({
    name: o.name,
    selections: [o.selections[0]],
  }));
}
class ItemView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      orderNumber: 1,
      options: [],
    };
    if (this.props.item && this.props.item.options && this.props.item.options.length) {
      this.state.options = initOption(this.props.item.options);
    }
    if (!this.props.item) {
      this.props.requestItem(this.props.match.params.id);
    }
    this.handleOptionChange = this.handleOptionChange.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.item && nextProps.item.options && nextProps.item.options.length) {
      this.setState({ options: initOption(nextProps.item.options) });
    } else {
      this.setState({ options: [] });
    }
    if (this.props.match.params.id !== nextProps.match.params.id) {
      this.props.requestItem(nextProps.match.params.id);
    }
  }
  handleOptionChange(option, e) {
    const options = JSON.parse(JSON.stringify(this.state.options));
    const found = options.find(o => o.name === option.name);
    const foundFromProps = this.props.item.options.find(o => o.name === option.name);
    const foundValue = foundFromProps.selections.find(o => o.name === e.target.value);
    found.selections = [JSON.parse(JSON.stringify(foundValue))];
    this.setState({ options });
  }
  render() {
    const {
      classes, item, goBack, fullScreen, handleStockAdd, handleBuy
    } = this.props;
    let cumulatedPrice = 0;
    let base = 0;
    if (item && item.price) {
      base = item.price;
      this.state.options.forEach((option) => {
        base += option.selections && option.selections.length ? option.selections[0].price : 0;
      });
      cumulatedPrice = base * this.state.orderNumber;
    }
    const order = {
      item,
      number: this.state.orderNumber,
      options: this.state.options,
      basePrice: base,
    };
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
                      type="headline"
                      component="h4"
                      className="cardTitle"
                      gutterBottom
                    >
                      { item.price }원
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
                    orderNumber: e.target.value > 1 ? parseInt(e.target.value, 10) : 1,
                  })}
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  helperText="주문할 개수를 입력하십시요."
                  margin="normal"
                />
                {
                  item && item.options && item.options.length ?
                    item.options.map((i) => {
                      const option = this.state.options.find(o => o.name === i.name);
                      return (
                        <TextField
                          key={i.name}
                          select
                          fullWidth
                          label={i.name}
                          onChange={e => this.handleOptionChange(i, e)}
                          value={option.selections[0].name}
                          margin="normal"
                        >
                          {
                            i.selections ? i.selections.map(o => (
                              <MenuItem key={o.name} value={o.name}>
                                { o.price === 0 ? `${o.name}` : `${o.name} (+${o.price}원)`}
                              </MenuItem>
                            )) : null
                          }
                        </TextField>
                      );
                    }) : null
                }
                <TextField
                  label="가격"
                  fullWidth
                  value={cumulatedPrice}
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
                    onClick={() => handleBuy(order)}
                  >
                    주문
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
                    onClick={() => handleStockAdd(order)}
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
                  주문 시작
                </Button>
              </DialogActions>
          }
        </Dialog>
      </div>
    );
  }
}
export default withMobileDialog()(withStyles(styles)(ItemView));
