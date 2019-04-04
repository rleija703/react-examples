# With Okta Authentication
Add Okta authentication in your React application
## Setup
- `git clone git@github.com:rleija703/react-examples.git`
- `cd react-examples/examples/with-okta && npm install`
- Create `.env.local` in `with-okta` directory
- Copy your Okta client ID and issuer values inside `.env.local`
```
REACT_APP_OKTA_ISSUER={value}
REACT_APP_OKTA_CLIENT_ID={value}
```
- Run `npm start` to run local development