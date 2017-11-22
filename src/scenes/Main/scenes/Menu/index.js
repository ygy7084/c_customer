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
import configure from '../../../../modules/configure';

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inStock: 0,
    };
  }
  productRequest() {
    this.props.productRequest()
      .then((data) => {
        if (this.props.product.status === 'FAILURE') {
          throw data;
        }
      })
      .catch((data) => {
        this.props.showError(data);
      });
  }
  render() {
    return (
      <div>
        <ListBar inStock={this.state.inStock} />
        <MenuList
          list={JSON.parse(JSON.stringify(this.props.product.products)).map((item) => {
            const temp = item;
            if (temp.pictures) {
              temp.pictures = temp.pictures.map(src => `${configure.STATIC}${src}`);
            }
            return temp;
          })}
        />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  order: state.main.data.order,
  product: state.main.data.product,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: path => push(path),
  noticeDialogOn: noticeDialogActions.on,
  noticeDialogOff: noticeDialogActions.off,
  showError: noticeDialogActions.error,
  productRequest: productActions.request,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu));
