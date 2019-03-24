import React, {Component} from 'react';
import RestaurantsCard from '../../../components/restaurantCards/resturantItem'
import ReviewCard from '../../../components/reviewCards/reviewItem'
import {Grid} from 'semantic-ui-react'

class OwnerRestaurants extends Component{
    constructor(){
        super()
        this.state = {
          ownerRestaurants: [],
          allReviews: []
        };
      }
      
      componentDidMount() {
        this.getUserRestaurants();
        this.getRestaurantReviews();
      }
      
      getUserRestaurants(){
        fetch('https://review-website-api.herokuapp.com/restaurant/user/' + localStorage.getItem('id'),{
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": "Bearer " + localStorage.getItem("token")
                },
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                ownerRestaurants: data.rows
            })
            this.props.getRestaurantData(data);
        }).catch(err => {
          console.log(err);
    });
    }


    getRestaurantReviews(){
        fetch('https://review-website-api.herokuapp.com/restaurant/reviews/' + localStorage.getItem('id') ).then(res => res.json())
        .then(data => {
            console.log(data);
            this.setState({
                allReviews: data.rows
            })
        }).catch(err => {
          console.log(err);
    });
      }

    createOne = () => {
        this.props.history.replace('/createRestaurants')
    }

    render(){
        const restaurants = this.state.ownerRestaurants.map(item => (
            <RestaurantsCard
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
            <ReviewCard
                key={item.review_id}
                name={item.name}
                description={item.review_text}
                rating={item.rating}
                updated={item.updated_at}
            />
      ));

      let res = (
        <div align="center">
        <div>
            <h1>Your Restaurants</h1>
            <Grid>
                <Grid.Row>
                {restaurants}
                </Grid.Row>
            </Grid>
        </div>


        <div>
            <h1>Your Restaurants review</h1>
            <Grid>
                <Grid.Row>
                {reviews}
                </Grid.Row>
            </Grid>
        </div>
        <br></br>
    </div>);

    if(this.state.ownerRestaurants.length === 0){
        res = (
            <div align="center">
            <div>
                <h1>Your Restaurants</h1>
                    <h1>You currently have no restaurants</h1>
                    <h1>Click on 'Create new Restaurant' on the tab </h1>
                    <br />
            </div>
            <br></br>
        </div>);
    }
        return(

            <div>{res}</div>

        )
    }
}

export default OwnerRestaurants;