import React from 'react';
import { withStyles } from 'material-ui/styles';
import BottomNavigation, { BottomNavigationButton } from 'material-ui/BottomNavigation';
import Badge from 'material-ui/Badge';

const styles = theme => ({
  nav: {
    minWidth: '0',
  },
});
class Navigation extends React.Component {
  render() {
    const { items, selected, handleSelect, classes } = this.props;
    return (
      <BottomNavigation
        value={selected || items[0].name}
        onChange={(e, v) => handleSelect(v)}
      >
        {
          items.map(Item => (
            <BottomNavigationButton
              classes={{ root: classes.nav }}
              key={Item.name}
              label={Item.name}
              value={Item.name}
              icon={
                Item.badge ?
                  <Badge badgeContent={Item.badge.content} color={Item.badge.color} >
                    <Item.icon />
                  </Badge>
                  :
                  <Item.icon />
              }
            />
          ))
        }
      </BottomNavigation>
    );
  }
}
export default withStyles(styles, { withTheme: true })(Navigation);
