import React from 'react'
import { Card, Rating } from 'semantic-ui-react'

const RecentReviewCard = (props) => {


return (
  <Card centered>
    <Card.Content>
      <Card.Header>{props.name}</Card.Header>
      <Card.Meta>
        <span className='date'>{props.updated}</span>
      </Card.Meta>
      <Card.Description>{props.description}</Card.Description>
      <Card.Description>{parseFloat(props.rating).toFixed(2)}</Card.Description>
    </Card.Content>
    <Card.Content extra>
        <Rating maxRating={5} disabled={true} defaultRating={props.rating} icon='star' size='large'>rating {props.rating}</Rating>
    </Card.Content>
  </Card>
);
}
export default RecentReviewCard
