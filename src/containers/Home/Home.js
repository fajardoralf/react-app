import React, {Component} from 'react';
import ResCard from '../../components/restaurantCards/resturantItem'
import RecentRevCard from '../../components/reviewCards/reviewItem'
import {Grid} from 'semantic-ui-react'

class Home extends Component{
    constructor(){
        super()
        this.state = {
          allReviews: [],
          popularRes: []
      };
      
      }
      
      componentDidMount() {
        this.getRecentReview();
        this.getPopular();
      }
      
      getRecentReview(){
        fetch('https://review-website-api.herokuapp.com/review/recentreviews').then(res => res.json())
        .then(data => {
            console.log(data);
            this.setState({
                allReviews: data.rows
            })
        }).catch(err => {
          console.log(err);
    });
      }
    
      getPopular(){
        fetch('https://review-website-api.herokuapp.com/restaurant/popular').then(res => res.json())
        .then(data => {
            this.setState({
                popularRes: data.rows
            })
        }).catch(err => {
          console.log(err);
        });
    }

    render(){
        
        const popular = this.state.popularRes.map(item => (
            <ResCard
                key={item.restaurant_id}
                name={item.name}
                description={item.description}
                category={item.category}
                address={item.address}
                postcode={item.postcode}
                rating={item.avgrating}
            />
        ));

        const reviews = this.state.allReviews.map(item => (
            <RecentRevCard
                key={item.review_id}
                name={item.name}
                description={item.review_text}
                rating={item.rating}
                updated={item.updated_at}
            />
      ));


        return(
        <div align="center">
            <div>
                <h1>Top 5 Restaurant</h1>
                <Grid>
                    <Grid.Row>
                    {popular}
                    </Grid.Row>
                </Grid>
            </div>
            <br></br>
            <div>
                <h1>Recent Reviews</h1>
                <Grid>
                    <Grid.Row>
                        {reviews}
                    </Grid.Row>
                </Grid>
            </div>

        </div>

        )
    }
}

export default Home;