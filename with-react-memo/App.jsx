const Greeting = React.memo((props) => {
  console.log('Greeting Comp render')
  return <h1>Hello {props.name}!</h1>
})

function App() {
  const [counter, setCounter] = React.useState(0);

  React.useEffect(() => {
    setInterval(() => {
      setCounter(counter + 1)
    }, 2000);
  }, [])


  console.log('App render')

  return (
    <div className="App">
      <Greeting name="Ruben"/>
    </div>
  );
}