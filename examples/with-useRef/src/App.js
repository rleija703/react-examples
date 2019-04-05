import React from 'react';

import styles from './App.module.css';

const App = () => {

  return (
    <div className={styles.container}>
      <div className={styles.inputGroup}>
        <label>Your name</label>
        <input placeholder="Your name" />
      </div>
    </div>
  )
}

export default App;