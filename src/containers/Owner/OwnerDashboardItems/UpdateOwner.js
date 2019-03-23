import React, {Component} from 'react';
import { Button, Form } from 'semantic-ui-react'

class UpdateOwner extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            address: '',
            postcode: '',
            category: '',
            description: '',
        }
    }

    handleSubmit = event => {
        event.preventDefault();
    
        const data = {
          user_id: localStorage.getItem('id'),
          name: this.state.name,
          address: this.state.address,
          postcode: this.state.postcode,
          category: this.state.category,
          description: this.state.description,
          active: 1
        };
    
        console.log(data);
         fetch("https://review-website-api.herokuapp.com/restaurant/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
          },
          body: JSON.stringify(data)
        })
          .then(res => {
            return res.json();
          })
          .then(data => console.log(data))
          .catch(err => console.log(err));
      };

    render() {
        return(
            <Form onSubmit={this.handleSubmit}>
                <Form.Input value={this.state.userName} onChange={(event) => this.setState({name: event.target.value})} icon='user' iconPosition='left' label='Name' placeholder='name' />
                <Form.Input value={this.state.address} onChange={(event) => this.setState({address: event.target.value})} icon='location arrow' iconPosition='left' label='Address' placeholder='address' />
                <Form.Input value={this.state.postcode} onChange={(event) => this.setState({postcode: event.target.value})} icon='map marker' iconPosition='left' label='Postcode' placeholder='postcode' />
                <Form.Input value={this.state.category} onChange={(event) => this.setState({category: event.target.value})} icon='tags' iconPosition='left' label='Category' placeholder='category' />
                <Form.Input value={this.state.description} onChange={(event) => this.setState({description: event.target.value})} icon='book' iconPosition='left' label='Description' placeholder='description' />
            <Button onClick={this.handleSubmit} type='submit'>Submit</Button>
          </Form>
        )
    }
}

export default UpdateOwner;