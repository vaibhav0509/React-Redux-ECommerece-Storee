
import './App.css';
// import Nav from './components/Nav';
import Home from './components/Home';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Cart from './components/Cart';
import { Provider } from 'react-redux';
import store from './store/store';
import Details from './components/Details';



function App() {
  return (
   
    <Router>
      
       <Provider store = {store}>
        <Route path="/" exact component = {Home}/>
        <Route path="/cart" exact component = {Cart}/>
        <Route path="/details/:id" exact component = {Details}/>
        </Provider>

    </Router>
  );
}

export default App;
