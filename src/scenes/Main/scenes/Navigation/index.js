import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  withRouter,
} from 'react-router-dom';
import { push } from 'react-router-redux';
import update from 'react-addons-update';
import OrderIcon from 'material-ui-icons/ShoppingCart';
import MenuIcon from 'material-ui-icons/Menu';
import ShopIcon from 'material-ui-icons/LocationOn';
import MyInfoIcon from 'material-ui-icons/AccountBox';
import Shop from '../../scenes/Shop';
import Menu from '../../scenes/Menu';
import MyInfo from '../../scenes/MyInfo';
import Order from '../../scenes/Order';
import NavigationButtons from './components/NavigationButtons';
import Layout from './components/Layout';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigations: [
        {
          name: '매장',
          path: '/',
          exact: true,
          icon: ShopIcon,
          scene: Shop,
          badge: null,
        },
        {
          name: '메뉴',
          path: '/menu',
          icon: MenuIcon,
          scene: Menu,
          badge: null,
        },
        {
          name: '주문',
          path: '/order',
          icon: OrderIcon,
          scene: Order,
          badge: null,
        },
        {
          name: '나',
          path: '/myinfo',
          icon: MyInfoIcon,
          scene: MyInfo,
          badge: null,
        },
      ],
      selected: '',
    };
    this.update = this.update.bind(this);
    this.handlePath = this.handlePath.bind(this);
    this.badgeUpdate = this.badgeUpdate.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }
  componentDidMount() {
    this.update(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.update(nextProps);
  }
  update(props) {
    this.setState({
      selected: update(this.state.selected, {
        $set: this.handlePath(this.state.navigations, props.location) || '',
      }),
    });
    this.badgeUpdate('주문', props.numOfStock, 'primary');
  }
  handlePath(navigations, location) {
    let found = navigations.find(i =>
      i.path !== '/' && location.pathname.indexOf(i.path) === 0
    );
    if (!found) found = navigations.find(i => i.path === '/');
    return found.name;
  }
  badgeUpdate(name, content, color) {
    const foundIndex = this.state.navigations.findIndex(o => o.name === name);
    if (foundIndex > -1) {
      let obj = this.state.navigations[foundIndex];
      if (!content || !color) {
        obj = update(obj, {
          badge: { $set: null },
        });
      } else {
        obj = update(obj, {
          badge: {
            $set: {
              content,
              color,
            },
          },
        });
      }
      this.setState({
        navigations: update(
          this.state.navigations, {
            $splice: [[foundIndex, 1, obj]],
          }),
      });
    }
  }
  handleSelect(selected) {
    const found = this.state.navigations.find(o => o.name === selected);
    this.setState({ selected: found });
    this.props.changePage(found.path);
  }
  render() {
    return (
      <Layout>
        <NavigationButtons
          items={this.state.navigations}
          selected={this.state.selected}
          handleSelect={this.handleSelect}
        />
      </Layout>
    );
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: path => push(path),
}, dispatch);
export default withRouter(connect(
  null,
  mapDispatchToProps,
)(Navigation));
