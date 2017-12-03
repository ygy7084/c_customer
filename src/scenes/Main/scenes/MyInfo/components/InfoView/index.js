import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import './styles.css';

const styles = theme => ({
  root: {
    width: '100%',
    position: 'relative',
    margin: 'auto',
    marginBottom: '50px',
  },
  listSection: {
    textAlign: 'center',
    background: 'inherit',
  },
  listItemText: {
    padding: '0',
  },
  subHeader: {
    marginTop: '15px',
    marginBottom: '15px',
  },
  paper: {
    padding: 16,
    [theme.breakpoints.up('md')]: {
      width: '400px',
      margin: '20px auto',
    },
  },
});
class InfoView extends React.Component {
  render() {
    const { classes, customer, nfc, handleLogout, removeNfc } = this.props;
    let place;
    if (nfc) {
      place = nfc.place;
    }
    // LIST로 바꾸자
    return (
      <List subheader className={classes.root}>
        <div className={classes.listSection}>
          <ListSubheader className={classes.subHeader}>
            <Typography type="headline" align="center">
              계정
            </Typography>
          </ListSubheader>
          {
            customer ?
              <div>
                <ListItem button>
                  <ListItemText
                    className={classes.listItemText}
                    primary="이름"
                    secondary={customer.name || ''}
                  />
                </ListItem>
                <ListItem button>
                  <ListItemText
                    className={classes.listItemText}
                    primary="전화번호"
                    secondary={customer.phone || ''}
                  />
                </ListItem>
                {
                  customer ?
                    <ListItem>
                      <Button
                        color="primary"
                        style={{ margin: 'auto' }}
                        onClick={handleLogout}
                      >
                        로그아웃
                      </Button>
                    </ListItem> : null
                }
              </div> :
              <ListItem>
                <ListItemText
                  className={classes.listItemText}
                  primary="로그인 안됨"
                />
              </ListItem>
          }
        </div>
        <Divider />
        <div className={classes.listSection}>
          <ListSubheader className={classes.subHeader}>
            <Typography type="headline" align="center">
              주문
            </Typography>
          </ListSubheader>
          {
            place ?
              <div>
                <ListItem button>
                  <ListItemText
                    className={classes.listItemText}
                    primary="기본 주문 장소"
                    secondary={place ? place.name : ''}
                  />
                </ListItem>
                <ListItem>
                  <Button
                    color="primary"
                    style={{ margin: 'auto' }}
                    onClick={removeNfc}
                  >
                    데이터 삭제
                  </Button>
                </ListItem>
              </div> :
              <ListItem>
                <ListItemText
                  className={classes.listItemText}
                  primary="데이터 없음"
                />
              </ListItem>
          }
        </div>
        <Divider />
      </List>
    );
  }
}
InfoView.propTypes = {
  customer: PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.string,
    rewards: PropTypes.array,
    _id: PropTypes.string,
  }),
  nfc: PropTypes.shape({
    name: PropTypes.string,
    place: PropTypes.object,
    shop: PropTypes.object,
    _id: PropTypes.string,
  })
};
InfoView.defaultProps = {
  customer: undefined,
  nfc: undefined,
};
export default withStyles(styles)(InfoView);
