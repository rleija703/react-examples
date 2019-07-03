import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink } from 'react-router-dom';

const CatList = React.lazy(() => import('./pages/CatList'));
const AddCat = React.lazy(() => import('./pages/AddCat'));
const SingleCat = React.lazy(() => import('./pages/SingleCat'));

const App = () => {
  const [cats, setCats] = useState([]);

  return (
    <div className="container p-5">
      <div className="row justify-content-sm-center">
        <div className="col-sm-5">
        <React.Suspense fallback={<span>Loading...</span>}>
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
            <Switch>
              <Route exact path="/" render={() => <CatList cats={cats}/>} />
              <Route path="/add" render={props => {
                return <AddCat onSubmit={cat => {
                  setCats([...cats, cat])
                  props.history.push('/')
                }} />
              }} />
              <Route exact path="/cat/:name" render={() => <SingleCat cats={cats} />} />
            </Switch>
          </Router>
          </React.Suspense>
        </div>
      </div>
    </div>
  )
}

export default App;