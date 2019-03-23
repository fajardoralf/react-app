import React, { Component } from 'react';

import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'

class SignIn extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            role: ""
        }
    }

    handleInputChange = e => {
        const {value, name} = e.target;
        this.setState({
            [name]: value,
        });
    }

    onButtonClick = () =>{
      this.props.history.replace('/signUp');
    }


    onSubmitSignIn = e => {
        e.preventDefault();
        fetch('https://review-website-api.herokuapp.com/user/login', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((res)=> {
            if(res.status === 200) {
                return res.json();
            }else {
                const error = new Error(res.error);
                throw error;
            }
        })
        .then(data =>{
            localStorage.setItem('token',data.accessToken);
            localStorage.setItem('id', data.id);
            localStorage.setItem('role', data.role);
            this.setState({role: data.role});
            console.log(data);
            //this.props.roleChange(data.role, data.token);
            //this.props.history.replace('/');
        })
        .catch(err => {
            console.log(err);
            alert('error logging in please try again');
        });
    }

  render() {
    return (
      <Segment placeholder>
      <h1>Sign In</h1>
      <Grid columns={2} relaxed='very' stackable>
        <Grid.Column>
          <Form>
            <Form.Input icon='user' iconPosition='left' label='Username' placeholder='Username' />
            <Form.Input icon='lock' iconPosition='left' label='Password' type='password' />
            <Button content='Login' primary />
          </Form>
        </Grid.Column>
  
        <Grid.Column verticalAlign='middle'>
          <Button onClick={this.onButtonClick} content='Sign up' icon='signup' size='big' />
        </Grid.Column>
      </Grid>
  
      <Divider vertical>Or</Divider>
    </Segment>
    );
  }
}

export default SignIn;