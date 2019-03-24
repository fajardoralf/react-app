import React, {Component} from 'react';
import RestaurantsCard from '../../../components/restaurantCards/resturantItem'
import {Grid, Button} from 'semantic-ui-react'

class OwnerRestaurants extends Component{
    constructor(){
        super()
        this.state = {
          ownerRestaurants: [],
        };
      }
      
      componentDidMount() {
        this.getUserRestaurants();
        console.log(this.props);
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
                rating={item.rating}
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