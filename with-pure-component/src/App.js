import React from 'react';

class Greeting extends React.PureComponent {
  render() {
    return <h1>Hi there, my name is {this.props.name}!</h1>
  }
}

class App extends React.Component {

  state = {
    greeted: false,
    name: 'Ruben'
  };

  componentDidMount() {
    this.setState({greeted: true});
  }

  render() {
    return <Greeting name={this.state.name} />
  }
}

export default App;