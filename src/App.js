import React from 'react';
import './css/style.css';
import './css/lato-font.css';
import TableContainer from './table/TableContainer'
import { Route, Switch} from "react-router-dom";


const App = (props) => (
  <div class = "center"> 
    <Switch>
      <Route exact path='/nbrb/view/table' render={() => <TableContainer />} />
    </Switch>
  </div>
)


export default App;