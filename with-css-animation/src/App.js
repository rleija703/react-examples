import React, { useState } from 'react';
import { Transition, CSSTransition } from 'react-transition-group';
import classNames from 'classnames';

import styles from './App.module.css';

const popUpDefaultStyles = {
  transition: `opacity 300ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 1 },
  entered:  { opacity: 1 },
  exiting:  { opacity: 0 },
  exited:  { opacity: 0 },
};

const Modal = props => (
  <div className={styles.modal} style={props.styles}>
    <div className={styles.modalContent}>
      {props.title && <h4 className={styles.h4}>{props.title}</h4>}
      <p>Animated alert pop up</p>
      <button
        className={classNames(styles.btn, styles.primary)}
        onClick={props.onClose}>
          Close
      </button>
    </div>
  </div>
);

const App = () => {
  const [animate, setAnimate] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const [showModal2, setShowModal2] = useState(false);

  const handleClick = () => setAnimate(!animate);

  const handleShowModalClick = () => setShowModal(!showModal);

  const handleShowModal2Click = () => setShowModal2(!showModal2);

  return (
    <>
      <div className={styles.container}>
        <h4>Make me grow!</h4>
        <button
          onClick={handleClick}
          className={classNames(
            styles.animate,
            animate && styles.grow
          )}>
          Toggle animate value
        </button>
      </div>
      <div className={styles.container}>
        <h4>Regular transition</h4>
        <button onClick={handleShowModalClick}>Show modal</button>
        <Transition in={showModal} timeout={300}>
          {state => (
            <Modal
              title="Transition alert"
              styles={{
                ...popUpDefaultStyles,
                ...transitionStyles[state]
              }}
              onClose={handleShowModalClick}/>
          )}
        </Transition>
      </div>
      <div className={styles.container}>
        <h4>CSS transition</h4>
        <button onClick={handleShowModal2Click}>Show modal 2</button>
        <CSSTransition in={showModal2} timeout={300} classNames="modal2">
          {state => (
            <Modal title="CSS transition alert" onClose={handleShowModal2Click}/>
          )}
        </CSSTransition>
      </div>
    </>
  );
}

export default App;