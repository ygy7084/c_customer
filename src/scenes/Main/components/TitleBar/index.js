import React from 'react';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';

const styles = theme => ({
  titleBarWrapper: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
});
const TitleBar = ({ classes, title, align, children }) => (
  <div className={classes.titleBarWrapper}>
    <AppBar position="static" elevation={0}>
      <Toolbar>
        <Typography
          type="title"
          color="inherit"
          align={align || 'center'}
          className={classes.flex}
        >
          { title }
        </Typography>
        { children }
      </Toolbar>
    </AppBar>
  </div>
);
export default withStyles(styles)(TitleBar);
