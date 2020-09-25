import React from 'react';
import ReactDOM from 'react-dom';
import fetch from 'isomorphic-fetch';

const Posts = () => {

  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => setPosts(data.slice(0, 10)));
  }, [])

  return (
    <div>
      <h2>Post section</h2>
      <ul>
        {posts
          .map(post => <li key={post.id}>{post.title}</li>)}
      </ul>
    </div>
  )
}

const Todo = props => {
  const [todo, setTodo] = React.useState({});

  React.useEffect(() => {
    if (props.timeout) {
      setTimeout(() => {
        fetch('https://jsonplaceholder.typicode.com/todos/' + props.id)
          .then(response => response.json())
          .then(data => setTodo(data));
      }, props.timeout)
    } else {
      fetch('https://jsonplaceholder.typicode.com/todos/' + props.id)
        .then(response => response.json())
        .then(data => setTodo(data));
    }

      console.log('mounted', props.id)
  }, [])

  return (
    <div>
      <p>{todo.title}</p>
    </div>
  )
}

const App = () => (
  <>
    <h2>Todos:</h2>
    <React.SuspenseList revealOrder="backwards">
      <React.Suspense fallback={<h1>Loading todo 1...</h1>}>
        <Todo id={1} timeout={1000} />
      </React.Suspense>
      <React.Suspense fallback={<h1>Loading todo 2...</h1>}>
        <Todo id={2} />
      </React.Suspense>
      <React.Suspense fallback={<h1>Loading todo 3...</h1>}>
        <Todo id={3} />
      </React.Suspense>
      <React.Suspense fallback={<h1>Loading todo 4...</h1>}>
        <Todo id={4} />
      </React.Suspense>
    </React.SuspenseList>
  </>
);

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(<App />);