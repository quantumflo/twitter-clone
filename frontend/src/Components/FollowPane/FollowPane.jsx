import React from "react";
import { Card } from "react-bootstrap";
import Users from "./Users/Users";

const FollowPane = (props) => {
const updateTweet = (value) => {
  props.homeTweetUpdate(true);
}
  return (
    <Card className="my-3">
      <Card.Header style = {{ fontWeight: "800", fontSize:"1.2rem", border: "none"}}>You might like</Card.Header>
      <Users updateTweet={updateTweet}  length={props.length} />
      <Card.Footer style = {{  border: "none"}}>
        
      </Card.Footer>
    </Card>
  );
};
export default FollowPane;
