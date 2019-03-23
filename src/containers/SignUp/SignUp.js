import React, { Component } from 'react';

import { Button, Divider, Form, Grid, Segment, Select } from 'semantic-ui-react'

class SignUp extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            roleValue: "",
            roleOptions: [{key: 'Reviewer', value: '1', text: 'Reviewer'}, {name: 'Owner', value: '2', text: 'Owner'}]
        }
    }

    onButtonClick = e => {
        this.props.history.replace('/signIn');
    }

    onRolePick = (e, {value}) => {
        e.persist();
        this.setState({roleValue: value});
        console.log(this.state.roleValue);
    };
    

  render() {
    return (
      <Segment placeholder>
      <h1>Sign up</h1>
      <Grid columns={2} relaxed='very' stackable>
        <Grid.Column>
          <Form>
            <Form.Input icon='user' iconPosition='left' label='Username' placeholder='Username' />
            <Form.Input icon='envelope outline' iconPosition='left' placeholder='Email' label='Email' type='Email' />
            <Form.Input icon='lock' iconPosition='left' label='Password' placeholder='Password' type='password' />
            <h5>Role</h5>
            <Select onChange={this.onRolePick} placeholder='Select your role' label='Role' options={this.state.roleOptions} />
            
            <Button content='Login' primary />
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