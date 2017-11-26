import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';
import { push } from 'react-router-redux';
import OrderIcon from 'material-ui-icons/ShoppingCart';
import MenuIcon from 'material-ui-icons/Menu';
import ShopIcon from 'material-ui-icons/LocationOn';
import MyInfoIcon from 'material-ui-icons/AccountBox';
import Navigation from './components/Navigation';
import Shop from './scenes/Shop';
import Menu from './scenes/Menu';
import MyInfo from './scenes/MyInfo';
import Order from './scenes/Order';
import * as orderActions from './data/order/actions';
import * as shopActions from './data/shop/actions';
import * as authActions from '../../data/auth/actions';
import * as noticeDialogActions from '../../data/noticeDialog/actions';

const navigations = [
  {
    name: '매장',
    path: '/',
    exact: true,
    icon: ShopIcon,
    scene: Shop,
  },
  {
    name: '메뉴',
    path: '/menu',
    icon: MenuIcon,
    scene: Menu,
  },
  {
    name: '주문',
    path: '/order',
    icon: OrderIcon,
    scene: Order,
  },
  {
    name: '나',
    path: '/myinfo',
    icon: MyInfoIcon,
    scene: MyInfo,
  }
];
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inStock: [],
    };
    this.shopRetrieveOne = this.shopRetrieveOne.bind(this);
    this.handleNavigationClick = this.handleNavigationClick.bind(this);
    this.handleStockAdd = this.handleStockAdd.bind(this);
    this.handleStockCancel = this.handleStockCancel.bind(this);
    this.handleOrder = this.handleOrder.bind(this);
    this.shopRetrieveOne();
  }
  shopRetrieveOne() {
    this.props.shopRequest()
      .then((data) => {
        if (this.props.shop.status === 'FAILURE') {
          throw data;
        }
      })
      .catch((data) => {
        this.props.showError(data);
      });
  }
  handleNavigationClick(clicked) {
    this.props.changePage(clicked.path);
  }
  handleStockAdd(stock) {
    const s = stock;
    s.id = new Date().getTime();
    this.setState({
      inStock: this.state.inStock.concat(s),
    });
  }
  handleStockCancel(id) {
    const inStock = JSON.parse(JSON.stringify(this.state.inStock));
    const found = inStock.findIndex(o => o.id === id);
    inStock.splice(found, 1);
    this.setState({
      inStock,
    });
  }
  handleOrder() {
    const products = [];
    this.state.inStock.forEach((o) => {
      const obj = products.find(
        i =>
          i.product._id === o.item._id &&
          JSON.stringify(i.options) === JSON.stringify(o.options));
      if (obj) {
        obj.number += o.number;
      } else {
        const options = [];
        o.options.forEach((i) => {
          options.push(i);
        });
        products.push({
          product: {
            name: o.item.name,
            _id: o.item._id,
          },
          number: o.number,
          options,
        });
      }
    });
    this.props.orderRequest({
      shop: {
        _id: this.props.shop.shop._id,
        name: this.props.shop.shop.name,
      },
      products,
    })
      .then((data) => {
        if (this.props.order.status === 'SUCCESS') {
          this.setState({ inStock: [] });
          this.props.authRequest();
        } else {
          throw data;
        }
      })
      .catch((data) => {
        this.props.showError(data);
      });
  }
  render() {
    const { shop } = this.props;
    return (
      <div style={{ height: '100%' }}>
        <Route render={props => (
          <Navigation
            handleClick={this.handleNavigationClick}
            items={navigations}
            {...props}
          />)}
        />
        {
          navigations.map(Item => (
            <Route
              key={Item.path}
              path={Item.path}
              exact={Item.exact}
              render={() => (
                <div style={{ marginBottom: '56px', height: '100%' }}>
                  <Item.scene
                    handleStockAdd={Item.name === '메뉴' ? this.handleStockAdd : undefined}
                    handleStockCancel={Item.name === '메뉴' ? this.handleStockCancel : undefined}
                    handleOrder={Item.name === '메뉴' ? this.handleOrder : undefined}
                    inStock={this.state.inStock}
                    shop={shop}
                  />
                </div>
              )}
            />
          ))
        }
      </div>
    );
  }
}
const mapStateToProps = state => ({
  order: state.main.data.order,
  shop: state.main.data.shop,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: path => push(path),
  noticeDialogOn: noticeDialogActions.on,
  noticeDialogOff: noticeDialogActions.off,
  showError: noticeDialogActions.error,
  orderRequest: orderActions.request,
  authRequest: authActions.request,
  shopRequest: shopActions.request,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main));
