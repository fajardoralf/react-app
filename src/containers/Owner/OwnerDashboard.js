import React, {Component} from 'react';

import { Tab } from 'semantic-ui-react';

import CreateRestaurants from './OwnerDashboardItems/CreateRestaurants';
import OwnerRestaurants from './OwnerDashboardItems/OwnerRestaurants';
import UpdateRestaurant from './OwnerDashboardItems/UpdateRestaurant';

class OwnerDashboard extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeItem: "",
            id: this.props.getData(),
            data: [],
            restaurantData:[]
        }
    }

    componentDidMount() {
        fetch('https://review-website-api.herokuapp.com/user/' + this.state.id)
        .then(results =>{
          return results.json();
        }).then(data => {
          this.setState({data});
        }).catch(err => {
          console.log(err);
        });
      }

    getRestaurantData(data){
      this.setState(()=> ({restaurantData: data}))
    }
     
      
    
    handleItemClick = (e, { name }) => 
    this.setState({ activeItem: name })

    render(){
        const panes = [
            { menuItem: 'Your restaurants', render: () => <Tab.Pane><OwnerRestaurants getRestaurantData={this.getRestaurantData} /></Tab.Pane> },
            { menuItem: 'Create new Restaurant', render: () => <Tab.Pane><CreateRestaurants data={this.state.data} /></Tab.Pane> },
            { menuItem: 'Update Restaurant', render: () => <Tab.Pane><UpdateRestaurant /></Tab.Pane> }
          ]
        return(
            <Tab panes={panes} />
        )
    }
}

export default OwnerDashboard;