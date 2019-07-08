import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

const SingleCat = ({cats, match, history}) => {
  const [cat, setCat] = useState();

  useEffect(() => {
    const {name} = match.params;

    const foundCat = cats.filter(cat => name === cat.slug);

    // Check if cat exists
    if (!foundCat.length) {
      history.push('/');
    }

    // Select cat from list
    setCat(foundCat[0]);
  }, [cat])

  return (
    <div className="card">
      {cat && <img style={{maxWidth: '100%'}} src={cat.picURL} />}
      <div className="card-body">
        <h5 className="card-title">
          Hi my name is, {cat && cat.name}
        </h5>
      </div>
    </div>
  )
}

export default withRouter(SingleCat);