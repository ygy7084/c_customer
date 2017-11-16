import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';
import { push } from 'react-router-redux';
import Menu from './components/Menu';
import MenuSelected from './components/MenuSelected';
import Ordering from './components/Ordering';
import * as orderActions from './data/order/actions';
import * as authActions from '../../data/auth/actions';
import * as noticeDialogActions from '../../data/noticeDialog/actions';
import * as productActions from './data/product/actions';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
    };
    this.select = this.select.bind(this);
    this.order = this.order.bind(this);
  }
  componentDidMount() {
    this.props.productRequest()
      .then((data) => {
        if (this.props.product.status === 'SUCCESS') {
        } else {
          throw data;
        }
      })
      .catch((data) => {
        console.error(data);
      });
  }
  select(menu) {
    const index = this.state.selected.indexOf(menu);
    if (index > -1) {
      this.setState((prevState) => {
        const newArr = prevState.selected;
        newArr.splice(index, 1);
        return { selected: newArr };
      });
    } else {
      this.setState(prevState => ({
        selected: [...prevState.selected, menu],
      }));
    }
  }
  order(text) {
    this.props.noticeDialogOn({
      title: '주문하기',
      text,
      onConfirm: () => {
        this.props.orderRequest({
          text,
          selected: this.state.selected,
        })
          .then((data) => {
            if (this.props.order.status === 'SUCCESS') {
              this.props.authRequest();
            } else {
              throw data;
            }
          })
          .catch((data) => {
            console.error(data);
          });
      }
    });
  }
  render() {
    const { changePage } = this.props;
    const { selected } = this.state;
    const { products } = this.props.state.main.data.product;
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <div>
              <h1>마므레</h1>
              <button onClick={() => changePage('/menu')}>접속</button>
            </div>
          )}
        />
        <Route
          path="/menu"
          render={() => (
            <div>
              <Menu list={products} selected={selected} select={this.select} />
              <hr />
              <MenuSelected selected={selected} />
              <hr />
              <Ordering possible={selected.length} order={this.order} />
            </div>
          )}
        />
      </Switch>
    );
  }
}
const mapStateToProps = state => ({
  order: state.main.data.order,
  product: state.main.data.product,
  state
});
const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: path => push(path),
  noticeDialogOn: noticeDialogActions.on,
  noticeDialogOff: noticeDialogActions.off,
  showError: noticeDialogActions.error,
  orderRequest: orderActions.request,
  authRequest: authActions.request,
  productRequest: productActions.request,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main));
