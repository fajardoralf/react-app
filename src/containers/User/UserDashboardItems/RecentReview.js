import React, {Component} from 'react';
import ReviewCard from '../../../components/reviewCards/reviewItem'
import {Grid} from 'semantic-ui-react'

class RecentReview extends Component{
    constructor(){
        super()
        this.state = {
          userReview: [],
      };
      
      }
      
      componentDidMount() {
        this.getUserReview();
      }
      
      getUserReview(){
        fetch('https://review-website-api.herokuapp.com/review/user/' + localStorage.getItem('id'),{
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": "Bearer " + localStorage.getItem("token")
                },
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                userReview: data.rows
            })
        }).catch(err => {
          console.log(err);
    });
    }

    render(){
        

        const reviews = this.state.userReview.map(item => (
            <ReviewCard
                key={item.review_id}
                name={item.name}
                description={item.review_text}
                rating={item.rating}
                updated={item.updated_at}
            />
      ));

            console.log(this.state.userReview);
        return(
        <div align="center">
            <div>
                <h1>Your Recent Review</h1>
                <Grid>
                    <Grid.Row>
                    {reviews}
                    </Grid.Row>
                </Grid>
            </div>
            <br></br>
        </div>

        )
    }
}

export default RecentReview;