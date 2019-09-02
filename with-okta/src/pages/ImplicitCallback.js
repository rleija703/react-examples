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