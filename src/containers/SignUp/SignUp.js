import React, { Component } from 'react';

import { Button, Divider, Form, Grid, Segment, Select } from 'semantic-ui-react'


class SignUp extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            roleValue: 0,
            message: "",
            error: false,
            roleOptions: [{key: 'Reviewer', value: '1', text: 'Reviewer'}, {key: 'Owner', value: '2', text: 'Owner'}]
        }
    }

    onButtonClick = e => {
        this.props.history.replace('/signIn');
    }

     onRolePick = (e, {value}) => {
      this.setState({roleValue: value});
      console.log(value);
    };

    handleSubmit = (event) => { 
      event.preventDefault();
      fetch('https://review-website-api.herokuapp.com/user/create', {
       method: 'post',
       headers: {'Content-Type':'application/json'},
       body: JSON.stringify({
        "username": this.state.username,
        "password": this.state.password,
        "email": this.state.email,
        "role": this.state.roleValue,
        "active": 1
       })
      })
      .then((res) => {
          if(res.status === 201){
              this.setState({message: "Registred completed"});
              this.props.history.replace('/signIn');
          }else{
              this.setState({message: "The username or email is already in use"})
          }
      })
      .then(data => console.log(data))
      .catch(err => console.log(err))
     };
    

  render() {
    
    return (
      <Segment placeholder>
      <h1>Sign up</h1>
      <Grid columns={2} relaxed='very' stackable>
        <Grid.Column>
          <Form onSubmit={this.handleSubmit}>
            <Form.Input value={this.state.userName} onChange={(event) => this.setState({username: event.target.value})} icon='user' iconPosition='left' label='Username' placeholder='Username' />
            <Form.Input value={this.state.email} onChange={(event) => this.setState({email: event.target.value})} icon='envelope outline' iconPosition='left' placeholder='Email' label='Email' type='Email' />
            <Form.Input value={this.state.password} onChange={(event) => this.setState({password: event.target.value})} icon='lock' iconPosition='left' label='Password' placeholder='Password' type='password' />
            <h5>Role</h5>
            <Select onChange={this.onRolePick} placeholder='Select your role' label='Role' options={this.state.roleOptions} />
            <br /><br />
            <Button onClick={this.handleSubmit} content='Sign Up' primary />
                <p>{this.state.message}</p>
          </Form>
        </Grid.Column>
        <Grid.Column verticalAlign='middle'>
          <Button onClick={this.onButtonClick} content='Sign In' icon='signup' size='big' />
        </Grid.Column>
      </Grid>
      <Divider vertical>Or</Divider>
    </Segment>
    );
  }
}

export default SignUp;