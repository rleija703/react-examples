import React, { useRef, useLayoutEffect } from 'react';

const App = () => {
  const h1Ref = useRef<HTMLHeadingElement>(null);

  console.log(h1Ref)

  useLayoutEffect(() => {
    console.log(h1Ref);
  })

  return (
    <h1 ref={h1Ref}>App</h1>
  )
}

export default App;