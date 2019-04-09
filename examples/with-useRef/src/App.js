import React, { useLayoutEffect, useRef } from 'react';

import styles from './App.module.css';

const App = () => {

  const inputGroupRef = useRef();
  const inputRef = useRef();

  useLayoutEffect(() => {
    const { current  } = inputRef;

    current.addEventListener('focus', () =>
      inputGroupRef.current.classList.add(styles.active))

    current.addEventListener('blur', () =>
      inputGroupRef.current.classList.remove(styles.active))

  }, [])

  return (
    <div className={styles.container}>
      <div ref={inputGroupRef} className={styles.inputGroup}>
        <label className={styles.label}>
          Your name
        </label>
        <input
          ref={inputRef}
          className={styles.input}
          type="text"
          autoComplete="off"/>
        <div className={styles.border}/>
      </div>
    </div>
  )
}

export default App;