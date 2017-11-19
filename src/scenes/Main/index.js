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
      }
      ));
    }
  }
  order(text) {
    // 팝업창 오류 때문에 주석처리 후 버튼클릭시 바로 오더 실행되도록 수정
    /*
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
    });*/
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


// ------------------- 중복 데이터 집계 후 반환 함수 -----------------//
//sample data
let original = [
  {
    name : 'dohun',
    age : 26,
    options : [1,2]
  },
  {
    name : 'minkyeong',
    age : 20
  },
  {
    name : 'dohun',
    age : 26,
    options : [1,2]
  },
  {
    name : 'dohun',
    age : 26,
    options : [1,2,3]
  },
  {
    name : 'dohun',
    age : 26
  },
  {
    name : 'dohun',
    age : 26
  },
];

function abbr(arr){
  let empty = [];
// 빈배열 count 초기값
  for(let k =0 ; k<original.length;k++){
    empty.push({obj:'', count:1});
  }
//json 비교 함수
  let compare = function(a, b){
    let i = 0, j;
    if(typeof a == "object" && a){
      if(Array.isArray(a)){
        if(!Array.isArray(b) || a.length != b.length) return false;
        for(j = a.length ; i < j ; i++) if(!compare(a[i], b[i])) return false;
        return true;
      }else{
        for(j in b) if(b.hasOwnProperty(j)) i++;
        for(j in a) if(a.hasOwnProperty(j)){
          if(!compare(a[j], b[j])) return false;
          i--;
        }
        return !i;
      }
    }
    return a === b;
  };
// 배열 요소 중복 체크
  for(let i=0;i<original.length;i++){
    for(let j=i+1;j<original.length;j++){
      if(compare(original[i],original[j])){
        empty[i].obj = original[i];
        empty[i].count++;
        original.splice(j,1);
        j--;
      }
    }
  }
// index에 맞게 obj 처리
  for(let i =0; i<original.length;i++){
    empty[i].obj = original[i];
  }
  empty.splice(original.length, empty.length-original.length);

  return empty;
}

/* 결과 확인
let result = abbr(original);
console.log(result);
*/
