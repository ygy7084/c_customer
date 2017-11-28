import React from 'react';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import './styles.css';

const styles = theme => ({
  appBarWrapper: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  paper: {
    padding: 16,
    [theme.breakpoints.up('md')]: {
      width: '400px',
      margin: '20px auto',
    },
  },
});
class OrderedItem extends React.Component {
  render() {
    const { classes, ordered } = this.props;
    return (
      <div>
        <div className={classes.appBarWrapper}>
          <AppBar position="static">
            <Toolbar>
              <Typography type="title" color="inherit" align="center" className={classes.flex}>
                주문 내역
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
        <div>
          {
            !ordered ?
              <Typography type="headline" align="center">
                주문 내역이 없습니다.
              </Typography> :
              <Paper
                className={classes.paper}
              >
                <div>
                  {
                    ordered.shop && ordered.shop.name ?
                      <Typography type="title" align="center">
                        {
                          ordered.shop.name
                        }
                      </Typography> : null
                  }
                  {
                    ordered.shop && ordered.shop.phone ?
                      <a href={`tel:+${ordered.shop.phone}`}>
                        <Typography type="subheading" align="center">
                          {
                            ordered.shop.phone
                          }
                        </Typography>
                      </a> : null
                  }
                </div>
                {
                  ordered.products.map((product) => {
                    return (
                      <div key={product._id}>
                        <Typography type="headline" component="h3">
                          {product.name}
                        </Typography>
                        <Typography type="body1" component="p">
                          개수 : {product.number}
                        </Typography>
                        <Typography type="body1" component="p">
                          가격 : {product.price}
                        </Typography>
                        {
                          product.options && product.options.length ?
                            <Typography type="body1" component="p">
                              옵션 : {product.options.map((option) => {
                              const selections = option.selections.map(selection =>
                                `${selection.name}(${selection.price}원)`
                              ).join(', ');
                              return `${option.name}[${selections}]`;
                            }).join(', ')}
                            </Typography> : null
                        }
                      </div>
                    );
                  })
                }
                <Typography type="subheading" align="center">
                  {`총액: ${ordered.wholePrice}`}
                </Typography>
                <Typography type="subheading" align="center">
                  {new Date(ordered.datetime).toLocaleString()}
                </Typography>
                {
                  ordered.status === 0 ?
                    <div className="orderStatus orderStatus_waiting">
                      <Typography type="headline" align="center">
                        준비 중
                      </Typography>
                    </div> :
                  ordered.status === 1 ?
                    <div className="orderStatus orderStatus_complete">
                      <Typography type="headline" align="center">
                        완료
                      </Typography>
                    </div> : null
                }
              </Paper>
          }
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(OrderedItem);
