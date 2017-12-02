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
import io from 'socket.io-client';
import Cookies from 'js-cookie';
import Navigation from './components/Navigation';
import NfcConfirm from './components/NfcConfirm';
import CustomerConfirm from './components/CustomerConfirm';
import Shop from './scenes/Shop';
import Menu from './scenes/Menu';
import MyInfo from './scenes/MyInfo';
import Order from './scenes/Order';
import * as orderActions from './data/order/actions';
import * as shopActions from './data/shop/actions';
import * as nfcActions from './data/nfc/actions';
import * as customerActions from './data/customer/actions';
import * as noticeDialogActions from '../../data/noticeDialog/actions';

let socket;
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
      nfcConfirmShow: false,
      customerConfirmShow: false,
      customerConfirmPhoneRequired: false,
    };
    this.getOrdered = this.getOrdered.bind(this);
    this.getNfc = this.getNfc.bind(this);
    this.getCustomer = this.getCustomer.bind(this);
    this.shopRetrieveOne = this.shopRetrieveOne.bind(this);
    this.inputCustomerPhone = this.inputCustomerPhone.bind(this);
    this.handleNavigationClick = this.handleNavigationClick.bind(this);
    this.handleStockAdd = this.handleStockAdd.bind(this);
    this.handleStockCancel = this.handleStockCancel.bind(this);
    this.handleOrderStart = this.handleOrderStart.bind(this);
    this.handleNfcConfirm = this.handleNfcConfirm.bind(this);
    this.handleNfcNotConfirm = this.handleNfcNotConfirm.bind(this);
    this.handleCustomerConfirm = this.handleCustomerConfirm.bind(this);
    this.handleCustomerNotConfirm = this.handleCustomerNotConfirm.bind(this);
    this.handleOrder = this.handleOrder.bind(this);
    this.shopRetrieveOne();
    const orderCookie = Cookies.get('order');
    if (orderCookie && orderCookie !== '') {
      this.getOrdered(orderCookie);
    }
    const nfcCookie = Cookies.get('nfc');
    if (nfcCookie && nfcCookie !== '') {
      this.getNfc(nfcCookie);
    }
    const customerCookie = Cookies.get('customer');
    if (customerCookie && customerCookie !== '') {
      this.getCustomer(customerCookie);
    }
  }
  getOrdered(orderCookie) {
    this.props.getOrderedRequest(orderCookie)
      .then((data) => {
        if (this.props.getOrdered.status === 'SUCCESS') {
          if (!socket) {
            socket = io();
            socket.on('delivered', (_id) => {
              const orderCookie = Cookies.get('order');
              if (orderCookie === _id) {
                this.getOrdered(orderCookie);
                this.props.changePage('/order');
              }
            });
          }
          if (this.props.getOrdered.ordered.status === 0) {
            this.props.changePage('/order');
          }
        } else if (data.error) {
          throw data;
        }
      })
      .catch((data) => {
        this.props.showError(data);
      });
  }
  getNfc(nfcCookie) {
    this.props.getNfcRequest(nfcCookie)
      .then((data) => {
        if (this.props.getNfc.status === 'FAILURE') {
          throw data;
        }
      })
      .catch((data) => {
        this.props.showError(data);
      });
  }
  getCustomer(customerCookie) {
    this.props.getCustomerRequest(customerCookie)
      .then((data) => {
        if (this.props.getCustomer.status === 'FAILURE') {
          throw data;
        }
      })
      .catch((data) => {
        this.props.showError(data);
      });
  }
  shopRetrieveOne() {
    this.props.getShopRequest()
      .then((data) => {
        if (this.props.getShop.status === 'FAILURE') {
          throw data;
        }
      })
      .catch((data) => {
        this.props.showError(data);
      });
  }
  inputCustomerPhone(phone) {
    this.props.inputCustomerPhoneRequest(phone)
      .then((data) => {
        if (this.props.inputCustomerPhone.status === 'FAILURE') {
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
  handleOrderStart() {
    const { getCustomer, getNfc } = this.props;
    const { customer } = getCustomer;
    const { nfc } = getNfc;
    if (nfc) {
      this.setState({
        nfcConfirmShow: true,
      });
    } else if (customer) {
      this.setState({
        nfcConfirmShow: false,
      });
      this.handleOrder();
    } else {
      this.setState({
        customerConfirmShow: true,
        customerConfirmPhoneRequired: true,
      });
    }
  }
  handleNfcConfirm() {
    const { customer } = this.props.getCustomer;
    if (customer) {
      this.setState({
        nfcConfirmShow: false,
      });
      this.handleOrder();
    } else {
      this.setState({
        nfcConfirmShow: false,
        customerConfirmShow: true,
        customerConfirmPhoneRequired: false,
      });
    }
  }
  handleNfcNotConfirm() {
    Cookies.remove('nfc');
    this.props.getNfcRequest()
      .then(() => {
        const { customer } = this.props.getCustomer;
        if (customer) {
          this.setState({
            nfcConfirmShow: false,
          });
          this.handleOrder();
        } else {
          this.setState({
            nfcConfirmShow: false,
            customerConfirmShow: true,
            customerConfirmPhoneRequired: true,
          });
        }
      })
      .catch((data) => {
        this.props.showError(data);
      });
  }
  handleCustomerConfirm(phone) {
    this.props.inputCustomerPhoneRequest(phone)
      .then((data) => {
        if (this.props.inputCustomerPhone.status === 'FAILURE') {
          throw data;
        } else {
          const customerCookie = Cookies.get('customer');
          if (customerCookie && customerCookie !== '') {
            this.props.getCustomerRequest(customerCookie)
              .then((data) => {
                if (this.props.getCustomer.status === 'FAILURE') {
                  throw data;
                }
                this.setState({
                  customerConfirmShow: false,
                });
                this.handleOrder();
              })
              .catch((data) => {
                this.props.showError(data);
              });
          }
        }
      })
      .catch((data) => {
        this.props.showError(data);
      });
  }
  handleCustomerNotConfirm() {
    this.setState({
      customerConfirmShow: false,
    });
    this.handleOrder();
  }
  handleOrder() {
    const { customer } = this.props.getCustomer;
    const { nfc } = this.props.getNfc;
    let place;
    if (nfc) {
      place = nfc.place || undefined;
    }
    const { shop } = this.props.getShop;
    const products = [];
    let wholePrice = 0;
    this.state.inStock.forEach((o) => {
      const obj = products.find(
        i =>
          i._id === o.item._id &&
          JSON.stringify(i.options) === JSON.stringify(o.options));
      if (obj) {
        obj.number += o.number;
        wholePrice += o.basePrice * o.number;
      } else {
        const options = [];
        o.options.forEach((i) => {
          options.push(i);
        });
        products.push({
          name: o.item.name,
          _id: o.item._id,
          number: o.number,
          price: o.item.price,
          options,
        });
        wholePrice += o.basePrice * o.number;
      }
    });
    this.props.orderRequest({
      shop,
      nfc,
      place,
      customer,
      products,
      wholePrice,
    })
      .then((data) => {
        if (this.props.order.status === 'SUCCESS') {
          this.setState({ inStock: [] });
          const orderCookie = Cookies.get('order');
          this.getOrdered(orderCookie);
        } else {
          throw data;
        }
      })
      .catch((data) => {
        this.props.showError(data);
      });
  }
  render() {
    const { getShop, getOrdered, getNfc } = this.props;
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
                <div style={{ height: '100%' }}>
                  <Item.scene
                    handleStockAdd={Item.name === '메뉴' ? this.handleStockAdd : undefined}
                    handleStockCancel={Item.name === '메뉴' ? this.handleStockCancel : undefined}
                    handleOrderStart={Item.name === '메뉴' ? this.handleOrderStart : undefined}
                    inStock={this.state.inStock}
                    ordered={Item.name === '주문' ? getOrdered.ordered : undefined}
                    shop={getShop.shop}
                  />
                </div>
              )}
            />
          ))
        }
        {
          this.state.nfcConfirmShow ?
            <NfcConfirm
              open
              nfc={getNfc.nfc}
              shop={getShop.shop}
              onClose={() => this.setState({ nfcConfirmShow: false })}
              onConfirm={this.handleNfcConfirm}
              onNotConfirm={this.handleNfcNotConfirm}
            /> : null
        }
        {
          this.state.customerConfirmShow ?
            <CustomerConfirm
              open
              shop={getShop.shop}
              onClose={() => this.setState({ customerConfirmShow: false })}
              onConfirm={this.handleCustomerConfirm}
              onNotConfirm={this.handleCustomerNotConfirm}
              phoneRequired={this.state.customerConfirmPhoneRequired}
            /> : null
        }
      </div>
    );
  }
}
const mapStateToProps = state => ({
  order: state.main.data.order.order,
  getOrdered: state.main.data.order.getOrdered,
  getShop: state.main.data.shop.getShop,
  getNfc: state.main.data.nfc.getNfc,
  getCustomer: state.main.data.customer.getCustomer,
  inputCustomerPhone: state.main.data.customer.inputCustomerPhone,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: path => push(path),
  noticeDialogOn: noticeDialogActions.on,
  noticeDialogOff: noticeDialogActions.off,
  showError: noticeDialogActions.error,
  orderRequest: orderActions.orderRequest,
  getOrderedRequest: orderActions.getOrderedRequest,
  getShopRequest: shopActions.getShopRequest,
  getNfcRequest: nfcActions.getNfcRequest,
  getCustomerRequest: customerActions.getCustomerRequest,
  inputCustomerPhoneRequest: customerActions.inputCustomerPhoneRequest,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main));
