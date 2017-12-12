import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Route,
  withRouter,
  Redirect,
} from 'react-router-dom';
import { push } from 'react-router-redux';
import ShoppingCartIcon from 'material-ui-icons/ShoppingCart';
import IconButton from 'material-ui/IconButton';
import Badge from 'material-ui/Badge';
import * as noticeDialogActions from '../../../../data/noticeDialog/actions';
import TitleBar from '../../components/TitleBar';
import OrderedList from './components/OrderedList';
import OrderSheet from './components/OrderSheet';

class Order extends React.Component {
  constructor(props) {
    super(props);
    this.showOrderSheet = this.showOrderSheet.bind(this);
    if (this.props.inStock.length) {
      this.showOrderSheet();
    }
  }
  showOrderSheet() {
    this.props.changePage(`${this.props.match.url}/ordersheet`);
  }
  render() {
    const {
      ordered,
      match,
      inStock,
      changePage,
      handleStockCancel,
      handleOrderStart,
    } = this.props;
    return (
      <div style={{ height: '100%' }}>
        <TitleBar
          title="주문 내역"
          wrapper={inStock.length}
        />
        {
          inStock.length ?
            <TitleBar>
              <IconButton
                color="contrast"
                onClick={this.showOrderSheet}
              >
                <Badge
                  badgeContent={inStock.length}
                  color="accent"
                >
                  <ShoppingCartIcon
                    aria-label="shopping cart"
                  />
                </Badge>
              </IconButton>
            </TitleBar> : null
        }
        <OrderedList list={ordered} />
        <Route
          path={`${match.url}/ordersheet`}
          render={() => (
            inStock.length ?
              <OrderSheet
                inStock={inStock}
                goBack={() => changePage(`${match.url}`)}
                handleStockCancel={handleStockCancel}
                handleOrderStart={handleOrderStart}
              /> :
              <Redirect to={`${match.url}`} />
          )}
        />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  order: state.main.data.order.order,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: path => push(path),
  noticeDialogOn: noticeDialogActions.on,
  noticeDialogOff: noticeDialogActions.off,
  showError: noticeDialogActions.error,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Order));
