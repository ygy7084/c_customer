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
      selected: [],
    };
    this.select = this.select.bind(this);
    this.order = this.order.bind(this);
    this.handleNavigationClick = this.handleNavigationClick.bind(this);
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
      }
      ));
    }
  }
  order(text) {
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
  handleNavigationClick(clicked) {
    this.props.changePage(clicked.path);
  }
  render() {
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
              render={() => <div style={{ marginBottom: '56px', height: '100%' }}><Item.scene /></div>}
            />
          ))
        }
      </div>
    );
  }
}
const mapStateToProps = state => ({
  order: state.main.data.order,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: path => push(path),
  noticeDialogOn: noticeDialogActions.on,
  noticeDialogOff: noticeDialogActions.off,
  showError: noticeDialogActions.error,
  orderRequest: orderActions.request,
  authRequest: authActions.request,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main));
