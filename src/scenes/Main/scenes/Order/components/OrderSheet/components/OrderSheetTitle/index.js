import React from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

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
class OrderSheetTitle extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              type="headline"
              align="center"
              color="inherit"
              className={classes.flex}
            >
              주문서
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
export default withStyles(styles)(OrderSheetTitle);
