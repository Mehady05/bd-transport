import './App.css';
import MainBg from './components/MainBg/MainBg';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Blog from './components/Blog/Blog';
import Contact from './components/Contact/Login';
import Destination from './components/Destination/Destination';
import { createContext, useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';



export const UserContext = createContext()
function App() {
  const [login, setLogin] = useState({})
  console.log(login)
  return (
    <UserContext.Provider value = {[login, setLogin]}>
    <Router>
      <Switch>
        <PrivateRoute path="/destination">
          <Destination></Destination>
        </PrivateRoute>
        <Route exact path="/">
         <MainBg></MainBg>
        </Route>
        <Route path = "/home">
            <MainBg></MainBg>
        </Route>
        <Route path="/blog">
          <Blog></Blog>
        </Route>
        <Route path="/contact">
          <Contact></Contact>
        </Route>
        <Route path="/login">
          <Contact></Contact>
        </Route>
        
      </Switch>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
