/* global Notification, navigator */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Route,
  withRouter,
} from 'react-router-dom';
import { push } from 'react-router-redux';
import Cookies from 'js-cookie';
import update from 'react-addons-update';
import Shop from './scenes/Shop';
import Menu from './scenes/Menu';
import Order from './scenes/Order';
import MyInfo from './scenes/MyInfo';
import Navigation from './scenes/Navigation';
import NfcConfirm from './components/NfcConfirm';
import CustomerConfirm from './components/CustomerConfirm';
import Layout from './components/Layout';
import WebPushPermission from './components/WebPushPermission';
import * as socketActions from './data/socket/actions';
import * as orderActions from './data/order/actions';
import * as shopActions from './data/shop/actions';
import * as nfcActions from './data/nfc/actions';
import * as customerActions from './data/customer/actions';
import * as webPushActions from './data/webPush/actions';
import * as noticeDialogActions from '../../data/noticeDialog/actions';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inStock: [],
      nfcConfirmShow: false,
      customerConfirmShow: false,
      customerConfirmPhoneRequired: false,
    };
    this.addCustomerWebPush = this.addCustomerWebPush.bind(this);
    this.subscribeWebPush = this.subscribeWebPush.bind(this);
    this.unsubscribeWebPush = this.unsubscribeWebPush.bind(this);
    this.getOrdered = this.getOrdered.bind(this);
    this.getNfc = this.getNfc.bind(this);
    this.getCustomer = this.getCustomer.bind(this);
    this.shopRetrieveOne = this.shopRetrieveOne.bind(this);
    this.inputCustomerPhone = this.inputCustomerPhone.bind(this);
    this.handleStockAdd = this.handleStockAdd.bind(this);
    this.handleStockRemove = this.handleStockRemove.bind(this);
    this.handleOrderStart = this.handleOrderStart.bind(this);
    this.handleNfcConfirm = this.handleNfcConfirm.bind(this);
    this.handleNfcNotConfirm = this.handleNfcNotConfirm.bind(this);
    this.handleCustomerConfirm = this.handleCustomerConfirm.bind(this);
    this.handleCustomerNotConfirm = this.handleCustomerNotConfirm.bind(this);
    this.handleOrder = this.handleOrder.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.removeNfc = this.removeNfc.bind(this);

    this.shopRetrieveOne();
    const nfcId = Cookies.get('nfc');
    if (nfcId && nfcId !== '') {
      this.getNfc(nfcId);
    }
    const customerId = Cookies.get('customer');
    console.log(customerId);
    if (customerId && customerId !== '') {
      // 로그인
      console.log(customerId);
      this.getCustomer(customerId)
        .then(() => {
          // 로그인 후, 주문 내역 로드
          this.getOrdered(customerId);
        });
    }
    const inStockSaved = Cookies.get('inStock');
    if (inStockSaved && inStockSaved !== '') {
      const parsed = JSON.parse(inStockSaved);
      if (Array.isArray(parsed)) {
        this.state.inStock = parsed;
      }
    }
  }
  componentWillUnmount() {
    this.props.socketDisconnect();
  }
  addCustomerWebPush() {
    return new Promise((resolve, reject) => {
      const customer = this.props.getCustomer.data;
      if (
        customer &&
        this.props.webPush.status === webPushActions.SUBSCRIBED && (
          !Array.isArray(customer.webPush) ||
          !customer.webPush.find(o => o.endpoint === this.props.webPush.endpoint)
        )
      ) {
        // 웹 푸시 구독했으나 기존 DB에 없을 시 등록
        return this.props.addCustomerWebPushRequest(customer._id, this.props.webPush.endpoint, this.props.webPush.keys)
          .then((data) => {
            if (this.props.addCustomerWebPush.status === 'SUCCESS') {
              return resolve();
            } else if (data.error) {
              return reject(data);
            }
            return null;
          });
      }
      return resolve();
    });
  }
  subscribeWebPush() {
    return this.props.subscribeWebPush();
  }
  unsubscribeWebPush() {
    this.props.unsubscribeWebPush();
  }
  getOrdered(customerId) {
    this.props.getOrderedRequest(customerId)
      .then((data) => {
        if (this.props.getOrdered.status === 'SUCCESS') {
          if (this.props.getOrdered.ordered.some(o => o.status === 0)) {
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
  getNfc(nfcId) {
    this.props.getNfcRequest(nfcId)
      .then((data) => {
        if (this.props.getNfc.status === 'FAILURE') {
          throw data;
        }
      })
      .catch((data) => {
        this.props.showError(data);
      });
  }
  getCustomer(customerId) {
    // 로그인됨과 동시에 소켓 연결, 웹 푸시 연결
    return new Promise((resolve, reject) => {
      if (customerId) {
        this.props.socketConnectionRequest();
        console.log('start of is Web Push Supprted');
        this.props.isWebPushSupported()
          .then(() => {
            console.log('hi');
            if (this.props.webPush.status === webPushActions.SUPPORTED) {
              this.props.initWebPush()
                .then(() => resolve())
                .catch(() => resolve());
            } else {
              resolve();
            }
          });
      } else {
        resolve();
      }
    })
      .then(() => {
        return this.props.getCustomerRequest(customerId)
          .then((data) => {
            if (this.props.getCustomer.status === 'FAILURE') {
              throw data;
            }
          });
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
  handleStockAdd(stock) {
    const s = stock;
    s.id = new Date().getTime();
    const inStockNew = update(
      this.state.inStock, { $push: [s] });
    this.setState({ inStock: inStockNew });
    Cookies.set('inStock', JSON.stringify(inStockNew));
  }
  handleStockRemove(id) {
    let inStockNew = this.state.inStock;
    if (id) {
      const foundIndex = this.state.inStock.findIndex(o => o.id === id);
      if (foundIndex > -1) {
        inStockNew = update(
          this.state.inStock, { $splice: [[foundIndex, 1]] },
        );
      }
    } else {
      inStockNew = [];
    }
    this.setState({
      inStock: inStockNew,
    });
    Cookies.set('inStock', JSON.stringify(inStockNew));
  }
  // 주문 시작
  handleOrderStart() {
    console.log('handleOrderStart');
    const { getCustomer, getNfc, webPush } = this.props;
    const customer = getCustomer.data;
    const { nfc } = getNfc;
    console.log('before promise');
    new Promise((resolve, reject) => {
      // 웹 푸시 확인 작업 한번 더 시행
      console.log('1');
      if (this.props.webPush.status === webPushActions.UNSUPPORTED) {
        console.log('2');
        return resolve();
      }
      return this.props.isWebPushSupported()
        .then(() => {
          console.log('3');
          console.log(this.props.webPush);
          if (this.props.webPush.status === webPushActions.UNSUPPORTED) {
            return resolve();
          }
          return this.props.initWebPush()
            .then(() => {
              console.log('4');
              return resolve();
            })
            .catch(() => {
              console.log('5');
              return resolve();
            });
        });
    })
      .then(() => {
        console.log('second Promise');
        if (this.props.webPush.status === webPushActions.SUPPORTED) {
          console.log('11');
          return this.props.subscribeWebPush()
            .then(() => {
              console.log('22');
            });
        }
        console.log('33');
        return null;
      })
      .then(() => {
        console.log('third Promise');
        if (![
          webPushActions.SUBSCRIBED,
          webPushActions.DENIED,
          webPushActions.GRANTED,
          webPushActions.UNSUPPORTED,
        ].includes(this.props.webPush.status)) {
          console.log('111');
          // 본 코드 왔을 시, 웹 푸시는 반드시 위의 4가지 중 하나의 상태를 가져야 함.
          throw new Error('주문 준비 취소');
        } else if (customer) {
          return this.addCustomerWebPush();
        }
        return null;
      })
      .then(() => {
        console.log('last promise');
        if (nfc) {
          console.log('nfc');
          // nfc 확인 알림
          this.setState({
            nfcConfirmShow: true,
          });
        } else if (customer) {
          console.log('customer');
          this.handleOrder();
        } else {
          console.log('else');
          // nfc, 고객 정보 없으면 고객 정보 등록 (웹 푸시 불가 시 고객 정보 등록 강제)
          this.setState({
            customerConfirmShow: true,
            customerConfirmPhoneRequired: this.props.webPush.status !== webPushActions.SUBSCRIBED,
          });
        }
      });
  }
  handleNfcConfirm() {
    // nfc 확인 알림 승인 (NFC 위치 정보 맞음)
    const customer = this.props.getCustomer.data;
    if (customer) {
      // 고객 정보 있을 시, 바로 주문
      this.setState({
        nfcConfirmShow: false,
      });
      this.handleOrder();
    } else {
      // 고객 정보 없을 시, 고객 정보 입력 요청
      this.setState({
        nfcConfirmShow: false,
        customerConfirmShow: true,
        customerConfirmPhoneRequired: false,
      });
    }
  }
  handleNfcNotConfirm() {
    // nfc 확인 알림 미승인 (NFC 위치 정보 안맞음);
    Cookies.remove('nfc');
    this.props.getNfcRequest()
      .then(() => {
        const customer = this.props.getCustomer.data;
        if (customer) {
          // 고객 정보 있으면, 바로 주문
          this.setState({
            nfcConfirmShow: false,
          });
          this.handleOrder();
        } else {
          // 고객 정보 없으면 등록 강제
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
          const customerId = Cookies.get('customer');
          if (customerId && customerId !== '') {
            this.getCustomer(customerId)
              .then(() => this.addCustomerWebPush())
              .then(() => {
                this.setState({
                  customerConfirmShow: false,
                });
                this.handleOrder();
              });
          }
        }
      })
      .catch((data) => {
        this.props.showError(data);
      });
  }
  handleCustomerNotConfirm() {
    this.props.makeNonMemberCustomerRequest()
      .then((data) => {
        if (this.props.makeNonMemberCustomer.status === 'FAILURE') {
          throw data;
        } else {
          const customerId = Cookies.get('customer');
          if (customerId && customerId !== '') {
            this.getCustomer(customerId)
              .then(() => this.addCustomerWebPush())
              .then(() => {
                this.setState({
                  customerConfirmShow: false,
                });
                this.handleOrder();
              });
          }
        }
      })
      .catch((data) => {
        this.props.showError(data);
      });
  }
  handleOrder() {
    const customer = this.props.getCustomer.data;
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
    const { endpoint, keys } = this.props.webPush;
    const request = {
      shop,
      nfc,
      place,
      customer,
      products,
      wholePrice,
      endpoint,
      keys,
    };
    this.props.orderRequest(request)
      .then((data) => {
        if (this.props.order.status === 'SUCCESS') {
          this.handleStockRemove();
          this.getOrdered(customer._id);
        } else {
          throw data;
        }
      })
      .catch((data) => {
        this.props.showError(data);
      });
  }
  handleLogout() {
    if (this.props.webPush.status === webPushActions.SUBSCRIBED) {
      // 고객 데이터 내 웹 푸시 데이터 삭제 및 브라우저 웹 푸시 구독 삭제
      // 분기에 따른 다른 작업이 필요치 않기에 비동기 기다릴 필요 없음
      const customer = this.props.getCustomer.data;
      this.props.removeCustomerWebPushRequest(customer._id, this.props.webPush.endpoint);
      this.props.unsubscribeWebPush();
    }
    // 브라우저 내 고객 정보 삭제
    // 쿠키 삭제
    Cookies.remove('customer');
    // 고객 정보 삭제
    this.props.logoutCustomer();
    // 주문 데이터 삭제
    this.props.getOrderedRequest();
    // 소켓 연결 끊기
    this.props.socketDisconnect();
    // 장바구니 삭제
    this.handleStockRemove();
  }
  removeNfc() {
    Cookies.remove('nfc');
    this.props.getNfcRequest()
      .then(() => {})
      .catch(this.props.showError);
  }
  render() {
    const { getShop, getOrdered, getNfc, webPush } = this.props;
    console.log(webPush);
    return (
      <div style={{ height: '100%' }}>
        <Route render={() =>
          <Navigation numOfStock={this.state.inStock.length} />}
        />
        <Route
          path="/"
          exact
          render={props => (
            <Layout>
              <Shop {...props} />
            </Layout>
          )}
        />
        <Route
          path="/menu"
          render={props => (
            <Layout>
              <Menu
                handleStockAdd={this.handleStockAdd}
                shop={getShop.shop}
                {...props}
              />
            </Layout>
          )}
        />
        <Route
          path="/order"
          render={props => (
            <Layout>
              <Order
                inStock={this.state.inStock}
                ordered={getOrdered.ordered}
                handleStockCancel={this.handleStockRemove}
                handleOrderStart={this.handleOrderStart}
                {...props}
              />
            </Layout>
          )}
        />
        <Route
          path="/myinfo"
          render={props => (
            <Layout>
              <MyInfo
                handleLogout={this.handleLogout}
                removeNfc={this.removeNfc}
                {...props}
              />
            </Layout>
          )}
        />
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
        <WebPushPermission
          open={[webPushActions.PROMPT, webPushActions.IDLE].includes(webPush.status)}
          allowRequestAgain={webPush.status === webPushActions.IDLE}
          requestAgain={this.handleOrderStart}
          onClose={this.props.denyWebPush}
        />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  order: state.main.data.order.order,
  getOrdered: state.main.data.order.getOrdered,
  getShop: state.main.data.shop.getShop,
  getNfc: state.main.data.nfc.getNfc,
  getCustomer: state.main.data.customer.get,
  addCustomerWebPush: state.main.data.customer.addWebPush,
  removeCustomerWebPush: state.main.data.customer.removeWebPush,
  inputCustomerPhone: state.main.data.customer.inputPhone,
  makeNonMemberCustomer: state.main.data.customer.makeNonMember,
  socketConnection: state.main.data.socket.connection,
  webPush: state.main.data.webPush,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: path => push(path),
  noticeDialogOn: noticeDialogActions.on,
  noticeDialogOff: noticeDialogActions.off,
  showError: noticeDialogActions.error,
  orderRequest: orderActions.orderRequest,
  getOrderedRequest: orderActions.getOrderedRequest,
  changeOrderedStatus: orderActions.changeStatus,
  getShopRequest: shopActions.getShopRequest,
  getNfcRequest: nfcActions.getNfcRequest,
  getCustomerRequest: customerActions.getRequest,
  logoutCustomer: customerActions.logout,
  addCustomerWebPushRequest: customerActions.addWebPushRequest,
  removeCustomerWebPushRequest: customerActions.removeWebPushRequest,
  inputCustomerPhoneRequest: customerActions.inputPhoneRequest,
  makeNonMemberCustomerRequest: customerActions.makeNonMemberRequest,
  socketConnectionRequest: socketActions.connectionRequest,
  socketDisconnect: socketActions.disconnect,
  subscribeWebPush: webPushActions.subscribeWebPush,
  unsubscribeWebPush: webPushActions.unsubscribeWebPush,
  isWebPushSupported: webPushActions.isWebPushSupported,
  initWebPush: webPushActions.initWebPush,
  denyWebPush: webPushActions.denyWebPush,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main));
