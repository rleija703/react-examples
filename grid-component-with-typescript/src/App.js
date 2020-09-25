import React from "react";
import Grid from "./components/Grid";

const App = () => {
  return (
    <Grid row={true}>
      <Grid column={true} sm={12} md={4}>
        <h1>Column 1</h1>
      </Grid>
      <Grid column={true} sm={12} md={4}>
        <h1>Column 2</h1>
      </Grid>
      <Grid column={true} sm={12} md={4}>
        <h1>Column 3</h1>
      </Grid>
    </Grid>
  );
};

export default App;