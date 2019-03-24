import React, { Component } from 'react';

import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'

class SignIn extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            role: "",
            activeItem: "",
            message: "",
            data: []
        }
    }

    onSubmitSignIn = e => {
        e.preventDefault();
        fetch('https://review-website-api.herokuapp.com/user/login', {
            method: 'POST',
            body: JSON.stringify({
              "username" : this.state.username,
              "password" : this.state.password
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((res)=> {
            if(res.status === 200){
              this.setState({message: "Login success"});
              return res.json();
            }else{
              this.setState({message: "Wrong username or password"});
              return;
            }
        })
        .then(data =>{
            console.log(data);
            localStorage.setItem('token',data.accessToken);
            localStorage.setItem('id', data.id);
            localStorage.setItem('role', data.role);
            this.setState({role: data.role, data});
            this.props.handleChanged(data.id ,data.role, data.token, data);
            if(data.role === 1) {
              this.props.history.replace('/userDashboard');
            }else{
              this.props.history.replace('/ownerDashboard');
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    handleItemClick = (e, { name }) => 
    this.setState({ activeItem: name });

    onButtonClick = e => {
      this.props.history.replace('/signUp');
  }

  render() {
    return (
      <div>
      <Segment placeholder>
      <h1>Sign In</h1>
      <Grid columns={2} relaxed='very' stackable>
        <Grid.Column>
          <Form onSubmit={this.onSubmitSignIn}>
            <Form.Input value={this.state.userName} onChange={(event) => this.setState({username: event.target.value})} icon='user' iconPosition='left' label='Username' placeholder='username' />
            <Form.Input value={this.state.password} onChange={(event) => this.setState({password: event.target.value})} icon='lock' iconPosition='left' label='Password' type='password' placeholder='password' />
            <Button onClick={this.onSubmitSignIn} content='Login' primary />
            <p>{this.state.message}</p>
          </Form>
        </Grid.Column>
  
        <Grid.Column verticalAlign='middle'>
          <Button onClick={this.onButtonClick} content='Sign up' icon='signup' size='big' />
        </Grid.Column>
      </Grid>
  
      <Divider vertical>Or</Divider>
    </Segment>
    </div>
    );
  }
}

export default SignIn;