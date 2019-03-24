import React, { Component } from 'react';
import './App.css';
import SignIn from './containers/SignIn/SingIn';
import SignUp from './containers/SignUp/SignUp';
import UserDashBoard from './containers/User/UserDashBoard';
import OwnerDashboard from './containers/Owner/OwnerDashboard';
import CreateRestaurants from './containers/Owner/OwnerDashboardItems/CreateRestaurants';

import { Menu } from 'semantic-ui-react'
import {Route} from 'react-router';
import {BrowserRouter, Link} from 'react-router-dom';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeItem: "",
      id: 0,
      role: 0,
      token: '',
      data: []
    }
  }

  componentDidMount(){
  }

  handleChanged = (id,role, token, data) => {
    this.setState(()=> ({id,role,token, data}))
  }

  handleItemClick = (e, { name }) => 
  this.setState({ activeItem: name })

  handleLogOut = () => {
    this.setState({role: 0})
  }

  getData = () => {
    return this.state.id;
  }


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

    if(parseInt(this.state.role) === 1) {
      nav = (
        <Menu>
      <Menu.Item name='Home' 
      active={activeItem === 'Home'} 
      onClick={this.handleItemClick}>
      </Menu.Item>

      <Menu.Item name='Userdashboard'
      as={Link} to='/userDashboard' 
      active={activeItem === 'Userdashboard'} 
      onClick={this.handleItemClick}>
      </Menu.Item>
      
      <Menu.Item
      name='Log out'
      active={activeItem === 'Log out'}
      onClick={this.handleItemClick}
    >
    </Menu.Item>
    </Menu>
      );
    }
    else if(parseInt(this.state.role) === 2){
      nav = (
        <Menu>
        <Menu.Item name='Home' 
        active={activeItem === 'Home'} 
        onClick={this.handleItemClick} />

      <Menu.Item name='OwnerDashboard'
      as={Link} to='/OwnerDashboard' 
      active={activeItem === 'OwnerDashboard'} 
      onClick={this.handleItemClick}>
      </Menu.Item>

     <Menu.Item
      as={Link} to='/signIn'
      name='Log Out'
      active={activeItem === 'Log out'}
      onClick={this.handleLogOut}
     >
    </Menu.Item>
        </Menu>);
    }

    return (
      
      <BrowserRouter>
      <div>
      <ul className="header">{nav}</ul>
      <div className="content">
      <Route exact path="/signIn" render={(props) => <SignIn {...props} handleChanged={this.handleChanged} />} />
      <Route exact path="/signUp" render={(props) => <SignUp {...props}  />} />
      <Route exact path="/userDashboard" render={(props) => <UserDashBoard {...props} getData={this.getData} />} />
      <Route exact path="/ownerDashboard" render={(props) => <OwnerDashboard {...props}  getData={this.getData}/>} />
      <Route exact path="/ownerDashboard/CreateRestaurants" render={(props) => <CreateRestaurants {...props}  getData={this.getData}/>} />
      </div>
    </div>
    </BrowserRouter>
    );
  }
}

export default App;
