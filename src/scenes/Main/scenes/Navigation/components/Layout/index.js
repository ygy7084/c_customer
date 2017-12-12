import React from 'react';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  layout: {
    [theme.breakpoints.down('md')]: {
      bottom: '0',
      position: 'fixed',
      width: '100%',
      zIndex: '1000',
    },
  },
});
function Layout({ classes, children }) {
  return (
    <div className={classes.layout}>
      { children }
    </div>
  );
}
export default withStyles(styles)(Layout);
