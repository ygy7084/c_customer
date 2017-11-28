import React from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Badge from 'material-ui/Badge';
import DoneIcon from 'material-ui-icons/ShoppingCart';
import IconButton from 'material-ui/IconButton';

const styles = theme => ({
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});
const ListBar = ({ classes, inStock, onStockClick }) => {
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography type="title" color="inherit" align="center" className={classes.flex}>
            메뉴 주문하기
          </Typography>
          {
            inStock > 0 ?
              <IconButton onClick={onStockClick}>
                <Badge badgeContent={inStock} color="accent">
                  <DoneIcon />
                </Badge>
              </IconButton> : null
          }
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default withStyles(styles)(ListBar);
