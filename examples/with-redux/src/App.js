import React, { useState } from 'react';
import { connect } from 'react-redux';

const App = (props) => {
  const [catName, setCatName] = useState('');
  return (
    <>
      <div>
        <input
          placeholder="New cat name"
          value={catName}
          onChange={e => setCatName(e.target.value)}/>
      </div>
      <div>
        <button
          onClick={() => {
            if (catName.length) {
              props.dispatch({
                type: 'ADD_CAT',
                payload: catName.trim(),
              });
              setCatName('');
            } else {
              alert('Cat name cannot be empty!')
            }
          }}>
          Add
        </button>
      </div>
      <ul>
        {props.cats.list.map((cat, i) => (
          <li key={i}>{cat}</li>
        ))}
      </ul>
    </>
  );
}

export default connect(state => state)(App)