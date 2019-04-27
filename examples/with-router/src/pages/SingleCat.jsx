import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

// import { convertToSlug } from '../utils';

const catPhotos = ['cat-1.jpg', 'cat-2.jpg', 'cat-3.jpg', 'cat-4.jpg'];

const SingleCat = ({cats, match}) => {

  const [catImageSrc, setCatImageSrc] = useState();

  useEffect(() => {
    const catRandomizerNum = Math.floor(Math.random() * (catPhotos.length+1));
    setCatImageSrc(`${catPhotos[catRandomizerNum]}`)
  }, [])

  return (
    <React.Fragment>
      <h3>Hi my name is,</h3>
      <h1>{cats && cats[0]}</h1>
      {catImageSrc && <img src={`/static/imgs/${catImageSrc}`} />}
    </React.Fragment>
  )
}

export default withRouter(SingleCat);