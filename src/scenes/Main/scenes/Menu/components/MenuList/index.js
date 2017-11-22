import React from 'react';
import { withStyles } from 'material-ui/styles';
import List, {
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import FolderIcon from 'material-ui-icons/Folder';
import DeleteIcon from 'material-ui-icons/Delete';
import Divider from 'material-ui/Divider';

const styles = {
  list: {
    marginBottom: '50px',
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
};
const MenuList = ({ list, classes }) => {
  return (
    <List classes={{ root: classes.list }}>
      {
        list.map(item => (
          <ListItem key={item.name} button>
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
