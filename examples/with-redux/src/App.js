import React from 'react';
import { connect } from 'react-redux';

const App = (props) => {
  console.log(props)

  return <h1>With redux</h1>
}

export default connect(state => state)(App)