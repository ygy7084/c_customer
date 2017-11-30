import React from 'react';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import Dialog, {
  DialogTitle,
  DialogActions,
  DialogContent,
  withMobileDialog,
} from 'material-ui/Dialog';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import OrderSheetTitle from './components/OrderSheetTitle';
import OrderItem from './components/OrderItem';
import './styles.css';

const styles = theme => ({
  card: {
    width: '100%',
    height: '100%',
  },
  fullWidth: {
    width: '100%',
  },
  content: {
    padding: '0 !important',
    paddingTop: '0',
    [theme.breakpoints.up('md')]: {
      minWidth: '400px',
    },
  },
  dialogTitle: {
    padding: '0',
  },
});
class OrderSheet extends React.Component {
  render() {
    const {
      classes, goBack, fullScreen, inStock, handleStockCancel, handleOrderStart
    } = this.props;
    let wholePrice = 0;
    inStock.forEach((order) => {
      wholePrice += order.number * order.basePrice;
    });
    return (
      <div
        className="cardWrapper"
      >
        <Dialog
          fullScreen={fullScreen}
          open
          onRequestClose={goBack}
        >
          <DialogTitle classes={{ root: classes.dialogTitle }}>
            <OrderSheetTitle />
          </DialogTitle>
          <DialogContent id="dialog" classes={{ root: classes.content }}>
            {
              inStock && inStock.length ?
                <Card
                  className={classes.card}
                >
                  <CardContent>
                    {
                      inStock.map((o, i) => (
                        <OrderItem
                          key={JSON.stringify(o)}
                          order={o}
                          handleCancel={handleStockCancel}
                        />
                      ))
                    }
                  </CardContent>
                </Card> : null
            }
          </DialogContent>
          <DialogActions
            classes={{
              action: classes.fullWidth,
            }}
          >
            <Typography type="title" align="center">
              {`총액 : ${wholePrice}원`}
            </Typography>
          </DialogActions>
          <DialogActions
            classes={{
              action: classes.fullWidth,
            }}
          >
            <Button
              color="primary"
              onClick={goBack}
              classes={{
                root: classes.fullWidth,
              }}
            >
              뒤로가기
            </Button>
            <Button
              color="primary"
              raised
              classes={{
                root: classes.fullWidth,
              }}
              onClick={handleOrderStart}
              disabled={!inStock.length}
            >
              구매하기
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default withMobileDialog()(withStyles(styles)(OrderSheet));
