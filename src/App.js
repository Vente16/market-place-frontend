import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Products from './pages/Products';
import DetailProduct from './pages/DetailProduct';
import SearchProduct from './pages/SerachProduct';

function App() {
  return (
    <Router>
      <Switch>
          <Route exact path="/:category?" component={Products}></Route>
          <Route exact path="/search/:word?" component={SearchProduct}></Route>
          <Route exact path="/detail/:id?" component={DetailProduct}></Route>
      </Switch>
    </Router>

  );
}

export default App;
