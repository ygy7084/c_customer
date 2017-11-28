import React from 'react';
import { withStyles } from 'material-ui/styles';
import BottomNavigation, { BottomNavigationButton } from 'material-ui/BottomNavigation';

const styles = theme => ({
  root: {
    [theme.breakpoints.down('md')]: {
      bottom: '0',
      position: 'fixed',
      width: '100%',
      zIndex: '1000',
    },
  },
  nav: {
    minWidth: '0',
  },
});
class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.handlePath = this.handlePath.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      selected: this.handlePath(this.props).name || '',
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      selected: this.handlePath(nextProps).name || '',
    });
  }
  handlePath(props) {
    let found = props.items.find(i =>
      i.path !== '/' && props.location.pathname.indexOf(i.path) === 0
    );
    if (!found) found = props.items.find(i => i.path === '/');
    return found;
  }
  handleClick(e, v) {
    this.setState({ selected: v });
    this.props.handleClick(this.props.items.find(i => i.name === v));
  }
  render() {
    const { items, classes } = this.props;
    const { selected } = this.state;
    return (
      <BottomNavigation
        value={selected || items[0].name}
        onChange={this.handleClick}
        className={classes.root}
      >
        {
          items.map(Item => (
            <BottomNavigationButton
              classes={{ root: classes.nav }}
              key={Item.name}
              label={Item.name}
              value={Item.name}
              icon={<Item.icon />}
            />
          ))
        }
      </BottomNavigation>
    );
  }
}
export default withStyles(styles, { withTheme: true })(Navigation);
