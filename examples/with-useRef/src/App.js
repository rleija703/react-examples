import React, { useLayoutEffect, useRef } from 'react';

import styles from './App.module.css';

const App = () => {

  // Step 1: Create ref object for iput group container.
  // and input field
  const inputGroupRef = useRef();
  const inputRef = useRef();

  // Step 2: Add useLayoutEffect and pass an empty array
  // for it to execute only on componentDidMount lifecycle
  useLayoutEffect(() => {
    const { current  } = inputRef;

    // Step 3: Create functions to handle on focus and on blur
    // event listeners.
    const handleFocus = () => inputGroupRef.current.classList.add(styles.active);
    const handleBlur = () => {
      if (!current.value.length) {
        inputGroupRef.current.classList.remove(styles.active)
      }
    };

    // Step 4: Add event listeners for focus and blur.
    current.addEventListener('focus', handleFocus);
    current.addEventListener('blur', handleBlur);

    // Handle removal of event listeners when
    // component is unmounting.
    return () => {
      current.removeEventListener('focus', handleFocus);
      current.removeEventListener('blur', handleBlur);
    }
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