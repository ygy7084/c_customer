import React from 'react';

class Ordering extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }
  render() {
    const { possible } = this.props;
    return (
      <div>
        <form onSubmit={e => e.preventDefault()}>
          <input
            type="text"
            value={this.state.text}
            onChange={e => this.setState({ text: e.target.value })}
            disabled={!possible}
          />
          <button disabled={!possible} onClick={() => this.props.order(this.state.text)}>주문</button>
        </form>
      </div>
    );
  }
}
export default Ordering;
