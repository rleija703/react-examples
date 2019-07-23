import React from 'react';

class Greeting extends React.Component {

  shouldComponentUpdate() {
    console.log('Greeting - should component update lifecycle');

    return false;
  }

  render() {
    console.log('Greeting - render lifecycle')
    return <h1>Hi there, my name is Ruben!</h1>
  }
}

class App extends React.Component {

  state = {
    greeted: false,
  };

  componentDidMount() {
    this.setState({greeted: true});
  }

  render() {
    console.log('App - render lifecycle')
    return <Greeting />
  }
}

export default App;