import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink } from 'react-router-dom';

import routes from './routes';

const App = () => {
  const [cats, setCats] = useState([]);

  return (
    <div className="container p-5">
      <div className="row justify-content-sm-center">
        <div className="col-sm-5">
          <Router>
            <ol className="breadcrumb">
              <NavLink
                to="/"
                className="breadcrumb-item"
                activeClassName="active">
                Home
              </NavLink>
              <NavLink
                to="/add"
                className="breadcrumb-item"
                activeClassName="active">
                Add Cat
              </NavLink>
            </ol>
            {routes.map(({path, Component}, i) => (
              <Route
                key={i}
                exact
                path={path}
                component={({history}) => {
                  return <Component
                  onSubmit={cat => {
                    setCats([...cats, cat])
                    history.push('/')
                  }}
                  cats={cats} />
                }} />
            ))}
          </Router>
        </div>
      </div>
    </div>
  )
}

export default App;