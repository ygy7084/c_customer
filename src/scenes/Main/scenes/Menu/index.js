import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Route,
  Switch,
  withRouter,
  Redirect,
} from 'react-router-dom';
import { push } from 'react-router-redux';
import Badge from 'material-ui/Badge';
import DoneIcon from 'material-ui-icons/ShoppingCart';
import IconButton from 'material-ui/IconButton';
import * as noticeDialogActions from '../../../../data/noticeDialog/actions';
import * as productActions from '../../data/product/actions';
import MenuList from './components/MenuList';
import TitleBar from '../../components/TitleBar';
import ItemView from './components/ItemView';
import OrderSheet from './components/OrderSheet';
import configure from '../../../../modules/configure';

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.productRetrieveMany = this.productRetrieveMany.bind(this);
    this.productRetrieveOne = this.productRetrieveOne.bind(this);
    this.handleProductSelect = this.handleProductSelect.bind(this);
    this.handleStockAdd = this.handleStockAdd.bind(this);
    this.handleBuy = this.handleBuy.bind(this);
    this.productRetrieveMany();
  }
  productRetrieveOne(id) {
    this.props.productRetrieveOneRequest(id)
      .then((data) => {
        if (this.props.productRetrieveOne.status === 'FAILURE') {
          throw data;
        }
      })
      .catch((data) => {
        this.props.showError(data);
      });
  }
  productRetrieveMany() {
    this.props.productRetrieveManyRequest()
      .then((data) => {
        if (this.props.productRetrieveMany.status === 'FAILURE') {
          throw data;
        }
      })
      .catch((data) => {
        this.props.showError(data);
      });
  }
  handleProductSelect(product) {
    this.props.changePage(`${this.props.match.url}/${product._id}`);
  }
  handleStockAdd(stock) {
    this.props.handleStockAdd(stock);
    this.props.changePage(`${this.props.match.url}`);
  }
  handleBuy(item) {
    this.props.handleStockAdd(item);
    this.props.changePage(`${this.props.match.url}/ordersheet`);
  }
  render() {
    const {
      changePage,
      match,
      productRetrieveOne,
      productRetrieveMany,
      inStock,
      handleStockCancel,
      handleOrderStart,
    } = this.props;
    let item;
    if (productRetrieveOne.status === 'SUCCESS') {
      item = JSON.parse(JSON.stringify(productRetrieveOne.product));
    }
    if (item && item.pictures) {
      item.pictures = item.pictures.map(src => `${configure.STATIC}${src}`);
    }
    return (
      <div>
        <TitleBar title="메뉴 주문하기" />
        <MenuList
          list={JSON.parse(JSON.stringify(productRetrieveMany.products)).map((item) => {
            const temp = item;
            if (temp.pictures) {
              temp.pictures = temp.pictures.map(src => `${configure.STATIC}${src}`);
            }
            return temp;
          })}
          onClick={this.handleProductSelect}
        />
        <Switch>
          <Route
            path={`${match.url}/ordersheet`}
            render={() => (
              inStock.length ?
                <OrderSheet
                  inStock={inStock}
                  goBack={() => changePage('/menu')}
                  handleStockCancel={handleStockCancel}
                  handleOrderStart={handleOrderStart}
                /> :
                <Redirect to={`${match.url}`} />
            )}
          />
          <Route
            path={`${match.url}/:id`}
            render={({ match }) => (
              <ItemView
                requestItem={this.productRetrieveOne}
                item={item}
                match={match}
                goBack={() => changePage('/menu')}
                handleStockAdd={this.handleStockAdd}
                handleBuy={this.handleBuy}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  order: state.main.data.order.order,
  productRetrieveOne: state.main.data.product.retrieveOne,
  productRetrieveMany: state.main.data.product.retrieveMany,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: path => push(path),
  noticeDialogOn: noticeDialogActions.on,
  noticeDialogOff: noticeDialogActions.off,
  showError: noticeDialogActions.error,
  productRetrieveOneRequest: productActions.retrieveOneRequest,
  productRetrieveManyRequest: productActions.retrieveManyRequest,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu));
