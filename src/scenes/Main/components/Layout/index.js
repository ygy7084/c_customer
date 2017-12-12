import React from 'react';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  layout: {
    height: '100%',
  },
});
function Layout({ classes, children }) {
  return (
    <div className={classes.layout}>
      {children}
    </div>
  );
}
export default withStyles(styles)(Layout);
