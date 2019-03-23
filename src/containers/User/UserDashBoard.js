import React, {Component} from 'react';

import { Tab } from 'semantic-ui-react';

import UpdateUser from './UserDashboardItems/UpdateUser';

class UserDashBoard extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeItem: "",
            id: this.props.getData(),
            data: [],
        }
    }

    componentWillMount() {
        fetch('https://review-website-api.herokuapp.com/user/' + this.state.id)
        .then(results =>{
          return results.json();
        }).then(data => {
          this.setState({data});
          console.log(this.state.data);
        }).catch(err => {
          console.log(err);
        });
      }
      

    handleItemClick = (e, { name }) => 
    this.setState({ activeItem: name })

    render(){
        const panes = [
            { menuItem: 'Start a review', render: () => <Tab.Pane>Start a review</Tab.Pane> },
            { menuItem: 'Update Your Information', render: () => <Tab.Pane><UpdateUser data={this.state.data}/></Tab.Pane> },
            { menuItem: 'Recent Reviews', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
          ]
        return(
            <Tab panes={panes} />
        )
    }
}

export default UserDashBoard;