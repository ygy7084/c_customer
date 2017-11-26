import React from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import './styles.css';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
});
class OrderItem extends React.Component {
  render() {
    const { classes, order, handleCancel } = this.props;
    let option = '';
    if (order.options && order.options.length) {
      order.options.forEach((o, i) => {
        option = `${option} ${o.name}(${o.selections.map(o => o.name).toString()})`;
        if (i < order.options.length - 1) {
          option = `${option},`;
        }
      });
    }
    return (
      <Paper className={classes.root}>
        <Typography type="headline" component="h3" >
          {order.item.name}
        </Typography>
        <Typography type="body1" component="p">
          {order.item.category}
        </Typography>
        <Typography type="body1" component="p">
          개수 : {order.number}
        </Typography>
        {
          option !== '' ?
            <Typography type="body1" component="p">
              옵션 : {option}
            </Typography> : null
        }
        <Typography type="body1" component="p">
          가격 : {order.basePrice * order.number}
        </Typography>
        <div className="cancelButtonWrapper">
          <Button
            raised
            color="accent"
            onClick={() => handleCancel(order.id)}
          >
            취소하기
          </Button>
        </div>
      </Paper>
    );
  }
}
export default withStyles(styles)(OrderItem);
