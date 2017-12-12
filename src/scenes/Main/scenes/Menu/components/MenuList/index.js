import React from 'react';
import { withStyles } from 'material-ui/styles';
import List, {
  ListItem,
  ListItemText,
} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

const styles = theme => ({
  list: {
    paddingTop: '0px',
    marginBottom: '50px',
    [theme.breakpoints.up('md')]: {
      width: '500px',
      margin: 'auto',
    },
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
});
const MenuList = ({ list, classes, onClick, }) => {
  return (
    <List classes={{ root: classes.list }}>
      {
        list.map(item => (
          <ListItem
            key={item.name}
            button
            onClick={() => onClick(item)}
          >
            <Avatar
              alt="사진"
              src={item.pictures ? item.pictures[0] : null}
              className={classes.bigAvatar}
            />
            <ListItemText
              primary={item.name}
              secondary={item.subDescription}
            />
          </ListItem>
        ))
      }
    </List>
  );
};
export default withStyles(styles)(MenuList);
