import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import routes from './routes';

const App = (props) => {
  const [cats, setCats] = useState(['Mr. Bonkers']);
  const [selectedCat, setSelectedCat] = useState();

  return (
    <div className="container p-5">
      <div className="row justify-content-sm-center">
        <div className="col-sm-5">
          <Router>
            {routes.map(({path, Component}, i) => (
              <Route
                key={i}
                exact
                path={path}
                component={() => <Component
                  selectedCat={selectedCat}
                  cats={cats} />} />
            ))}
          </Router>
        </div>
      </div>
    </div>
  )
}

export default App;