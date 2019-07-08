import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {

  React.useEffect(() => {
    fetch('/api/bypass-example')
      .then(res => res.json())
      .then(data => console.log(data))
  }, [])

  return <h1>Hello world!</h1>;
}

ReactDOM.render(<App />, document.getElementById('root'));