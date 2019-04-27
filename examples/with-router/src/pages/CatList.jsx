import React from 'react';
import { Link } from 'react-router-dom';

import { convertToSlug } from '../utils';

const CatList = props => (
  <React.Fragment>
    <h1>Cat list</h1>
    <ul className="list-group">
      {Array.isArray(props.cats)
        && props.cats
        .map((cat, i) => (
          <Link to={`/cat/${convertToSlug(cat)}`}>
            <li key={`${cat}_${i}`} className="list-group-item">
              {cat}
            </li>
          </Link>
        ))}
    </ul>
  </React.Fragment>
)

export default CatList;