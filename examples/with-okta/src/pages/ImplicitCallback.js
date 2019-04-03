import React, { Component } from 'react';
// import { Redirect } from 'react-router';
import { withAuth } from '@okta/okta-react';

export default withAuth(class ImplicitCallback extends Component {
  state = {
    authenticated: null,
    error: null
  };

  async componentDidMount() {
    try {
      const authResponse = await this.props.auth.handleAuthentication();
      console.log(authResponse)
    } catch (e) {
      console.log('erro:', e);
    }
  }

  render() {
    return <h1>The Okta callback</h1>
  }
});

// export default withAuth(class ImplicitCallback extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       authenticated: null,
//       error: null
//     };
//   }

//   componentDidMount() {
//     this.props.auth.handleAuthentication()
//     .then(() => this.setState({ authenticated: true }))
//     .catch(err => this.setState({ authenticated: false, error: err.toString() }));
//   }

//   render() {
//     if (this.state.authenticated === null) {
//       return null;
//     }

//     const referrerKey = 'secureRouterReferrerPath';
//     const location = JSON.parse(localStorage.getItem(referrerKey) || '{ "pathname": "/" }');
//     localStorage.removeItem(referrerKey);

//     return this.state.authenticated ?
//       <Redirect to={location}/> :
//       <p>{this.state.error}</p>;
//   }
// });
