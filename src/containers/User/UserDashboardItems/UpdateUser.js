import React, {Component} from 'react';
import { Button, Form, Select } from 'semantic-ui-react'

class UpdateUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
            postcode: '',
            category: '',
            roleValue: '',
            message: '',
            roleOptions: [{key: 'Reviewer', value: '1', text: 'Reviewer'}, {key: 'Owner', value: '2', text: 'Owner'}]
        }
    }

    componentWillMount(){
        console.log(this.props.data[0].username);
    }

    handleSubmit = event => {
        event.preventDefault();
    
        const data = {
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
          role: this.state.roleValue,
          user_id: localStorage.getItem('id')
        };

        console.log(data);
    
         fetch("https://review-website-api.herokuapp.com/user/update", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
          },
          body: JSON.stringify(data)
        })
          .then(res => {
            if(res.status === 201){
                this.setState({message: 'Updated Your User'});
            }else{
                this.setState({message: 'Something went wrong'})
            }
          })
          .catch(err => {
              console.log(err);
            });
      };

      onRolePick = (e, {value}) => {
        this.setState({roleValue: value});
        console.log(value);
      };

    render() {
        return(
            <Form onSubmit={this.handleSubmit}>
                <Form.Input  value={this.state.username} onChange={(event) => this.setState({username: event.target.value})} icon='user' iconPosition='left' label='Username' placeholder='Username' />
                <Form.Input  value={this.state.email} onChange={(event) => this.setState({email: event.target.value})} icon='envelope outline' iconPosition='left' placeholder='Email' label='Email' type='Email' />
                <Form.Input  value={this.state.password} onChange={(event) => this.setState({password: event.target.value})} icon='lock' iconPosition='left' label='Password' placeholder='Password' type='password' />
                <h5>Role</h5>
                <Select onChange={this.onRolePick} placeholder='Select your role' label='Role' options={this.state.roleOptions} />
            <       Button onClick={this.handleSubmit} content='Login' primary />
                        <p>{this.state.message}</p>
          </Form>
        )
    }
}

export default UpdateUser;