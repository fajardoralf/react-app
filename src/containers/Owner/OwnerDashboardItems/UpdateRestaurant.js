import React, {Component} from 'react';
import { Button, Form, Select } from 'semantic-ui-react'

class UpdateRestaurant extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            address: '',
            postcode: '',
            category: '',
            description: '',
            restaurant_id: 0,
            roleOptions: []
        }
    }

    componentWillMount(){
        fetch('https://review-website-api.herokuapp.com/restaurant/user/' + localStorage.getItem('id'),{
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": "Bearer " + localStorage.getItem("token")
                },
        })
        .then(res => res.json())
        .then(data => {
            let result =  data.rows.map((value) => {
                return ({key: value.restaurant_id, value: value.restaurant_id, text: value.name })
            })
            this.setState({
                roleOptions: result,
                restaurant_id: result.key
            })
            console.log(result.key);
        }).catch(err => {
          console.log(err);
    });
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
          restaurant_id: this.state.restaurant_id
        };
    
        console.log(data);
         fetch("https://review-website-api.herokuapp.com/restaurant/update", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
          },
          body: JSON.stringify(data)
        })
          .then(res => {
            if(res.status === 201){
              this.setState({message: 'Updated restaurant'});
          }else{
              this.setState({message: 'Something went wrong'})
          }
          })
          .then(data => console.log(data))
          .catch(err => console.log(err));
      };

      onRolePick = (e, {value}) => {
        this.setState({restaurant_id: value});
        console.log(value);
      };

    render() {
        return(
            
            <Form onSubmit={this.handleSubmit}>
            <h5>Restaurant</h5>
                <Select onChange={this.onRolePick} placeholder='Select restaurant' label='Role' options={this.state.roleOptions} />
                <br/>
                <Form.Input value={this.state.userName} onChange={(event) => this.setState({name: event.target.value})} icon='user' iconPosition='left' label='Name' placeholder='name' />
                <Form.Input value={this.state.address} onChange={(event) => this.setState({address: event.target.value})} icon='location arrow' iconPosition='left' label='Address' placeholder='address' />
                <Form.Input value={this.state.postcode} onChange={(event) => this.setState({postcode: event.target.value})} icon='map marker' iconPosition='left' label='Postcode' placeholder='postcode' />
                <Form.Input value={this.state.category} onChange={(event) => this.setState({category: event.target.value})} icon='tags' iconPosition='left' label='Category' placeholder='category' />
                <Form.Input value={this.state.description} onChange={(event) => this.setState({description: event.target.value})} icon='book' iconPosition='left' label='Description' placeholder='description' />
            <Button onClick={this.handleSubmit} type='submit' primary>Update</Button>
            <p>{this.state.message}</p>
          </Form>
        )
    }
}

export default UpdateRestaurant;