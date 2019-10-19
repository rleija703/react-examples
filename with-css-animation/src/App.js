import React, { useState } from 'react';
import classNames from 'classnames';

import styles from './App.module.css';

const App = () => {
  const [animate, setAnimate] = useState(false);

  const handleClick = () => setAnimate(!animate);

  return (
    <button
      onClick={handleClick}
      className={classNames(
        styles.animate,
        animate && styles.grow
      )}>
      Grow this link
    </button>
  );
}

export default App;