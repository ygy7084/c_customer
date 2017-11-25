import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';
import { push } from 'react-router-redux';
import * as noticeDialogActions from '../../../../data/noticeDialog/actions';
import * as productActions from '../../data/product/actions';
import MenuList from './components/MenuList';
import ListBar from './components/ListBar';
import ItemView from './components/ItemView';
import configure from '../../../../modules/configure';

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inStock: 0,
    };
    this.productRetrieveMany = this.productRetrieveMany.bind(this);
    this.productRetrieveOne = this.productRetrieveOne.bind(this);
    this.handleProductSelect = this.handleProductSelect.bind(this);
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
        } else {
          this.setState((prevState) => {
            const { structure } = prevState;
            return { structure };
          });
        }
      })
      .catch((data) => {
        this.props.showError(data);
      });
  }
  handleProductSelect(product) {
    this.props.changePage(`${this.props.match.url}/${product._id}`);
  }
  render() {
    const {
      changePage,
      match,
      productRetrieveOne,
      productRetrieveMany,
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
        <ListBar inStock={this.state.inStock} />
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
        <Route
          path={`${match.url}/:id`}
          render={({ match }) => (
            <ItemView
              requestItem={this.productRetrieveOne}
              item={item}
              match={match}
              goBack={() => changePage('/menu')}
            />
          )}
        />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  order: state.main.data.order,
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
