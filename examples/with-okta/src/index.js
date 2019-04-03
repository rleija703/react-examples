import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Security } from '@okta/okta-react';

import App from './App';

const oktaConfig = {
  issuer: 'https://melinguine-code-test.okta.com/',
  redirect_uri: `${window.location.origin}/implicit/callback`,
  client_id: '0oaf1yetrVlOB2rkW356',
};

ReactDOM.render(
  <BrowserRouter>
    <Security {...oktaConfig}>
      <App />
    </Security>
  </BrowserRouter>,
  document.getElementById('root'),
);

if (module.hot) module.hot.accept();