import React from 'react'
import { Card, Icon, Rating } from 'semantic-ui-react'

const restaurantCard = (props) => {

    return (
        <Card centered>
            <iframe
                                    title="map"
                                    width="auto" 
                                    height="290px" 
                                    id="gmap_canvas" 
                                    src={"https://maps.google.com/maps?q=" + props.address + ", " + props.postcode + "&t=&z=13&ie=UTF8&iwloc=&output=embed"} 
                                    frameBorder="0" 
                                    scrolling="no" 
                                    marginHeight="0" 
                                    marginWidth="0">
            </iframe>
            <Card.Content>
                <Card.Header>{props.name}</Card.Header>
                <Card.Meta>{props.category}</Card.Meta>
                <Card.Description>{props.description}</Card.Description>
                <Card.Description>{props.address}, {props.postcode}</Card.Description>
                <br></br>
                <Card.Header>Rating {parseFloat(props.rating).toFixed(2)}</Card.Header>
            </Card.Content>
            <Card.Content extra>
            <a>
            <Rating maxRating={5} disabled={true} defaultRating={props.rating} icon='star' size='large'>rating {props.rating}</Rating>
            </a>
            </Card.Content>
        </Card>

    );
}
export default restaurantCard