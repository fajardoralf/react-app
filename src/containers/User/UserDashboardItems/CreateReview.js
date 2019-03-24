import React, {Component} from 'react';
import { Button, Form, Select, Rating } from 'semantic-ui-react'

class CreateReview extends Component {
    constructor(props){
        super(props);
        this.state = {
            restaurant_id: '',
            rating: 0,
            review_text: '',
            roleOptions: [] ,
        }
    }


    componentDidMount(){
        fetch('https://review-website-api.herokuapp.com/restaurant/').then(res => res.json())
        .then(data => {
            let result =  data.rows.map((value) => {
                return ({key: value.restaurant_id, value: value.restaurant_id, text: value.name })
            })

            this.setState({
                roleOptions: result
            })
        }).catch(err => {
          console.log(err);
    });
    }

    handleSubmit = event => {
        event.preventDefault();
    
        const data = {
          user_id: localStorage.getItem('id'),
          restaurant_id: this.state.restaurant_id,
          rating: this.state.rating,
          review_text: this.state.review_text,
          active: 1
        };

        console.log(data);
    
         fetch("https://review-website-api.herokuapp.com/review/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
          },
          body: JSON.stringify(data)
        })
          .then(res => {
            if(res.status === 201){
                this.setState({message: 'Your review was posted'});
            }else{
                this.setState({message: 'Something went wrong'})
            }
          })
          .catch(err => {
              console.log(err);
            });
      };

      onRolePick = (e, {value}) => {
        this.setState({restaurant_id: value});
      };

      onRate = (e,value) => {
        this.setState({rating: value.rating});          
    }

    render() {
        return(
            <Form onSubmit={this.handleSubmit}>
                <h5>Restaurant</h5>
                <Select onChange={this.onRolePick} placeholder='Select restaurant' label='Role' options={this.state.roleOptions} />
                <br/>
                <h5>Rating</h5>
                <Rating onRate={this.onRate} size='large' icon='star' defaultRating={0} maxRating={5} />
                <br/>
                <Form.Input  value={this.state.review_text} onChange={(event) => this.setState({review_text: event.target.value})} icon='envelope outline' iconPosition='left' placeholder='review text' label='Review text' type='review_text' />
            <       Button onClick={this.handleSubmit} content='Create' primary />
                        <p>{this.state.message}</p>
          </Form>
        )
    }
}

export default CreateReview;