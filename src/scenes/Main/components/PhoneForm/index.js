import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import './styles.css';

const styles = theme => ({
  root: {
    borderRadius: '0px',
    minWidth: '0px',
    fontSize: '2rem',
  },
});
const arr = [[1, 2, 3], [4, 5, 6], [7, 8, 9], ['<-', 0, '']];
class PhoneFrom extends React.Component {
  render() {
    const { classes, handleSelect } = this.props;
    return (
      <div className="phoneFormTable">
        {
          arr.map(o => (
            <div key={o.toString()} className="phoneFormRow">
              {
                o.map(i => (
                  <Button
                    key={i}
                    onClick={() => handleSelect(i)}
                    classes={{ root: classes.root }}
                    className="phoneFormButton"
                    raised={i !== ''}
                    color="primary"
                    disabled={i === ''}
                  >
                    {i}
                  </Button>
                ))
              }
            </div>
          ))
        }
      </div>
    );
  }
}
export default withStyles(styles)(PhoneFrom);
