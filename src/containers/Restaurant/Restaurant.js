import React, {Component} from 'react';
import ResCard from '../../components/restaurantCards/resturantItem'
import RecentRevCard from '../../components/reviewCards/reviewItem'
import {Grid, Input} from 'semantic-ui-react'

class Restaurants extends Component{
    constructor(){
        super()
        this.state = {
          allReviews: [],
          popularRes: [],
          searchText: ''
      };
      
      }
      
      componentDidMount() {
        this.getRecentReview();
        this.getPopular();
      }
      
      getRecentReview(){
        fetch('https://review-website-api.herokuapp.com/review/revres').then(res => res.json())
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
        fetch('https://review-website-api.herokuapp.com/restaurant/everything').then(res => res.json())
        .then(data => {
            this.setState({
                popularRes: data.rows
            })
        }).catch(err => {
          console.log(err);
        });
    }

    handleSearchChange = (event) => {
        this.setState({ searchText: event.target.value }, () => {
            if (this.state.searchText) {
                const filter = this.state.popularRes.filter(el => {
                    return el.name.toLowerCase().includes(this.state.searchText.toLowerCase()) || el.category.toLowerCase().includes(this.state.searchText.toLowerCase())
                });
                this.setState({ popularRes: filter });
            } else {
                this.getPopular();
            }
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
                <h1>All Restaurant</h1>
                <Input type="text" className="form-control" placeholder="Search" onChange={this.handleSearchChange} value={this.state.searchText} />
                <br></br>
                <Grid>
                    <Grid.Row>
                    {popular}
                    </Grid.Row>
                </Grid>
            </div>
            <br></br>
            <div>
                <h1>All Reviews</h1>
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

export default Restaurants;