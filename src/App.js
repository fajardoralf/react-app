import React, { Component } from 'react';
import './App.css';
import SignIn from './containers/SignIn/SingIn';
import SignUp from './containers/SignUp/SignUp'
import { Menu } from 'semantic-ui-react'
import {Route ,} from 'react-router';
import {BrowserRouter, Link} from 'react-router-dom';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeItem: ""
    }
  }



  handleItemClick = (e, { name }) => 
  this.setState({ activeItem: name })


  render() {
    const { activeItem } = this.state;

    let nav = (<Menu>
    <Menu.Item
      as={Link} to= '/signIn'
      name='Sign In'
      active={activeItem === 'Sign In'}
      onClick={this.handleItemClick}
    >
    </Menu.Item>
    
    <Menu.Item name='Home' 
    active={activeItem === 'Home'} 
    onClick={this.handleItemClick}>
      
    </Menu.Item>

    <Menu.Item
      name='Restaurants'
      active={activeItem === 'Restaurants'}
      onClick={this.handleItemClick}
    >
    </Menu.Item>
    </Menu>);

    return (
      <BrowserRouter>
      <div>
      <h1></h1>
      <ul className="header">{nav}</ul>
      <div className="content">
      <Route exact path="/signIn" render={(props) => <SignIn {...props}  />} />
      <Route exact path="/signUp" render={(props) => <SignUp {...props}  />} />
      </div>
    </div>
    </BrowserRouter>
    );
  }
}

export default App;
