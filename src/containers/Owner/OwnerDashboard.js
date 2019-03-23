import React, {Component} from 'react';

import { Tab } from 'semantic-ui-react';

import UpdateOwner from '../Owner/OwnerDashboardItems/UpdateOwner';

class OwnerDashboard extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeItem: "",
            id: this.props.getData(),
            data: []
        }
    }

    componentDidMount() {
        fetch('https://review-website-api.herokuapp.com/user/' + this.state.id)
        .then(results =>{
          return results.json();
        }).then(data => {
          console.log(data);
          this.setState({data});
        }).catch(err => {
          console.log(err);
        });
      }
      

    handleItemClick = (e, { name }) => 
    this.setState({ activeItem: name })

    render(){
        const panes = [
            { menuItem: 'Create new Restaurant', render: () => <Tab.Pane><UpdateOwner data={this.state.data} /></Tab.Pane> },
            { menuItem: 'Your restaurants', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
            { menuItem: 'Recent Reviews', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
          ]
        return(
            <Tab panes={panes} />
        )
    }
}

export default OwnerDashboard;